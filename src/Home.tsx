import React, { useState, useContext, useEffect } from "react"
import { GlobalContext } from "./GlobalState"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import './App.css';
import OkSvg from "./images/Ok.svg";
import CancelSvg from "./images/Cancel.svg";
import ExitIcon from "./images/exit.png";

interface Role {
    admin: boolean;
    mod: boolean;
    user: boolean;
}

export default function Home() {

    const [role, setRole] = useState<Role>({
        admin: false,
        mod: false,
        user: false,
    });

    const [test, setTest] = useState(false);

	const { user, setUser } = useContext(GlobalContext)

    const navigate = useNavigate();

    const roles = ["user", "mod", "admin"];

	useEffect(() => {

        roles.map((roleItem) => {
            axios
            .get("http://localhost:8080/api/test/" + roleItem, {
                headers: {
                    jwttoken: user.token,
                },
            })
            .then((res) => {
                setRole(prevRole => ({
                    ...prevRole,
                    [roleItem]: true,
                }));
            })
            .catch((err) => {
                console.log("mod:" + roleItem + ":" + err.message)
            })
        });
    }, [user.token]);

    const exit = () => {
        setUser({});
        axios
            .post("http://localhost:8080/api/auth/signout" , {
                // headers: {
                //     jwttoken: user.token,
                // },
            })
            .then(res => { 
                console.log(res);
                setUser({});
                navigate('/');
            })
            .catch(err => console.error(err))
            navigate('/');
    };

	return (
		//<div>Home {JSON.stringify(user)}</div>
        <div className="d-flex flex-column justify-content-center bg-light vh-100 position-relative">
            <div className="closeButtonWrapper">
                <button className="closeButton" onClick={() => exit()}>
                    <img src={ExitIcon} alt="exit" />
                </button>
            </div>
            <div>
                <h1 className="text-center">Role Check</h1>
            </div>
		<div className="d-flex justify-content-center align-items-center ">
			<div className="p-3 rounded w-25">
				<div className="role-box">
                    <img src={role.admin ? OkSvg : CancelSvg} alt="" />
					<h2 className="text-center">Admin</h2>
				</div>
			</div>
			<div className="p-3 rounded w-25">
				<div className="role-box">
                <img src={role.mod ? OkSvg : CancelSvg} alt="" />
					<h2 className="text-center">Moderator</h2>
				</div>
			</div>
			<div className="p-3 rounded w-25">
				<div className="role-box">
                <img src={role.user ? OkSvg : CancelSvg} alt="" />
					<h2 className="text-center">User</h2>
				</div>
			</div>
		</div>
        </div>
	)
}
