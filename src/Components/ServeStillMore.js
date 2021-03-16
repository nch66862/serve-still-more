import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Register } from "./auth/Register";
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
            <Register />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
    </>
)