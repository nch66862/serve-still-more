import './MemberCard.css'

export const MemberCard = ({ member }) => {
    return (
        <h5 className="personCard">{member.firstName} {member.lastName}</h5>
    )
}