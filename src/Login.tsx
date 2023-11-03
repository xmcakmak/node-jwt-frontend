import React, { useContext, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import Validation from "./LoginValidation";
import axios from 'axios';
import { GlobalContext } from "./GlobalState";

interface Errors {
    email: string;
    password: string;
}


export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<any>({
        email: '',
        password: ''
    });

    const { setUser } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleChange = (setState: any) => (event: any) => {
        setState(event.target.value);
    };

    const handleSubmit = (event:  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationErrors = Validation({ email: email, password: password });
        setErrors(validationErrors);

        if(Object.values(validationErrors).every(error => error === '')){
            
                axios.post('http://localhost:8080/api/auth/signin', {
                    email: email,
                    password: password,
                })
                .then(res => { 
                    console.log(res);
                    setUser(res.data);
                    navigate('/home');
                })
                .catch(err => console.error(err))
        } 
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Sign In</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="text" placeholder="Enter Email" 
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
                    <button type='submit' className="btn btn-success w-100 rounded-0">Login</button>
                    <p>You are agree to our terms and policies</p>
                    <Link to='/signup' className="btn btn-default border w-100 bg-light rounded-0">Create Account</Link>

                </form>
            </div>
        </div>
    );
}