import { useContext, useEffect } from "react";
import { MemberContext } from "./MemberProvider";
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { states } from "../StaticData"
import { GroupContext } from "../groups/GroupProvider";
import './MemberForm.css'
import { ImageContext } from "../images/ImageProvider";
import { Image, Placeholder } from 'cloudinary-react'
import { cloudinaryKeys } from "../settings";
//displays a form to create a new member
export const MemberForm = () => {
    //the contexts expose the data to use from the provider
    const { addMember } = useContext(MemberContext)
    const { groups, getGroups } = useContext(GroupContext)
    const { upLoadImage } = useContext(ImageContext)
    //a state variable to store the return address of the image
    const [imagePublicId, setImagePublicId] = useState("")
    //useHistory keeps a stack of visited URLs
    const history = useHistory()
    //initializes a variables that increments through whenever the state dropdown is built on the form
    let stateCounter = 0
    //initializes the state variable to keep track of which page of the form the user is on
    const [currentPage, setCurrentPage] = useState("first")
    //the main state variable that keeps track of all the data for a member object
    const [registerMember, setRegisterMember] = useState({
        firstName: "",
        lastName: "",
        email: "",
        groupId: 0,
        phone: "",
        address: "",
        city: "",
        state: "",
        photo: "https://res.cloudinary.com/nch66862/image/upload/w_400,h_400,c_crop,g_face,r_max/w_200/v1617635031/qsbq2vmsdtotzvznadv5.jpg",
        callTime: "",
        canCall: true,
        familyId: 0,
        primaryMember: false
    })
    //state variable that controls the display state of an informational dialog box
    const [conflictDialog, setConflictDialog] = useState(false)
    //function that updates the main state variables when changes occur in the form
    const handleInputChange = (event) => {
        const newMember = { ...registerMember }
        if (event.target.id.includes("Id")) {
            newMember[event.target.id] = parseInt(event.target.value)
        } else {
            newMember[event.target.id] = event.target.value
        }
        setRegisterMember(newMember)
    }
    //checks to see if there is an object with an email address already in the database that matches the address typed in the box
    const existingMemberEmailCheck = () => {
        return fetch(`https://serve-still-more-api.herokuapp.com/members/?email=${registerMember.email}`)
            .then(res => res.json())
    }
    //checks for an already existing email address or no email address and goes to the next page. If there is an existing email address, an error dialog box is displayed
    const nextPage = (event) => {
        event.preventDefault()
        existingMemberEmailCheck()
            .then((user) => {
                if (!user[0] || user[0].email === "") {
                    setCurrentPage("second")
                }
                else {
                    setConflictDialog(true)
                }
            })
    }
    //adds the new member to the database and redirects the user back to their dashboard
    const handleRegisterMember = (event) => {
        event.preventDefault()
        addMember(registerMember)
            .then(() => history.push("/"))
    }
    //takes the user back to the dashboard screen if they do not want to register a new member
    const handleCancelRegister = (event) => {
        event.preventDefault()
        history.push("/")
    }
    //updates the link that the image tag references
    const handlePhotoChange = (event) => {
        const formData = new FormData()
        formData.append("file", event.target.files[0])
        formData.append("upload_preset", cloudinaryKeys.upload_preset)
        upLoadImage(formData)
            .then(response => {
                const newMember = { ...registerMember }
                newMember.photo = response.data.secure_url
                setRegisterMember(newMember)
                //crop the image using the URL and update the image on the member form
                const [prefix, suffix] = response.data.secure_url.split("/upload/")
                const cropSection = "/upload/w_400,h_400,c_crop,g_face,r_max/w_200/"
                const croppedURLPhoto = prefix.concat(cropSection, suffix)
                setImagePublicId(croppedURLPhoto)
            })
    }
    //gets the data for the dropdown in the form
    useEffect(() => {
        getGroups()
        setImagePublicId(registerMember.photo)
    }, [])
    //two page form with a ternary to decide which part of the form to render.
    return (
        currentPage === "first" ? <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" open={conflictDialog}>
                <div>Member with that email address already exists</div>
                <button className="button--close" onClick={e => setConflictDialog(false)}>Close</button>
            </dialog>
            <form className="form--login" onSubmit={nextPage}>
                <h1 className="h3 mb-3 font-weight-normal">Register New Member</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={handleInputChange} type="text" name="firstName" className="form-control" placeholder="first name" value={registerMember.firstName} id="firstName" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={handleInputChange} type="text" name="lastName" className="form-control" placeholder="last name" value={registerMember.lastName} id="lastName" required />
                </fieldset>
                <fieldset>
                    <Image cloudName="nch66862" publicId={imagePublicId} >
                        <Placeholder />
                    </Image>
                </fieldset>
                <fieldset>
                    <input onChange={handlePhotoChange} type="file" name="photo" className="photoInput" id="photo" />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input onChange={handleInputChange} type="email" name="email" className="form-control" placeholder="email address" value={registerMember.email} id="email" />
                </fieldset>
                <fieldset>
                    <button className="btn" type="submit"> Next </button>
                    <button className="cancelButton" type="cancel" onClick={handleCancelRegister}> Cancel </button>
                </fieldset>
            </form>
        </main> : <main style={{ textAlign: "center" }}>
            <h1>Lost River Call Center</h1>
            <h3>A Little More Information Is Needed</h3>
            <form className="form--login" onSubmit={handleRegisterMember}>
                <h1 className="h3 mb-3 font-weight-normal">Register New Member</h1>
                <fieldset>
                    <label htmlFor="groupNumber"> Group Number </label>
                    <select onChange={handleInputChange} value={registerMember.groupId} name="groupId" id="groupId" className="form-control" required >
                        <option value="0">Select a Group</option>
                        {groups.map(group => {
                            return <option key={group.id} value={group.id}>{group.name}</option>
                        })}
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPhone"> Phone Number </label>
                    <input onChange={handleInputChange} value={registerMember.phone} id="phone" type="phone" name="phone" className="form-control" placeholder="(270) 555-2030" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputAddress"> Address </label>
                    <input onChange={handleInputChange} value={registerMember.address} id="address" type="address" name="address" className="form-control" placeholder="address" />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputCity"> City </label>
                    <input onChange={handleInputChange} value={registerMember.city} id="city" type="text" name="city" className="form-control" placeholder="city" />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputState"> State </label>
                    <select onChange={handleInputChange} value={registerMember.state} name="state" id="state" className="form-control" >
                        <option value="0">Select a State</option>
                        {states.map(state => {
                            stateCounter++
                            return <option key={stateCounter} value={state}>{state}</option>
                        })}
                    </select>
                </fieldset>
                <fieldset>
                    <button className="btn" type="submit"> Register </button>
                    <button className="cancelButton" type="cancel" onClick={handleCancelRegister}> Cancel </button>
                </fieldset>
            </form>
        </main>
    )
}