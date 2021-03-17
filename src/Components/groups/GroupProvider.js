import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const GroupContext = createContext()

// This component establishes what data can be used.
export const GroupProvider = (props) => {
    const [groups, setGroups] = useState([])

    const getGroups = () => {
        return fetch("http://localhost:8088/groups")
            .then(res => res.json())
            .then(setGroups)
    }

    const addGroup = groupObj => {
        return fetch("http://localhost:8088/groups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(groupObj)
        })
        .then(getGroups)
    }

    const getGroupById = (id) => {
        return fetch(`http://localhost:8088/groups/${id}`)
            .then(res => res.json())
    }

    const updateGroup = groupObj => {
        return fetch(`http://localhost:8088/groups/${groupObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(groupObj)
        })
            .then(getGroups)
    }

    const deleteGroup = groupId => {
        return fetch(`http://localhost:8088/groups/${groupId}`, {
            method: "DELETE",
        })
            .then(getGroups)
    }


    return (
        <GroupContext.Provider value={{
            groups, getGroups, addGroup, getGroupById, updateGroup, deleteGroup
        }}>
            {props.children}
        </GroupContext.Provider>
    )
}