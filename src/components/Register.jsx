import React, { useState } from "react";
import axios from "axios";

function Register(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [registered, setRegistered] = useState(false);

    const handleNameChange = e => {
        setName(e.target.value);
    }

    const handleEmailChange = e => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await axios.post("http://localhost:5000/register", 
            {"name": name,
             "email": email,
             "password": password
        });
            console.log(user.data);
            setName("");
            setEmail("");
            setPassword("");
            setRegistered(true);
        } catch (err) {
            console.log(err.message);
            if (err.response.status === 401) {
                alert("Invalied Credential");
            }
        }
    }

    return <div>
    {registered ? 
        <div>
            <h1 className="display-3 text-danger font-weight-bold">Registered Successfully</h1>
            <a className="btn btn-warning btn-lg col col-lg-2 left-align font-weight-bold" href="/books" role="button">View Books</a>
        </div> :     
        <div>
        <h1 className="display-3 text-danger font-weight-bold">Register</h1>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="title" className="font-weight-bold ">Name</label>
            <input onChange={handleNameChange} type="text" name="name" className="form-control" id="name" value={name} />
            <small id="emailHelp" className="form-text text-muted">Enter Name</small>

            <label htmlFor="title" className="font-weight-bold ">Email</label>
            <input onChange={handleEmailChange} type="email" name="email" className="form-control" id="email" value={email} />
            <small id="emailHelp" className="form-text text-muted">Enter email</small>

            <label htmlFor="title" className="font-weight-bold ">Password</label>
            <input onChange={handlePasswordChange} type="password" name="password" className="form-control" id="passowrd" value={password} />
            <small id="emailHelp" className="form-text text-muted">Enter Password</small>

            <p></p>
            <button type="submit" className="btn btn-warning btn-lg col font-weight-bold">Register</button>
            </div>
            </form>
        </div>  
    }
    </div>

}

export default Register;