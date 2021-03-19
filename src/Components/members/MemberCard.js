import { Link } from 'react-router-dom'
import './MemberCard.css'

export const MemberCard = ({ member }) => {
    return (
        <Link to={`/members/detail/${member.id}`}>
            <h5 className="personCard">{member.firstName} {member.lastName}</h5>
        </Link>
    )
}
