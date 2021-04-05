import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../users/UserProvider"
import { Image } from 'cloudinary-react'
import './NavBar.css'
//component that shows the logo and different navigational elements and lives at the top of the website after logging in
export const NavBar = () => {
    //allows access to data in the provider
    const { getUserById } = useContext(UserContext)
    //useHistory keeps track of visited URLs in a stack
    const history = useHistory()
    //finds the logged in users information to display their name in the nav bar
    const [loggedInUser, setLoggedInUser] = useState({})
    //a state variable to store the return address of the image
    const [imagePublicId, setImagePublicId] = useState("")
    //crops the user image for the nav bar and sets the state variable of the photo that is to be displayed
    useEffect(() => {
        if (loggedInUser.photo) {
            const [prefix, suffix] = loggedInUser.photo.split("/upload/")
            const cropSection = "/upload/w_400,h_400,c_crop,g_face,r_max/w_60/"
            const croppedURLPhoto = prefix.concat(cropSection, suffix)
            setImagePublicId(croppedURLPhoto)
        }
    }, [loggedInUser])
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
                <Link className="nav-link" to="/"><img className="navLogo" src='../LostRiverLogo.png' alt="the church logo" /></Link>
                <h1 className="siteTitle">Lost River Call Center</h1>
                <article className="userNavTools">
                    {!history.location.pathname.includes("/members/create") && <button className="btn newMemberButton" onClick={() => history.push("/members/create")}>+ Member</button>}
                    <Image style={{borderRadius: "30px", marginRight: "10px"}} cloudName="nch66862" publicId={imagePublicId} />
                    <p className="navBarUserName">{loggedInUser?.firstName} {loggedInUser?.lastName}</p>
                    <button className="btn logoutButton" onClick={handleLogout}>Log Out</button>
                </article>
            </div>
        </nav>
    )
}