import React from "react"
import { Link, useHistory } from "react-router-dom"
import './NavBar.css'
//component that shows the logo and different navigational elements and lives at the top of the website after logging in
export const NavBar = () => {
    //useHistory keeps track of visited URLs in a stack
    const history = useHistory()
    //the logout button removes the key from the site storage and sends the user to the login screen
    const handleLogout = () => {
        sessionStorage.removeItem("Lost_River_User")
        history.push("/Login")
    }
    return (
        <nav className="nav" >
            <div className="navBarCustom">
                <Link className="nav-link" to="/"><img className="navLogo" src='./LostRiverLogo.png' alt="the church logo" /></Link>
                <h1 className="siteTitle">Lost River Call Center</h1>
                <article>
                    <button className="btn newMemberButton" onClick={() => history.push("/members/create")}>+ Member</button>
                    <button className="btn logoutButton" onClick={handleLogout}>Log Out</button>
                </article>
            </div>
        </nav>
    )
}