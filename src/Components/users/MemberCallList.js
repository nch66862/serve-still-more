import { useContext, useEffect, useState } from "react"
import { MemberContext } from "../members/MemberProvider"
import { UserContext } from "./UserProvider"
import { RoleContext } from "../roles/RoleProvider"
import { HistoryContext } from "../history/HistoryProvider"

export const MemberCallList = () => {
    const { users, getUsers } = useContext(UserContext)
    const { members, getMembers } = useContext(MemberContext)
    const { roles, getRoles } = useContext(RoleContext)
    const { history, getHistory } = useContext(HistoryContext)
    const todaysDate = new Date()
    const dayOfTheWeek = todaysDate.getDay()
    const timeAtBeginningOfWeek = todaysDate.getTime() - dayOfTheWeek * 86400000
    const [membersToCall, setMembersToCall] = useState([])
    let membersThatUserDidNotCallLast = []

    const loggedInUserId = parseInt(sessionStorage.getItem("Lost_River_User"))
    if (users.length && members.length && roles.length) {
        const loggedInUserObj = users.find(user => user.id === loggedInUserId)
        const groupMembers = members.filter(member => member.groupId === loggedInUserObj.groupId)
        const membersThatHaveNotBeenCalled = groupMembers.filter(member => {
            const historyForThisMember = history.filter(history => history.memberId === member.id)
            const sortedHistoryByDate = historyForThisMember.slice().sort((a, b) => {
                const aDate = new Date(a.date)
                const bDate = new Date(b.date)
                a.date = aDate
                b.date = bDate
                return b.date - a.date
            })
            const latestHistoryPostForMember = sortedHistoryByDate[0]
            const dateOfLatestHistoryPost = Date.parse(latestHistoryPostForMember?.date)
            if (latestHistoryPostForMember === undefined || dateOfLatestHistoryPost < timeAtBeginningOfWeek) {
                if (latestHistoryPostForMember?.userId !== loggedInUserId) {
                    membersThatUserDidNotCallLast.push(member)
                }
                return member
            }
        })
        const groupUsers = users.filter(user => user.groupId === loggedInUserObj.groupId)
        const matchingRole = roles.find(role => role.name.toLowerCase().includes("deacon"))
        const groupDeacons = groupUsers.filter(user => user.roleId === matchingRole.id)
        const membersPerDeacon = Math.ceil(membersThatHaveNotBeenCalled.length / groupDeacons.length)
        let arrayPushCounter = 0
        membersThatUserDidNotCallLast.map(member => {
            if (arrayPushCounter < membersPerDeacon) {
                const newCallList = [...membersToCall]
                newCallList.push(member)
                setMembersToCall(newCallList)
                arrayPushCounter++
            }
        })

    }

    // filter the members that have not been called this week based on history
    // total the members
    // total the deacons
    // divide members/deacons
    // round up
    // push members to an array up to the number specified. if they were not called by that user last week

    useEffect(() => {
        getUsers()
            .then(getMembers)
            .then(getRoles)
            .then(getHistory)
    }, [])

    console.log(membersToCall)
    return (
        <>
            {membersToCall.length > 0 ? membersToCall.map(member => {
                return <p key={member.id}>{member.firstName} {member.lastName}</p>
            }) : ""}
        </>
    )
}