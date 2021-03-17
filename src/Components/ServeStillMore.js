import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { GroupProvider } from "./groups/GroupProvider";
import { NavBar } from "./nav/NavBar";
import { RoleProvider } from "./roles/RoleProvider";
import "./ServeStillMore.css";

export const ServeStillMore = () => (
    <>
        <Route
            render={() => {
                if (sessionStorage.getItem("Lost_River_User")) {
                    return (
                        <>
                            <NavBar />
                            <ApplicationViews />
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
            <GroupProvider>
                <RoleProvider>
                    <Register />
                </RoleProvider>
            </GroupProvider>
        </Route>
    </>
)