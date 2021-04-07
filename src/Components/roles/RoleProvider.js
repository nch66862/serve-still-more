import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const RoleContext = createContext()
// This component establishes what data can be used.
export const RoleProvider = (props) => {
    //the main state variable that holds all of the roles object
    const [roles, setRoles] = useState([])
    //gets all of the role objects from the database
    const getRoles = () => {
        return fetch("https://serve-still-more-api.herokuapp.com/roles")
            .then(res => res.json())
            .then(setRoles)
    }
    //adds a single role object to the database
    const addRole = roleObj => {
        return fetch("https://serve-still-more-api.herokuapp.com/roles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(roleObj)
        })
        .then(getRoles)
    }
    //return a single role object from the database
    const getRoleById = (id) => {
        return fetch(`https://serve-still-more-api.herokuapp.com/roles/${id}`)
            .then(res => res.json())
    }
    //updates a single role object in the database
    const updateRole = roleObj => {
        return fetch(`https://serve-still-more-api.herokuapp.com/roles/${roleObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(roleObj)
        })
            .then(getRoles)
    }
    //deletes a single role object from the database
    const deleteRole = groupId => {
        return fetch(`https://serve-still-more-api.herokuapp.com/roles/${groupId}`, {
            method: "DELETE",
        })
            .then(getRoles)
    }
    //makes all of the functions and variables in the provider available in the context
    return (
        <RoleContext.Provider value={{
            roles, getRoles, addRole, getRoleById, updateRole, deleteRole
        }}>
            {props.children}
        </RoleContext.Provider>
    )
}