import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { states } from "../Settings"
import { authApi, userStorageKey } from "./authSettings"
import "./Register.css"

export const Register1 = () => {
    const history = useHistory()
    let stateCounter = 0
    const [currentPage, setCurrentPage] = useState("first")
    const [registerUser, setRegisterUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        groupId: 0,
        role: 0,
        phone: "",
        address: "",
        city: "",
        state: "",
        photo: "",
        callTime: "",
        canCall: false,
        familyId: "",
        primaryMember: false
    })
    const [conflictDialog, setConflictDialog] = useState(false)

    const handleInputChange = (event) => {
        const newUser = { ...registerUser }
        newUser[event.target.id] = event.target.value
        setRegisterUser(newUser)
    }

    const existingUserCheck = () => {
        return fetch(`${authApi.localApiBaseUrl}/${authApi.endpoint}?email=${registerUser.email}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const nextPage = (event) => {
        event.preventDefault()
        setCurrentPage("second")
    }

    const handleRegister = (event) => {
        event.preventDefault()
        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch(`${authApi.localApiBaseUrl}/${authApi.endpoint}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(registerUser)
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                sessionStorage.setItem(userStorageKey, createdUser.id)
                                history.push("/")
                            }
                        })
                }
                else {
                    setConflictDialog(true)
                }
            })
    }

    return (
        currentPage === "first" ? <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" open={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => setConflictDialog(false)}>Close</button>
            </dialog>
            <h1>Lost River Call Center</h1>
            <form className="form--login" onSubmit={nextPage}>
                <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={handleInputChange} type="text" name="firstName" className="form-control" placeholder="first name" value={registerUser.firstName} id="firstName" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={handleInputChange} type="text" name="lastName" className="form-control" placeholder="last name" value={registerUser.lastName} id="lastName" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input onChange={handleInputChange} type="email" name="email" className="form-control" placeholder="email address" value={registerUser.email} id="email" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Create Password </label>
                    <input onChange={handleInputChange} type="password" name="email" className="form-control" placeholder="create password" value={registerUser.password} id="password" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Next </button>
                </fieldset>
            </form>
        </main> : <main style={{ textAlign: "center" }}>
            <h1>Lost River Call Center</h1>
            <h3>A Little More Information Is Needed</h3>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
                <fieldset>
                    <label htmlFor="firstName"> Group Number </label>
                    <select onChange={handleInputChange} value={registerUser.locationId} name="locationId" id="locationId" className="form-control" >
                        <option value="0">Select a Group</option>
                        {states.map(state => {
                            stateCounter++
                            return <option key={stateCounter} value={stateCounter}>{state}</option>
                        })}
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Role </label>
                    <select onChange={handleInputChange} value={registerUser.locationId} name="locationId" id="locationId" className="form-control" >
                        <option value="0">Select a Role</option>
                        {states.map(state => {
                            stateCounter++
                            return <option key={stateCounter} value={stateCounter}>{state}</option>
                        })}
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Phone Number </label>
                    <input onChange={handleInputChange} value={registerUser.phone} type="email" name="email" className="form-control" placeholder="9805554466" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Address </label>
                    <input onChange={handleInputChange} value={registerUser.address} type="email" name="email" className="form-control" placeholder="address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> City </label>
                    <input onChange={handleInputChange} value={registerUser.city} type="email" name="email" className="form-control" placeholder="city" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> State </label>
                    <select onChange={handleInputChange} value={registerUser.state} name="locationId" id="locationId" className="form-control" >
                        <option value="0">Select a State</option>
                        {states.map(state => {
                            stateCounter++
                            return <option key={stateCounter} value={stateCounter}>{state}</option>
                        })}
                    </select>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

