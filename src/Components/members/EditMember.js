import { useContext, useEffect } from "react";
import { MemberContext } from "./MemberProvider";
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { states } from "../Settings"
import { GroupContext } from "../groups/GroupProvider";
import './EditMember.css'

export const EditMember = ({ member }) => {
    const { updateMember, getMemberById } = useContext(MemberContext)
    const { groups, getGroups } = useContext(GroupContext)
    const history = useHistory()
    let stateCounter = 0
    const [registerMember, setRegisterMember] = useState({
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
        const newMember = { ...registerMember }
        if (event.target.id.includes("Id")) {
            newMember[event.target.id] = parseInt(event.target.value)
        } else {
            newMember[event.target.id] = event.target.value
        }
        setRegisterMember(newMember)
    }

    const existingMemberEmailCheck = () => {
        return fetch(`http://localhost:8088/members/?email=${registerMember.email}`)
            .then(res => res.json())
    }

    const handleRegisterMember = (event) => {
        event.preventDefault()
        existingMemberEmailCheck()
            .then((user) => {
                if (!user[0] || user[0].email === "") {
                    updateMember(registerMember)
                        .then(() => history.push("/"))
                }
                else {
                    setConflictDialog(true)
                }
            })
    }

    useEffect(() => {
        getGroups()
            .then(() => {
                getMemberById(member.id)
                    .then(member => {
                        setRegisterMember(member)
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
                <form className="form--login" onSubmit={handleRegisterMember}>
                    <h1 className="h3 mb-3 font-weight-normal">Edit Member</h1>
                    <fieldset>
                        <label htmlFor="firstName"> First Name </label>
                        <input onChange={handleInputChange} type="text" name="firstName" className="form-control" placeholder="first name" value={registerMember.firstName} id="firstName" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="lastName"> Last Name </label>
                        <input onChange={handleInputChange} type="text" name="lastName" className="form-control" placeholder="last name" value={registerMember.lastName} id="lastName" required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input onChange={handleInputChange} type="email" name="email" className="form-control" placeholder="email address" value={registerMember.email} id="email" />
                    </fieldset>
                    <dialog className="dialog dialog--memberCreated" open={memberCreatedDialog}>
                        <div>new member has been saved</div>
                    </dialog>
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
                        <button type="submit"> Submit Edit </button>
                    </fieldset>
                </form>
            </section>
        </main>
    )

}