import React from "react"
import { Link } from "react-router-dom"
import './NavBar.css'

export const NavBar = () => {
    return (
        <nav className="nav" >
            <div className="navBarCustom">
                    <Link className="nav-link" to="/">Home</Link>
                    <button className="btn newMemberButton">+ Member</button>
            </div>
        </nav>
    )
}