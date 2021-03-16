import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register1 } from "./auth/Register";
import "./ServeStillMore.css";

export const ServeStillMore = () => (
    <>
        <Route
            render={() => {
                if (localStorage.getItem("Lost_River_User")) {
                    return (
                        <h1>I am Logged In</h1>
                    );
                } else {
                    return <Redirect to="/login" />;
                }
            }}
        />

        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register1">
            <Register1 />
        </Route>
        <Route path="/register2">
            <Register1 />
        </Route>
    </>
)