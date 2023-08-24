import React, { useState } from "react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        // Send a request to the backend to login the user.
        fetch("https://backend-q7jk.onrender.com/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, credentials: "include",
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then(response => response.json())
            .then(user => {

                if (user.msg === "Login erfolgreich!") {
                    // The user is logged in, so redirect them to the home page.
                    // window.location.href = "./";
                    alert("Logged in!");
                } else {
                    // The user is not logged in, so show an error message.
                    alert("The username or password is incorrect.");
                }
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={onSubmit}>Login</button>
        </div>
    );
};


export default LoginForm;