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
//the application component. will handle routing to the application views if the user is logged in, or the login page if a user is not logged in
export const ServeStillMore = () => (
    <>
        <Route
            render={() => {
                if (sessionStorage.getItem("Lost_River_User")) {
                    return (
                        <>
                            <section className="mainBody">
                                <NavBar />
                                <RoleProvider>
                                    <UserProvider>
                                        <ApplicationViews />
                                    </UserProvider>
                                </RoleProvider>
                            </section>
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