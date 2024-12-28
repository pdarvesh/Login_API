import React, { useState } from 'react';
import './login.css';
import axios from 'axios'; // Import Axios

function Login() {
    const [username, setUsername] = useState(''); // State for username
    const [password, setPassword] = useState(''); // State for password
    const [message, setMessage] = useState(''); // State for message

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to the backend API
            const response = await axios.post('http://localhost:5005/login', {
                username,
                password,
            });

            // Update the message based on the server's response
            setMessage(response.data.message);
        } catch (error) {
            // Handle errors (e.g., invalid credentials or server issues)
            if (error.response && error.response.status === 401) {
                setMessage(error.response.data.message); // Invalid credentials
            } else {
                setMessage('Something went wrong. Please try again.'); // Server error
            }
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit">Login</button>
                <p>{message}</p> {/* Display the message */}
            </form>
        </div>
    );
}

export default Login;
