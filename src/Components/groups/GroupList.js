import { useContext, useEffect } from "react"
import { MemberContext } from "../members/MemberProvider"
import { UserContext } from "../users/UserProvider"
import { GroupContext } from "./GroupProvider"

export const GroupList = () => {
    const { groups, getGroups } = useContext(GroupContext)
    const { users, getUsers } = useContext(UserContext)
    const { members, getMembers } = useContext(MemberContext)

    useEffect(() => {
        getMembers()
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
                        <h3>Deacons</h3>
                        <h3>Members</h3>
                    </article>
                )
            })}
        </section>
    )
}