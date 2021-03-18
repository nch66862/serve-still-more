import { useContext, useEffect } from "react"
import { MemberContext } from "../members/MemberProvider"
import { RoleContext } from "../roles/RoleProvider"
import { ElderCard } from "../users/ElderCard"
import { DeaconCard } from "../users/DeaconCard"
import { UserContext } from "../users/UserProvider"
import { GroupContext } from "./GroupProvider"
import { MemberCard } from "../members/MemberCard"

export const GroupList = () => {
    const { groups, getGroups } = useContext(GroupContext)
    const { users, getUsers } = useContext(UserContext)
    const { roles, getRoles } = useContext(RoleContext)
    const { members, getMembers } = useContext(MemberContext)
    let elderRoleId = 0
    let deaconRoleId = 0
    if (roles.length) {
        elderRoleId = roles.find(role => role.name.toLowerCase() === "elder").id
        deaconRoleId = roles.find(role => role.name.toLowerCase() === "deacon").id
    }

    useEffect(() => {
        getMembers()
            .then(getRoles)
            .then(getUsers)
            .then(getGroups)
    }, [])
    return (
        <section className="groupList">
            {groups.map(group => {
                return (
                    <article key={group.id}>
                        <h2>Group {group.name}</h2>
                        <h3>Elders</h3>
                        {users.map(user => {
                            return user.groupId === group.id && user.roleId === elderRoleId ? <ElderCard key={user.id} user={user}/> : ""
                        })}
                        <h3>Deacons</h3>
                        {users.map(user => {
                            return user.groupId === group.id && user.roleId === deaconRoleId ? <DeaconCard key={user.id} user={user}/> : ""
                        })}
                        <h3>Members</h3>
                        {members.map(member => {
                            return member.groupId ? <MemberCard key={member.id} member={member}/> : ""
                        })}
                    </article>
                )
            })}
        </section>
    )
}