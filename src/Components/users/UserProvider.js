import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const UserContext = createContext()
// This component establishes what data can be used.
export const UserProvider = (props) => {
    //main state variable that stores all of the user data from the api
    const [users, setUsers] = useState([])
    //gets all of the user objects
    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)
    }
    //creates a user obj in the database
    const addUser = userObj => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObj)
        })
        .then(getUsers)
    }
    //fetches a single user object from the database
    const getUserById = (id) => {
        return fetch(`http://localhost:8088/users/${id}`)
            .then(res => res.json())
    }
    //replaces the infomation in an object with different information
    const updateUser = userObj => {
        return fetch(`http://localhost:8088/users/${userObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObj)
        })
            .then(getUsers)
    }
    //deletes a user object in the database
    const deleteUser = userId => {
        return fetch(`http://localhost:8088/users/${userId}`, {
            method: "DELETE",
        })
            .then(getUsers)
    }
    //allows access to things in the provider through the context
    return (
        <UserContext.Provider value={{
            users, getUsers, addUser, getUserById, updateUser, deleteUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}