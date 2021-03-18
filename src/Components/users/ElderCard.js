import './UserCard.css'

export const ElderCard = ({ user }) => {
    return (
        <h5 className="personCard">{user.firstName} {user.lastName}</h5>
    )
}