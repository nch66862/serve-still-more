import { useContext, useEffect } from "react"
import { MemberContext } from "../members/MemberProvider"
import { RoleContext } from "../roles/RoleProvider"
import { ElderCard } from "../users/ElderCard"
import { DeaconCard } from "../users/DeaconCard"
import { UserContext } from "../users/UserProvider"
import { GroupContext } from "./GroupProvider"
import { MemberCard } from "../members/MemberCard"
import './GroupList.css'
//this component 
export const GroupList = () => {
    //the contexts expose the data from the provider
    const { groups, getGroups } = useContext(GroupContext)
    const { users, getUsers } = useContext(UserContext)
    const { roles, getRoles } = useContext(RoleContext)
    const { members, getMembers } = useContext(MemberContext)
    //initializes variables before we know their true value
    let elderRoleId = 0
    let deaconRoleId = 0
    //assigns the true value once roles contains data
    if (roles.length) {
        elderRoleId = roles.find(role => role.name.toLowerCase() === "elder").id
        deaconRoleId = roles.find(role => role.name.toLowerCase() === "deacon").id
    }
    //makes the fetch call for all the data in this component
    useEffect(() => {
        getMembers()
            .then(getRoles)
            .then(getUsers)
            .then(getGroups)
    }, [])
    return (
        <section className="groupList">
            {/* map through each group */}
            {groups.map(group => {
                return (
                    <article key={group.id}>
                        <h2>Group {group.name}</h2>
                        <h3>Elders</h3>
                        <section className="cardList">
                        {/* map through the users and find the ones that match this group and has the role of elder */}
                        {users.map(user => {
                            return user.groupId === group.id && user.roleId === elderRoleId ? <ElderCard key={user.id} user={user}/> : ""
                        })}
                        </section>
                        <h3>Deacons</h3>
                        <section className="cardList">
                        {/* map through the users and find the ones that match this group and has the role of deacon */}
                        {users.map(user => {
                            return user.groupId === group.id && user.roleId === deaconRoleId ? <DeaconCard key={user.id} user={user}/> : ""
                        })}
                        </section>
                        <h3>Members</h3>
                        <section className="cardList">
                        {/* map through the members and find the ones that match this group */}
                        {members.map(member => {
                            return member.groupId === group.id ? <MemberCard key={member.id} member={member}/> : ""
                        })}
                        </section>
                    </article>
                )
            })}
        </section>
    )
}