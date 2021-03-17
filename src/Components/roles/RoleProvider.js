import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const RoleContext = createContext()

// This component establishes what data can be used.
export const RoleProvider = (props) => {
    const [roles, setRoles] = useState([])

    const getRoles = () => {
        return fetch("http://localhost:8088/roles")
            .then(res => res.json())
            .then(setRoles)
    }

    const addRole = roleObj => {
        return fetch("http://localhost:8088/roles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(roleObj)
        })
        .then(getRoles)
    }

    const getRoleById = (id) => {
        return fetch(`http://localhost:8088/roles/${id}`)
            .then(res => res.json())
    }

    const updateRole = roleObj => {
        return fetch(`http://localhost:8088/roles/${roleObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(roleObj)
        })
            .then(getRoles)
    }

    const deleteRole = groupId => {
        return fetch(`http://localhost:8088/roles/${groupId}`, {
            method: "DELETE",
        })
            .then(getRoles)
    }

    return (
        <RoleContext.Provider value={{
            roles, getRoles, addRole, getRoleById, updateRole, deleteRole
        }}>
            {props.children}
        </RoleContext.Provider>
    )
}