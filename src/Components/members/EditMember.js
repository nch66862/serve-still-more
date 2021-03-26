import { useContext, useEffect } from "react";
import { MemberContext } from "./MemberProvider";
import React, { useState } from "react"
import { states } from "../Settings"
import { GroupContext } from "../groups/GroupProvider";
import './EditMember.css'
//component that pulls all of the data for a member into editable fields and allows the user to edit the data and submit the edit to the API
export const EditMember = ({ member, setOpenEditMember, setOpenDetail, callingMember, setMemberToCall }) => {
    //context specifies what data you want access to from the providers
    const { updateMember, getMemberById, deleteMember } = useContext(MemberContext)
    const { groups, getGroups } = useContext(GroupContext)
    //initializes a variable to loop through and populate all of the states in the state dropdown
    let stateCounter = 0
    //the main state object that holds the data for the member you are editing
    const [updatedMemberObj, setUpdatedMemberObj] = useState({
        firstName: "",
        lastName: "",
        email: "",
        groupId: 0,
        phone: "",
        address: "",
        city: "",
        state: "",
        photo: "",
        callTime: "",
        canCall: true,
        familyId: 0,
        primaryMember: false
    })
    //controls the visibility of the dialog box when it has error messages
    const [conflictDialog, setConflictDialog] = useState(false)
    //controls if the submit edit button is enabled or disabled when waiting for data so code does not run multiple times
    const [isLoading, setIsLoading] = useState(true);
    //updates the data on the state variable when a change occurs in the form
    const handleInputChange = (event) => {
        const newMember = { ...updatedMemberObj }
        if (event.target.id.includes("Id")) {
            newMember[event.target.id] = parseInt(event.target.value)
        } else {
            newMember[event.target.id] = event.target.value
        }
        setUpdatedMemberObj(newMember)
    }
    //controls the state of the submit button, opens the detail modal when logged in as an elder, closes the edit member component, sets the new member object when the deacon is viewing the call screen
    const handleUpdateMember = (event) => {
        event.preventDefault()
        setIsLoading(true)
        if (callingMember) {
            setMemberToCall(updatedMemberObj)
        }
        updateMember(updatedMemberObj)
            .then(() => {
                setOpenEditMember(false)
                if (!callingMember) {
                    setOpenDetail(true)
                }
            })
    }
    //closes the edit member component when cancel is clicked. Will open the detail component when logged in as an elder
    const handleCancel = (event) => {
        event.preventDefault()
        setOpenEditMember(false)
        if (!callingMember) {
            setOpenDetail(true)
        }
    }
    //disables the button on the form, deletes the member you are editing from the API, sets the calling member to an empty object if you are looking at the deacon dashboard, and closes the edit member component
    const handleDelete = (event) => {
        event.preventDefault()
        setIsLoading(true)
        deleteMember(updatedMemberObj.id)
            .then(() => {
                if (callingMember) {
                    setMemberToCall({})
                }
                setOpenEditMember(false)
            })
    }
    //gets the data, sets the state variable for the form, and updates the disabled state of the button.
    useEffect(() => {
        getGroups()
            .then(() => {
                getMemberById(member.id)
                    .then(member => {
                        setUpdatedMemberObj(member)
                        setIsLoading(false)
                    })
            })
    }, [])
    //returns the edit member form
    return (
        <main className="modal--parent" style={{ textAlign: "center" }}>
            <section className="modal--content">
                {/* a pop up dialog box */}
                <dialog className="dialog dialog--password" open={conflictDialog}>
                    <div>Member with that email address already exists</div>
                    <button className="button--close" onClick={e => setConflictDialog(false)}>Close</button>
                </dialog>
                <h1>Lost River Call Center</h1>
                <form className="form--login" onSubmit={handleUpdateMember}>
                    <h2 className="h3 mb-3 font-weight-normal">Edit Member</h2>
                    <fieldset>
                        <label htmlFor="firstName"> First Name </label>
                        <input onChange={handleInputChange} type="text" name="firstName" className="form-control" placeholder="first name" value={updatedMemberObj.firstName} id="firstName" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="lastName"> Last Name </label>
                        <input onChange={handleInputChange} type="text" name="lastName" className="form-control" placeholder="last name" value={updatedMemberObj.lastName} id="lastName" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input onChange={handleInputChange} type="email" name="email" className="form-control" placeholder="email address" value={updatedMemberObj.email} id="email" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="groupNumber"> Group Number </label>
                        <select onChange={handleInputChange} value={updatedMemberObj.groupId} name="groupId" id="groupId" className="form-control" required >
                            <option value="0">Select a Group</option>
                            {groups.map(group => {
                                return <option key={group.id} value={group.id}>{group.name}</option>
                            })}
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPhone"> Phone Number </label>
                        <input onChange={handleInputChange} value={updatedMemberObj.phone} id="phone" type="phone" name="phone" className="form-control" placeholder="(270) 555-2030" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputAddress"> Address </label>
                        <input onChange={handleInputChange} value={updatedMemberObj.address} id="address" type="address" name="address" className="form-control" placeholder="address" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputCity"> City </label>
                        <input onChange={handleInputChange} value={updatedMemberObj.city} id="city" type="text" name="city" className="form-control" placeholder="city" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputState"> State </label>
                        <select onChange={handleInputChange} value={updatedMemberObj.state} name="state" id="state" className="form-control" >
                            <option value="0">Select a State</option>
                            {states.map(state => {
                                stateCounter++
                                return <option key={stateCounter} value={state}>{state}</option>
                            })}
                        </select>
                    </fieldset>
                    <fieldset>
                        <button disabled={isLoading} onClick={handleDelete}> Delete Member </button>
                        <button onClick={handleCancel}> Cancel </button>
                        <button disabled={isLoading} type="submit"> Submit Edit </button>
                    </fieldset>
                </form>
            </section>
        </main>
    )
}