import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom";
import { authApi, userStorageKey } from "./authSettings"
import "./Login.css"


export const Login = () => {
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    })
    const [existDialog, setExistDialog] = useState(false)
    const [passExistDialog, setPassExistDialog] = useState(false)

    const history = useHistory()

    const handleInputChange = (event) => {
        const newUser = { ...loginUser }
        newUser[event.target.id] = event.target.value
        setLoginUser(newUser)
    }


    const existingUserCheck = () => {
        return fetch(`${authApi.localApiBaseUrl}/${authApi.endpoint}?email=${loginUser.email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (event) => {
        event.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    if (exists.password === loginUser.password) {
                        sessionStorage.setItem(userStorageKey, exists.id)
                        history.push("/")
                    }
                    else {
                        setPassExistDialog(true)
                    }
                } else {
                    setExistDialog(true)
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" open={existDialog}>
                <div>an account with this email address does not exist</div>
                <button className="button--close" onClick={e => setExistDialog(false)}>Close</button>
            </dialog>
            <dialog className="dialog dialog--auth" open={passExistDialog}>
                <div>incorrect password</div>
                <button className="button--close" onClick={e => setPassExistDialog(false)}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Lost River Call Center</h1>
                    <h2>Sign In</h2>
                    <fieldset>
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
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Register for an account</Link>
            </section>
        </main>
    )
}