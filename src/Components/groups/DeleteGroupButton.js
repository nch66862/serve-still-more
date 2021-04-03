import { useContext, useEffect, useState } from "react"
import { GroupContext } from "./GroupProvider"
import './DeleteGroupButton.css'
import { MemberContext } from "../members/MemberProvider"
import { UserContext } from "../users/UserProvider"
//a component that is only a button. But the button shows only when nobody is in the group and deletes that group if clicked on.
export const DeleteGroupButton = ({ group }) => {
    //allows access to things in the group, user, and member providers
    const { deleteGroup } = useContext(GroupContext)
    const { members } = useContext(MemberContext)
    const { users } = useContext(UserContext)
    //sets state variable for showing or hiding the button
    const [showDelete, setShowDelete] = useState(false)
    //checks to see if there are any users or members in the group to display the delete button
    useEffect(() => {
        let matchCounter = 0
        // eslint-disable-next-line
        members.map(member => {
            if (member.groupId === group.id) matchCounter++
        })
        // eslint-disable-next-line
        users.map(user => {
            if (user.groupId === group.id) matchCounter++
        })
        if (matchCounter === 0) setShowDelete(true)
        else setShowDelete(false)
    }, [members, users])
    //the function that deletes the group from the database
    const deleteThisGroup = () => {
        deleteGroup(group.id)
    }
    return showDelete && <button className="deleteButton deleteGroupButton" onClick={deleteThisGroup}> delete </button>
}