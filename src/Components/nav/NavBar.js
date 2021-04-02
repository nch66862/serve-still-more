import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../users/UserProvider"
import './NavBar.css'
//component that shows the logo and different navigational elements and lives at the top of the website after logging in
export const NavBar = () => {
    //allows access to data in the provider
    const { getUserById } = useContext(UserContext)
    //useHistory keeps track of visited URLs in a stack
    const history = useHistory()
    //finds the logged in users information to display their name in the nav bar
    const [loggedInUser, setLoggedInUser] = useState({}) 
    //the logout button removes the key from the site storage and sends the user to the login screen
    const handleLogout = () => {
        sessionStorage.removeItem("Lost_River_User")
        history.push("/Login")
    }
    useEffect(() => {
        getUserById(parseInt(sessionStorage.getItem("Lost_River_User")))
            .then(setLoggedInUser)
    }, [])
    return (
        <nav className="nav" >
            <div className="navBarCustom">
                <Link className="nav-link" to="/"><img className="navLogo" src='./LostRiverLogo.png' alt="the church logo" /></Link>
                <h1 className="siteTitle">Lost River Call Center</h1>
                <article className="userNavTools">
                    <button className="btn newMemberButton" onClick={() => history.push("/members/create")}>+ Member</button>
                    <p className="navBarUserName">Welcome, {loggedInUser?.firstName} {loggedInUser?.lastName}</p>
                    <button className="btn logoutButton" onClick={handleLogout}>Log Out</button>
                </article>
            </div>
        </nav>
    )
}