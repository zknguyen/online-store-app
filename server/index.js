import express from "express";
import mysql from "mysql";
import cors from "cors";
import secrets from "./secrets/secrets.js";
import jwt from "jsonwebtoken";

const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: secrets.password,
    database: secrets.database,
});

// Middleware
app.use(express.json());
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
));

// Serverside API Calls

// User Authentication
const verifyUser = (req, res, next) => {
    const cookie = req.headers.cookie;
    if (!cookie) {
        return res.json({
            status: 500,
            message: "Token has not been provided",
        });
    } else {
        const token = cookie.slice(6); // Token is in format 'token=<token>', so we need to parse the string
        jwt.verify(token, "temp-jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({
                    status: 500,
                    message: "Authentication Error",
                });
            } else {
                req.usersid = decoded.usersid;
                next();
            }
        })
    }
};

app.get("/", verifyUser, (req, res) => {
    return res.json({
        status: 200,
        message: "Success",
        data: req.usersid,
    });
});

app.post("/login", (req, res) => {
    const queryString = `SELECT usersid FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}' LIMIT 1`
    db.query(queryString, (err, data) => {
        if (err) return res.json({
            status: 500,
            message: "Internal server error",
        });
        if (data.length > 0) {
            const usersid = data[0].usersid;
            const token = jwt.sign({usersid}, "temp-jwt-secret-key", {expiresIn: "1d"});
            res.cookie("token", token);
            return res.json({
                status: 200,
                message: "Success",
                data: {
                    usersid: usersid,
                },
            });
        } else {
            return res.json({
                status: 404,
                message: "Email is not associated with a registered account",
            });
        }
    });
});

app.post("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json({
        status: 200,
        message: "Success",
    });
});

app.get("/verify-email/:email", (req, res) => {
    const queryString = `
        SELECT usersid FROM users
        WHERE email = '${req.params.email}'
    `
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]);
    });
})

app.post("/create-user", (req, res) => {
    const queryString = `
        INSERT INTO users (firstname, lastname, email, password)
        VALUES ('${req.body.firstname}', '${req.body.lastname}', '${req.body.email}', '${req.body.password}')
    `
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
        // return res.json(data);
    });

    const queryString2 = `
        SELECT usersid FROM users
        WHERE firstname = '${req.body.firstname}'
        AND lastname = '${req.body.lastname}'
        AND email = '${req.body.email}'
        AND password = '${req.body.password}'
        LIMIT 1;
    `
    db.query(queryString2, (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]);
    });
});


// User
app.get("/users/:usersid", (req, res) => {
    const queryString = `SELECT * FROM users WHERE usersid = ${req.params.usersid}`;
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]);
    });
});


// Cart
app.get("/carts/:usersid", (req, res) => {
    const queryString = `SELECT * FROM carts WHERE usersid = ${req.params.usersid}`;
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]);
    });
});

app.post("/carts", (req, res) => {
    const queryString = `INSERT INTO carts (usersid) VALUES (${req.body.usersid})`
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Cart Items
app.get("/cart_items/:cartsid", (req, res) => {
    const queryString = `SELECT * FROM cart_items WHERE cartsid = ${req.params.cartsid}`;
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/cart_items/search", (req, res) => {
    const queryString = `
        SELECT * FROM (
            SELECT ci.cart_itemsid, ci.cartsid, ci.quantity, ci.size,
                p.productsid, p.name, p.brand, p.description, p.price, p.type, p.category, p.on_sale
            FROM cart_items ci
            LEFT JOIN products p
            ON p.productsid = ci.productsid
        ) AS t
        WHERE t.cartsid = ${req.body.cartsid}
    `
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/cart_items", (req, res) => {
    const queryString = `
        INSERT INTO cart_items (productsid, cartsid, size, quantity)
        VALUES (
            ${parseInt(req.body.productsid)},
            ${parseInt(req.body.cartsid)},
            '${req.body.size}',
            ${parseInt(req.body.quantity)}
        )
    `
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
    });

    const queryString2 = `
        SELECT cart_itemsid FROM cart_items
        WHERE productsid = ${parseInt(req.body.productsid)}
        AND cartsid = ${parseInt(req.body.cartsid)}
        AND size = '${req.body.size}'
        LIMIT 1;
    `

    db.query(queryString2, (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]);
    });
});

