import { useContext } from 'react'
import './MemberInList.css'
import { MemberContext } from './MemberProvider'

export const MemberInList = ({ member }) => {
    const { setMemberToCall } = useContext(MemberContext)
    const handleClickMember = () => {
        setMemberToCall(member)
    }
    return (
        <>
            <h5 onClick={handleClickMember} className="personInList">{member.firstName} {member.lastName}</h5>
        </>
    )
}
