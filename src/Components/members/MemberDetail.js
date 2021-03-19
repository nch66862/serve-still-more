import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { MemberContext } from "./MemberProvider"

export const MemberDetail = () => {

    const [member, setMember] = useState({})
    const { getMemberById } = useContext(MemberContext)
    const { memberId } = useParams()

    useEffect(() => {
        getMemberById(memberId)
        .then(setMember)
    }, [])
    return (
        <>
        <h1>{member?.firstName} {member?.lastName}</h1>
        </>
    )
}