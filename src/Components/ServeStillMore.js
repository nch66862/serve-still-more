import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { NavBar } from "./nav/NavBar";
import "./ServeStillMore.css";

export const ServeStillMore = () => (
    <>
        <Route
            render={() => {
                if (sessionStorage.getItem("Lost_River_User")) {
                    return (
                        <>
                            <NavBar />
                            <h1>I am Logged In</h1>
                        </>
                    );
                } else {
                    return <Redirect to="/login" />;
                }
            }}
        />

        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
    </>
)