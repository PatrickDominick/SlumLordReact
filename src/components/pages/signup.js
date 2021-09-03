import React from 'react';
import Cookies from 'js-cookie';

import SignupForm from '../forms/signUpForm';

export default function signup(props) {
    if (Cookies.get("username")) {
        props.history.push("/rules")
    }
    
   
    return (
        <div className="signup-wrapper">
            <h3>Welcome<br/>to<br/>Slum LandLord</h3>
            <SignupForm changeRoute={props.history.push} handleSetUser={props.handleSetUser} />
            <p>Don't have an account?</p>
            <button onClick={() => props.history.push("/")}>Login</button>
        </div>
    )
}