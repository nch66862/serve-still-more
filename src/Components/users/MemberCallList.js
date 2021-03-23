import { useContext, useEffect } from "react"
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
    let groupDeacons = []
    let latestHistoryPostForMember = {}

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
            latestHistoryPostForMember = sortedHistoryByDate[0]
            if (latestHistoryPostForMember === undefined || latestHistoryPostForMember?.date.getTime() > timeAtBeginningOfWeek) {
                return member
            }
        })
        console.log(membersThatHaveNotBeenCalled)
        const groupUsers = users.filter(user => user.groupId === loggedInUserObj.groupId)
        const matchingRole = roles.find(role => role.name.toLowerCase().includes("deacon"))
        groupDeacons = groupUsers.filter(user => user.roleId === matchingRole.id)
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

    return (
        <>
            {console.log(latestHistoryPostForMember)}
        </>
    )
}