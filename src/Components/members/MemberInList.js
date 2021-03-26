import { useContext } from 'react'
import './MemberInList.css'
import { MemberContext } from './MemberProvider'
//component that represents a single member and will update the chosen member if it is clicked on
export const MemberInList = ({ member }) => {
    //allows access to a state variable in the member provider
    const { setMemberToCall } = useContext(MemberContext)
    //function that sets the chosen member when the element is clicked on
    const handleClickMember = () => {
        setMemberToCall(member)
    }
    return (
        <>
            <h5 onClick={handleClickMember} className="personInList">{member.firstName} {member.lastName}</h5>
        </>
    )
}
