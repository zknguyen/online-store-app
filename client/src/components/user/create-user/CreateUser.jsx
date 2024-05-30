import { useAuth } from "../../../contexts/auth/AuthContext";
import "./CreateUser.css";

// TODO: Remove autofill saved values from this page
function CreateUser() {
    const auth = useAuth();

    const handleInputChanged = (e) => {
        const input = e.target.value;
        const fieldName = e.target.id;
        const inputField = document.getElementById(fieldName);
        const error = document.getElementById(`${fieldName}-error`);
        let invalid = false;
        
        if (fieldName === 'email') {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)) {
                inputField.classList.add('input-error');
                error.textContent = 'Please enter a valid email';
                invalid = true;
            }
        }
        if (fieldName === 'confirm-password') {
            const password = document.getElementById('password').value;
            if (input != password) {
                inputField.classList.add('input-error');
                error.textContent = 'Passwords must match';
                invalid = true;
            }
        }
        if (input.length < 1) {
            inputField.classList.add('input-error');
            error.textContent = 'Field is required';
            invalid = true;
        }
        if (!invalid) {
            inputField.classList.remove('input-error');
            error.textContent = '';
        }
    }

    const handleCreateUser = async(e) => {
        e.preventDefault();
        const data = { 
            firstName: document.getElementById("first-name").value,
            lastName: document.getElementById("last-name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };
        // TODO: handle any errors
        await auth.createUserAction(data);
    }

    return (
        <div id='create-user-page'>
            <h1 id="create-user-header">Create an Account</h1>
            <form method='post' id='create-user-form' onSubmit={handleCreateUser}>
                <div className="login-input">
                    <label htmlFor="first-name"></label>
                    <input type='text' id='first-name' className="input-field" minLength={1} placeholder='First Name' onChange={handleInputChanged} required/>
                    <div className="error" id="first-name-error" aria-live="polite"></div>
                </div>
                <div className="login-input">
                    <label htmlFor="last-name"></label>
                    <input type='text' id='last-name' className="input-field" minLength={1} placeholder='Last Name' onChange={handleInputChanged} required/>
                    <div className="error" id="last-name-error" aria-live="polite"></div>
                </div>
                <div className="login-input">
                    <label htmlFor="email"></label>
                    <input type='email' id='email' className="input-field" placeholder='Email' onChange={handleInputChanged} required/>
                    <div className="error" id="email-error" aria-live="polite"></div>
                </div>
                <div className="login-input">
                    <label htmlFor="password"></label>
                    <input type='password' id='password' className="input-field" minLength={1} placeholder='Password' onChange={handleInputChanged} required/>
                    <div className="error" id="password-error" aria-live="polite"></div>
                </div>
                <div className="login-input">
                    <label htmlFor="confirm-password"></label>
                    <input type='password' id='confirm-password' className="input-field" minLength={1} placeholder='Confirm Password' onChange={handleInputChanged} required/>
                    <div className="error" id="confirm-password-error" aria-live="polite"></div>
                </div>
                <input type="submit" className="create-user-button" value="Create Account"/>
            </form>
        </div>
    )
}

export default CreateUser;