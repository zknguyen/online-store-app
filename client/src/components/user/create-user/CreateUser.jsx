import { useAuth } from "../../../contexts/auth/AuthContext";
import "./CreateUser.css";

function CreateUser() {
    const auth = useAuth();
    // TODO: figure out how to make this less repetitive
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    // email.addEventListener('input', () => {
    //     if (email.validity.valid) {
    //         emailError.textContent = ""
    //     } else {
    //         if (email.validity.typeMismatch) {
    //             emailError.textContent = "Please enter in valid email format";
    //         }
    //     }
    // });

    const handleCreateUser = async(e) => {
        e.preventDefault();
        const data = { 
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
        };
        // TODO: handle any errors
        await auth.createUserAction(data);
    }

    return (
        <div id='create-user-page'>
            <h1 id="create-user-header">Create an Account</h1>
            <form method='post' id='create-user-form' onSubmit={handleCreateUser}>
                <input type='text' id='first-name' className="input-field" minLength={1} placeholder='First Name' required/>
                <input type='text' id='last-name' className="input-field" minLength={1} placeholder='Last Name' required/>
                <input type='email' id='email' className="input-field" placeholder='Email' required/>
                <input type='password' id='password' className="input-field" minLength={1} placeholder='Password' required/>
                <input type='password' id='confirm-password' className="input-field" minLength={1} placeholder='Confirm Password' required/>
                <input type="submit" className="create-user-button" value="Create Account"/>
            </form>
        </div>
    )
}

export default CreateUser;