app.put("/cart_items/:cart_itemsid", (req, res) => {
    const queryString = `
        UPDATE cart_items 
        SET productsid = ${req.body.productsid}, 
            cartsid = ${req.body.cartsid},
            size = '${req.body.size}',
            quantity = ${req.body.quantity}
        WHERE cart_itemsid = ${req.params.cart_itemsid}
    `
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.delete("/cart_items/:cart_itemsid", (req, res) => {
    const queryString = `DELETE FROM cart_items WHERE cart_itemsid = ${req.params.cart_itemsid}`;
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.delete("/cart_items/clear/:cartsid", (req, res) => {
    const queryString = `DELETE FROM cart_items WHERE cartsid = ${req.params.cartsid}`;
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})


// Product/catalog
app.get("/shop", (req, res) => {
    const queryString = "SELECT * FROM products";
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/shop/men", (req, res) => {
    const queryString = "SELECT * FROM products WHERE category = 'M' OR category = 'U'";
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/shop/women", (req, res) => {
    const queryString = "SELECT * FROM products WHERE category = 'F' OR category = 'U'";
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/shop/kids", (req, res) => {
    const queryString = "SELECT * FROM products WHERE category = 'K' OR category = 'U'";
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/shop/sale", (req, res) => {
    const queryString = "SELECT * FROM products WHERE on_sale = 1";
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/product/:productsid", (req, res) => {
    const queryString = `SELECT * FROM products WHERE productsid = ${req.params.productsid}`;
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]);
    });
});


// Address
app.post("/addresses", (req, res) => {
    const queryString = `
        INSERT INTO addresses (street, city, state, zipcode)
        VALUES (
            '${req.body.street.toUpperCase()}',
            '${req.body.city.toUpperCase()}',
            '${req.body.state.toUpperCase()}',
            ${req.body.zipcode}
        )
    `
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
    });

    const queryString2 = `
        SELECT addressesid FROM addresses
        WHERE street = '${req.body.street.toUpperCase()}'
        AND city = '${req.body.city.toUpperCase()}'
        AND state ='${req.body.state.toUpperCase()}'
        AND zipcode = ${req.body.zipcode}
        LIMIT 1;
    `
    db.query(queryString2, (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]);
    });
});

app.post("/addresses/search", (req, res) => {
    const queryString = `
        SELECT addressesid FROM addresses
        WHERE street = '${req.body.street.toUpperCase()}'
        AND city = '${req.body.city.toUpperCase()}'
        AND state ='${req.body.state.toUpperCase()}'
        AND zipcode = ${req.body.zipcode}
        LIMIT 1;
    `
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]);
    });
});

// Orders
app.post("/orders", (req, res) => {
    const queryString = `
        INSERT INTO orders (usersid, email, total, addressesid)
        VALUES (
            ${req.body.usersid},
            '${req.body.email.toUpperCase()}',
            ${req.body.total},
            ${req.body.addressesid}
        )
    `
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
    });

    const queryString2 = `
        SELECT ordersid FROM orders
        WHERE usersid = ${req.body.usersid}
        AND email = '${req.body.email.toUpperCase()}'
        AND total =${req.body.total}
        AND addressesid = ${req.body.addressesid}
        LIMIT 1;
    `
    db.query(queryString2, (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]);
    });
});

app.post("/order_items", (req, res) => {
    const queryString = `
        INSERT INTO order_items (ordersid, productsid, size, quantity)
        VALUES (
            ${req.body.ordersid},
            ${req.body.productsid},
            '${req.body.size}',
            ${req.body.quantity}
        )
    `
    db.query(queryString, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})

// Listen on port 
app.listen(8800, () => {
    console.log("Connected to server!");
});