import React, { useState } from "react"
import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
import { userStorageKey } from "./authSettings"
// import { authApi } from "./authSettings"
import "./Login.css"
//This is a form to log an existing user in
export const Login = () => {
    //The main state variable
    // const [loginUser, setLoginUser] = useState({
    //     email: "",
    //     password: ""
    // })
    //a state variable for a pop up email dialog box
    const [existDialog, setExistDialog] = useState(false)
    //a state variable for an incorrect password dialog box
    const [passExistDialog, setPassExistDialog] = useState(false)
    //useHistory keeps track of the URL visted in a URL stack
    const history = useHistory()
    //updates the state variable when things are typed in the username and password box
    // const handleInputChange = (event) => {
    //     const newUser = { ...loginUser }
    //     newUser[event.target.id] = event.target.value
    //     setLoginUser(newUser)
    // }
    //checks that the user exists in the database
    // const existingUserCheck = () => {
    //     return fetch(`${authApi.localApiBaseUrl}/${authApi.endpoint}?email=${loginUser.email}`)
    //         .then(res => res.json())
    //         .then(user => user.length ? user[0] : false)
    // }
    //functions used for demo website
    const logInAsElder = (event) => {
        event.preventDefault()
        sessionStorage.setItem(userStorageKey, 5)
        history.push("/")
    }
    const logInAsDeacon = (event) => {
        event.preventDefault()
        sessionStorage.setItem(userStorageKey, 7)
        history.push("/")
    }
    //the function that checks username and password. Sets error dialog boxes if the user cant log in or redirects to the homepage if login credentials are correct
    // const handleLogin = (event) => {
    //     event.preventDefault()
    //     existingUserCheck()
    //         .then(exists => {
    //             if (exists) {
    //                 if (exists.password === loginUser.password) {
    //                     sessionStorage.setItem(userStorageKey, exists.id)
    //                     history.push("/")
    //                 }
    //                 else {
    //                     setPassExistDialog(true)
    //                 }
    //             } else {
    //                 setExistDialog(true)
    //             }
    //         })
    // }
    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" open={existDialog}>
                <div>an account with this email address does not exist</div>
                <button className="btn button--close" onClick={e => setExistDialog(false)}>Close</button>
            </dialog>
            <dialog className="dialog dialog--auth" open={passExistDialog}>
                <div>incorrect password</div>
                <button className="btn button--close" onClick={e => setPassExistDialog(false)}>Close</button>
            </dialog>
            <section>
                <form className="form--login" >
                    <h1>Lost River Call Center</h1>
                    <h2>Sign In</h2>
                    {/* <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            id="email"
                            className="form-control"
                            placeholder="email address"
                            required autoFocus
                            value={loginUser.email}
                            autoComplete="username"
                            onChange={handleInputChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input type="password"
                            id="password"
                            className="form-control"
                            placeholder="password"
                            required
                            value={loginUser.password}
                            autoComplete="current-password"
                            onChange={handleInputChange} />
                    </fieldset>
                    <fieldset>
                        <button className="btn" type="submit">Sign in</button>
                    </fieldset> */}
                    <button onClick={logInAsElder} className="btn signInButton" type="submit">Sign in as Elder</button>
                    <button onClick={logInAsDeacon} className="btn signInButton" type="submit">Sign in as Deacon</button>
                </form>
            </section>
            {/* <section className="link--register">
                <Link to="/register">Register for an account</Link>
            </section> */}
        </main>
    )
}