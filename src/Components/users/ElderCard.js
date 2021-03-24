import './UserCard.css'

export const ElderCard = ({ user }) => {
    return (
        <h5 className="userCard">{user.firstName} {user.lastName}</h5>
    )
}