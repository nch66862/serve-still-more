import React from "react"
import { Link, useHistory } from "react-router-dom"
import './NavBar.css'

export const NavBar = () => {
    const history = useHistory()
    const handleLogout = () => {
        sessionStorage.removeItem("Lost_River_User")
        history.push("/Login")
    }
    return (
        <nav className="nav" >
            <div className="navBarCustom">
                <Link className="nav-link" to="/">Home</Link>
                <article>
                    <button className="btn newMemberButton" onClick={() => history.push("/members/create")}>+ Member</button>
                    <button className="btn logoutButton" onClick={handleLogout}>Log Out</button>
                </article>
            </div>
        </nav>
    )
}