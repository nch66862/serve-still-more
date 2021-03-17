import React from "react"
import { Link, useHistory } from "react-router-dom"
import './NavBar.css'

export const NavBar = () => {
    const history = useHistory()
    return (
        <nav className="nav" >
            <div className="navBarCustom">
                    <Link className="nav-link" to="/">Home</Link>
                    <button className="btn newMemberButton" onClick={() => history.push("/members/create")}>+ Member</button>
            </div>
        </nav>
    )
}