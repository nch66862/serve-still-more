import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { GroupProvider } from "./groups/GroupProvider";
import { NavBar } from "./nav/NavBar";
import { Footer } from "./footer/Footer";
import { RoleProvider } from "./roles/RoleProvider";
import "./ServeStillMore.css";
import { UserProvider } from "./users/UserProvider";

export const ServeStillMore = () => (
    <>
        <Route
            render={() => {
                if (sessionStorage.getItem("Lost_River_User")) {
                    return (
                        <>
                            <body className="mainBody">
                                <NavBar />
                                <RoleProvider>
                                    <UserProvider>
                                        <ApplicationViews />
                                    </UserProvider>
                                </RoleProvider>
                            </body>
                            <Footer />
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