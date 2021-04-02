import { useContext, useEffect, useState } from "react"
import { MemberContext } from "../members/MemberProvider"
import { UserContext } from "./UserProvider"
import { RoleContext } from "../roles/RoleProvider"
import { HistoryContext } from "../history/HistoryProvider"
import { MemberInList } from "../members/MemberInList"
import './MemberCallList.css'
//component that handles filtering and equally distributing the members and the deacons in a single group
export const MemberCallList = () => {
    //the contexts use object deconstruction to gain access to the keys that relate to the data in the respective providers
    const { users, getUsers } = useContext(UserContext)
    const { members, getMembers } = useContext(MemberContext)
    const { roles, getRoles } = useContext(RoleContext)
    const { history, getHistory } = useContext(HistoryContext)
    //specifies the state variable that contains an array of people to call that week
    const [membersToCall, setMembersToCall] = useState([])
    //specifies the state variable that contains an array of people to call that week
    const [groupMembers, setGroupMembers] = useState([])
    //get the data for all the calculations
    useEffect(() => {
        getUsers()
            .then(getMembers)
            .then(getRoles)
            .then(getHistory)
    }, [])
    //updates what is seen in the call list when the history is submitted and  when a member is edited
    useEffect(() => {
        const newGroupMembers = calculateMembersToCall(users, members, roles, history, setMembersToCall)
        setGroupMembers(newGroupMembers)
    }, [history, members])
    //returns to be rendered if there is data in the state variable
    return (
        <section className="callList">
            <h2>To Call This Week</h2>
            {membersToCall.length > 0 ? membersToCall.map(member => {
                return <MemberInList key={member.id} member={member} />
            }): <p className="callingCompleteMessage">Everyone Has Been Called!</p>}
            <h2>All Group Members</h2>
            {groupMembers.length > 0 && groupMembers.map(member => {
                return <MemberInList key={member.id} member={member} />
            })}
        </section>
    )
}
//handles getting all group members and calculates how many and which ones a logged in user should call
const calculateMembersToCall = (users, members, roles, history, setMembersToCall) => {
    //initializes a current date object
    const todaysDate = new Date()
    //returns the day of the week as a number [0-6] for each day of the week. starting with Sunday.
    const dayOfTheWeek = todaysDate.getDay()
    //finds a number, in milliseconds from 1970, of the past sunday at the current time
    const timeAtBeginningOfWeek = todaysDate.getTime() - dayOfTheWeek * 86400000
    //specifies an empty array to store members that need to be called and were not last called by the currently logged in user
    let membersThatUserDidNotCallLast = []
    //gets the userId from the session storage
    const loggedInUserId = parseInt(sessionStorage.getItem("Lost_River_User"))
    //All members in the users group
    let groupMembers = []
    //waits until all of the provider state variables have data before doing the math
    if (users.length && members.length && roles.length) {
        //finds the logged in user object
        const loggedInUserObj = users.find(user => user.id === loggedInUserId)
        //gets all of the members in the logged in users group
        groupMembers = members.filter(member => member.groupId === loggedInUserObj.groupId)
        //the next line disables a warning. the line is filtering the members to see if a specific member has already been called since this past sunday and returns it.
        // eslint-disable-next-line
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
            //if a history object does not exist or they were called later in time than since this past sunday, return it in the filter. If there is a history post and the post is not related to the currently logged in member, add that member to the array of people that the user can call.
            if (latestHistoryPostForMember === undefined || dateOfLatestHistoryPost < timeAtBeginningOfWeek) {
                if (latestHistoryPostForMember?.userId !== loggedInUserId) {
                    membersThatUserDidNotCallLast.push(member)
                }
                return member
            }
        })
        //get all users in a specific group
        const groupUsers = users.filter(user => user.groupId === loggedInUserObj.groupId)
        //find the role object that has the name deacon
        const matchingRole = roles.find(role => role.name.toLowerCase().includes("deacon"))
        //return all deacons in the logged in users group
        const groupDeacons = groupUsers.filter(user => user.roleId === matchingRole.id)
        //see how many members each deacon is to call if they are distrubuted evenly
        const membersPerDeacon = Math.ceil(membersThatHaveNotBeenCalled.length / groupDeacons.length)
        let newCallList = []
        // eslint-disable-next-line
        membersThatUserDidNotCallLast.map(member => {
            //build up the call list to the number that is equal to the equally distributed number of deacons
            if (newCallList.length < membersPerDeacon) {
                newCallList.push(member)
            }
        })
        //set the state variable of the array that is to be rendered to the DOM if it is less than the amount of people they are to call that week.
        setMembersToCall(newCallList)
    }
    return groupMembers
}