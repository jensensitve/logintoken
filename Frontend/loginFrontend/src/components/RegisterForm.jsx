import React, { useState } from "react";

const RegisterForm = () => {
    const [name, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [customerId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        // Stimmt das password überein?!
        if (password !== confirmPassword) {
            alert("The passwords do not match.");
        } else {
            // den user im backend anlegen
            fetch("http://localhost:5000/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    customerId,
                    email,
                    password,
                }),
            })
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="email"
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
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
            />
            <button onClick={onSubmit}>Register</button>
        </div>
    );
};


export default RegisterForm;