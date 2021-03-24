import { useContext, useEffect, useState } from "react"
import { MemberContext } from "../members/MemberProvider"
import { UserContext } from "./UserProvider"
import { RoleContext } from "../roles/RoleProvider"
import { HistoryContext } from "../history/HistoryProvider"
import { MemberInList } from "../members/MemberInList"

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
        let newCallList = []
        membersThatUserDidNotCallLast.map(member => {
            if (newCallList.length < membersPerDeacon) {
                newCallList.push(member)
            }
        })
        if (membersToCall.length < membersPerDeacon) {
            setMembersToCall(newCallList)
        }
    }

    useEffect(() => {
        getUsers()
            .then(getMembers)
            .then(getRoles)
            .then(getHistory)
    }, [])

    return (
        <section>
            <h2>This Week</h2>
            {membersToCall.length > 0 ? membersToCall.map(member => {
                return <MemberInList key={member.id} member={member} />
            }) : ""}
        </section>
    )
}