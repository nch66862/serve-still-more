import { useContext, useEffect } from "react"

export const MemberCallList = () => {
    const { users, getUsers } = useContext(UserContext)

    const loggedInUser = parseInt(sessionStorage.getItem("Lost_River_User"))
    if (users.length) {
        const loggedInUserGroup = users.find(user => user.groupId === loggedInUser)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
        </>
    )
}