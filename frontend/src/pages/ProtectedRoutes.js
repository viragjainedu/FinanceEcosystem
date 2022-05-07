
import  Axios from "axios";
import { Outlet } from "react-router-dom";
import Login from './Login';
import React, { useState } from 'react';


// const useAuth = () => {

//     var user = {}

//     return user && user.loggedIn;
// }

const ProtectedRoutes = () => {
    const [isAuth, setIsAuth] = useState(null);
    
    if(localStorage.getItem('emailReg') && localStorage.getItem('passwordReg')){
        Axios.post("http://localhost:9000/login/last_login", {
            email: localStorage.getItem('emailReg'),
        }).then((res)=>{
            // console.log(res)
            if(res.data && res.data.message){
                // alert(res.data.message)
                setIsAuth(false);
            }else if(res.data && res.data.success){
                // console.log("Here")
                setIsAuth(true)
            }else{
                setIsAuth(false);
            }
        })
    }
    else{
        console.log("Hiii")
        setIsAuth(false);
    }

    if(isAuth === null){
        // console.log("Now NUll")
        return <p>Loading</p>
    }else{
        // console.log("Now Not")
        if(isAuth){
            return <Outlet/>
        }else{
            alert('session time out')
            return <Login/>
        }
    }
}

export default ProtectedRoutes;
