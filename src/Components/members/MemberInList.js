import './MemberInList.css'

export const MemberInList = ({ member, setMemberToCall }) => {
    const handleClickMember = () => {
        setMemberToCall(member)
    }
    return (
        <>
            <h5 onClick={handleClickMember} className="personInList">{member.firstName} {member.lastName}</h5>
        </>
    )
}
