import React, { useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import Validation from "./SignUpValidation";
import axios from 'axios';

function Signup() {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [errors, setErrors] = useState<any>({
        email: '',
        password: '',
        name: ''
    });

    const navigate = useNavigate();
    const handleChange = (setState: any) => (event: any) => {
        setState(event.target.value);
    };


    const handleSubmit = (event:  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //setErrors(Validation(values));
        if(errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8080/api/auth/signup', {
                username: email,
                password: password
            })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.error(err))
        }
    }

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
        <div className="bg-white p-3 rounded w-25">
            <h2>Sign Up</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email"><strong>Name</strong></label>
                    <input type="text" placeholder="Enter Name"
                        name="name"
                        value={name}
                        onChange={handleChange(setName)}
                        className="form-control rounded-0"/>
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                </div>
                <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Enter Email" 
                            name="email"
                            value={email}
                            onChange={handleChange(setEmail)}
                            className="form-control rounded-0"/>
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter Password"
                            name="password"
                            value={password}
                            onChange={handleChange(setPassword)}
                            className="form-control rounded-0"/>
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">Sign up</button>
                <p>You are agree to our terms and policies</p>
                <Link to='/' className="btn btn-default border w-100 bg-light rounded-0">Login</Link>

            </form>
        </div>
    </div>
)
}

export default Signup
