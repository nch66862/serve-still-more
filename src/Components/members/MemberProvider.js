import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const MemberContext = createContext()
// This component establishes what data can be used.
export const MemberProvider = (props) => {
    //main state variable that holds all of the member data from the API
    const [members, setMembers] = useState([])
    //state variable that keeps track of the member that is rendered in the detail and in the history to be called
    const [memberToCall, setMemberToCall] = useState({})
    //gets all of the members from the database
    const getMembers = () => {
        return fetch("https://serve-still-more-api.herokuapp.com/members")
            .then(res => res.json())
            .then(setMembers)
    }
    //adds a member to the database
    const addMember = memberObj => {
        return fetch("https://serve-still-more-api.herokuapp.com/members", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(memberObj)
        })
        .then(getMembers)
    }
    //fetches a single member in the database given its primary key
    const getMemberById = (id) => {
        return fetch(`https://serve-still-more-api.herokuapp.com/members/${id}`)
            .then(res => res.json())
    }
    //changes a single member object in the database with new data given its primary key
    const updateMember = member => {
        return fetch(`https://serve-still-more-api.herokuapp.com/members/${member.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(member)
        })
            .then(getMembers)
    }
    //deletes a member object in the database given its primary key
    const deleteMember = memberId => {
        return fetch(`https://serve-still-more-api.herokuapp.com/members/${memberId}`, {
            method: "DELETE",
        })
            .then(getMembers)
    }
    //exposes all of the functions and data from the provider in the context
    return (
        <MemberContext.Provider value={{
            members, getMembers, addMember, getMemberById, updateMember, deleteMember, memberToCall, setMemberToCall
        }}>
            {props.children}
        </MemberContext.Provider>
    )
}