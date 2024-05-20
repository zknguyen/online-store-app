import { useAuth } from "../../../contexts/auth/AuthContext";
import "./CreateUser.css";

function CreateUser() {
    const auth = useAuth();
    
    const handleCreateUser = async(e) => {
        e.preventDefault();
        const data = { 
            firstName: document.getElementById("first-name").value,
            lastName: document.getElementById("last-name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };
        await auth.createUserAction(data);
    }

    return (
        <div id='create-user-page'>
            <h1 id="create-user-header">Create an Account</h1>
            <form method='post' id='create-user-form' onSubmit={handleCreateUser}>
                <input type='text' id='first-name' placeholder='First Name'/>
                <input type='text' id='last-name' placeholder='Last Name'/>
                <input type='text' id='email' placeholder='Email'/>
                <input type='password' id='password' placeholder='Password'/>
                <input type='password' id='confirm-password' placeholder='Confirm Password'/>
                <input type="submit" className="create-user-button" value="Create Account"/>
            </form>
        </div>
    )
}

export default CreateUser;