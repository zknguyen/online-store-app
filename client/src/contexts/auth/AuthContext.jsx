import { useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../../components/hooks/useSessionStorage";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useSessionStorage('auth', false);
    const [usersId, setUsersId] = useSessionStorage('usersid', -1);
    const [user, setUser] = useSessionStorage('user', {});
    const navigate = useNavigate();

    const assignUserData = async(id) => {
        if (id !== -1) {
            try {
                const response = await axios.get(`http://localhost:8800/users/${id}`);
                const userData = await response.data;
                setUser(userData);
                console.log(userData);
            } catch(err) {
                console.log(err);
            }
        }
    }

    const loginAction = async(data) => {
        const email = data.email;
        const password = data.password;

        try {
            const response = await axios.post("http://localhost:8800/login", {email: email, password: password});
            if (response.data.status === 200) {
                await assignUserData(response.data.data.usersid);
                setUsersId(response.data.data.usersid);
                setAuth(true);
                navigate("/");
                return response.data.data.usersid;
            } else {
                alert("Invalid Email/Password combination");
                navigate("/login");
            }
        } catch(err) {
            console.log(err);
        }
    }

    const logoutAction = async() => {
        try {
            const response = await axios.post("http://localhost:8800/logout", {}, {withCredentials:true});
            if (response.data.status === 200) {
                setAuth(false);
                setUsersId(-1);
                setUser({});
                navigate("/");
                location.reload(true);
            }
        } catch(err) {
            console.log(err);
        }
    }

    const createUserAction = async(data) => {
        const firstName = data.firstName;
        const lastName = data.lastName;
        const email = data.email;
        const password = data.password;

        try {
            const verifyEmailResponse = await axios.get(`http://localhost:8800/verify-email/${email}`);
            if (verifyEmailResponse.data.usersid) {
                alert("Email already in use");
                navigate("/create-user");
                return;
            }
            
            const createUserResponse = await axios.post(
                'http://localhost:8800/create-user',
                {
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    password: password
                },
            );
            if (createUserResponse.status === 200) {
                await loginAction(data);
            } else {
                alert("Invalid Email/Password combination");
                navigate("/login");
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, usersId, user, loginAction, logoutAction, createUserAction }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}