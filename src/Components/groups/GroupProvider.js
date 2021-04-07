import React, { useState, createContext } from "react"
// The context is imported and used by individual components that need data
export const GroupContext = createContext()
// This component establishes what data can be used.
export const GroupProvider = (props) => {
    //a state variable to store all the group data
    const [groups, setGroups] = useState([])
    //returns all group objects
    const getGroups = () => {
        return fetch("https://serve-still-more-api.herokuapp.com/groups")
            .then(res => res.json())
            .then(setGroups)
    }
    //creates
    const addGroup = groupObj => {
        return fetch("https://serve-still-more-api.herokuapp.com/groups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(groupObj)
        })
        .then(getGroups)
    }
    //finds one group object by its primary key
    const getGroupById = (id) => {
        return fetch(`https://serve-still-more-api.herokuapp.com/groups/${id}`)
            .then(res => res.json())
    }
    //edits
    const updateGroup = groupObj => {
        return fetch(`https://serve-still-more-api.herokuapp.com/groups/${groupObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(groupObj)
        })
            .then(getGroups)
    }
    //deletes
    const deleteGroup = groupId => {
        return fetch(`https://serve-still-more-api.herokuapp.com/groups/${groupId}`, {
            method: "DELETE",
        })
            .then(getGroups)
    }
    //allows access to this data and functions
    return (
        <GroupContext.Provider value={{
            groups, getGroups, addGroup, getGroupById, updateGroup, deleteGroup
        }}>
            {props.children}
        </GroupContext.Provider>
    )
}