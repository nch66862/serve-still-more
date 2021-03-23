import { useContext, useEffect } from "react";
import { MemberContext } from "./MemberProvider";
import React, { useState } from "react"
import { states } from "../Settings"
import { GroupContext } from "../groups/GroupProvider";
import './EditMember.css'

export const EditMember = ({ member, setOpenEditMember, setOpenDetail, callingMember }) => {
    const { updateMember, getMemberById, deleteMember } = useContext(MemberContext)
    const { groups, getGroups } = useContext(GroupContext)
    let stateCounter = 0
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

    const [conflictDialog, setConflictDialog] = useState(false)
    const [memberCreatedDialog, setMemberCreatedDialog] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    const handleInputChange = (event) => {
        const newMember = { ...updatedMemberObj }
        if (event.target.id.includes("Id")) {
            newMember[event.target.id] = parseInt(event.target.value)
        } else {
            newMember[event.target.id] = event.target.value
        }
        setUpdatedMemberObj(newMember)
    }

    const existingMemberEmailCheck = () => {
        return fetch(`http://localhost:8088/members/?email=${updatedMemberObj.email}`)
            .then(res => res.json())
    }

    const handleUpdateMember = (event) => {
        event.preventDefault()
        setIsLoading(true)
        updateMember(updatedMemberObj)
            .then(() => {
                setOpenEditMember(false)
                if (!callingMember) {
                    setOpenDetail(true)
                }
            })
    }

    const handleCancel = (event) => {
        event.preventDefault()
        setOpenEditMember(false)
        if (!callingMember) {
            setOpenDetail(true)
        }
    }

    const handleDelete = (event) => {
        event.preventDefault()
        setIsLoading(true)
        deleteMember(updatedMemberObj.id)
            .then(() => {
                setOpenEditMember(false)
            })
    }

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

    return (
        <main className="modal--parent" style={{ textAlign: "center" }}>
            <section className="modal--content">
                <dialog className="dialog dialog--password" open={conflictDialog}>
                    <div>Member with that email address already exists</div>
                    <button className="button--close" onClick={e => setConflictDialog(false)}>Close</button>
                </dialog>
                <h1>Lost River Call Center</h1>
                <form className="form--login" onSubmit={handleUpdateMember}>
                    <h1 className="h3 mb-3 font-weight-normal">Edit Member</h1>
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
                    <dialog className="dialog dialog--memberCreated" open={memberCreatedDialog}>
                        <div>new member has been saved</div>
                    </dialog>
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
                        <button onClick={handleDelete}> Delete Member </button>
                        <button onClick={handleCancel}> Cancel </button>
                        <button disabled={isLoading} type="submit"> Submit Edit </button>
                    </fieldset>
                </form>
            </section>
        </main>
    )

}