import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const MemberContext = createContext()

// This component establishes what data can be used.
export const MemberProvider = (props) => {
    const [members, setMembers] = useState([])

    const getMembers = () => {
        return fetch("http://localhost:8088/members")
            .then(res => res.json())
            .then(setMembers)
            .then(() => console.log("members", members))
    }

    const addMember = memberObj => {
        return fetch("http://localhost:8088/members", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(memberObj)
        })
            .then(getMembers)
    }

    const getMemberById = (id) => {
        return fetch(`http://localhost:8088/members/${id}`)
            .then(res => res.json())
    }

    const updateMember = member => {
        return fetch(`http://localhost:8088/members/${member.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(member)
        })
            .then(getMembers)
    }

    const deleteMember = memberId => {
        return fetch(`http://localhost:8088/members/${memberId}`, {
            method: "DELETE",
        })
            .then(getMembers)
    }


    return (
        <MemberContext.Provider value={{
            members, getMembers, addMember, getMemberById, updateMember, deleteMember
        }}>
            {props.children}
        </MemberContext.Provider>
    )
}