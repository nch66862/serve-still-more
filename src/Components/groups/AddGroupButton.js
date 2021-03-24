import { useContext, useEffect } from "react"
import { GroupContext } from "./GroupProvider"
import './AddGroupButton.css'
//a component that is only a button. But the button decides which group to add next
export const AddGroupButton = () => {
    //allows access to things in the group provider
    const { addGroup, getGroups, groups } = useContext(GroupContext)
    //decides what needs to be in the next group object
    const nextGroupNumber = () => {
        if (groups.length === 0) {
            return "1"
        } else {
            return parseInt(groups[groups.length - 1].name) + 1
        }
    }
    //gets the group data after the button renders the first time
    useEffect(() => {
        getGroups()
    }, [])
    //the function that sets the name property of the object and makes the fetch call
    const addAnotherGroup = () => {
        const nextNumber = nextGroupNumber()
        let newGroup = {}
        newGroup.name = nextNumber.toString()
        addGroup(newGroup)
    }
    return <button className="btn addGroupButton" onClick={addAnotherGroup}> + Group </button>
}