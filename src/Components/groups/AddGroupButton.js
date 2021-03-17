import { useContext, useEffect } from "react"
import { GroupContext } from "./GroupProvider"

export const AddGroupButton = () => {
    const { addGroup, getGroups, groups } = useContext(GroupContext)
    const nextGroupNumber = () => {
        if (groups.length === 0) {
            return "1"
        } else {
            return parseInt(groups[groups.length - 1].name) + 1
        }
    }

    useEffect(() => {
        getGroups()
    }, [])

    const addAnotherGroup = () => {
        const nextNumber = nextGroupNumber()
        let newGroup = {}
        newGroup.name = nextNumber.toString()
        debugger
        addGroup(newGroup)
    }

    return <button onClick={addAnotherGroup}>+ Group</button>
}