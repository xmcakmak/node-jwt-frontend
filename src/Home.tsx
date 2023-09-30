import React, { useContext } from "react"
import { GlobalContext } from "./GlobalState";
import axios from "axios";

export default function Home() {
    const { deger, user } = useContext(GlobalContext);
    axios.get('http://localhost:8080/api/test/user', {
        headers: {
            'jwttoken': user.token
        }
    }).then(res => { 
                console.log('1:' + res);
    }).catch(err => console.error(err))

    axios.get('http://localhost:8080/api/test/mod', {
        headers: {
            'jwttoken': user.token
        }
    }).then(res => { 
                console.log('2' + res);
    }).catch(err => console.error(err))

    axios.get('http://localhost:8080/api/test/admin', {
        headers: {
            'jwttoken': user.token
        }
    }).then(res => { 
                console.log('3' + res);
    }).catch(err => console.error(err))

	return( <div>Home {JSON.stringify(user)}</div> );
}

