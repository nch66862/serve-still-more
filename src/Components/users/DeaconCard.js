import './UserCard.css'

export const DeaconCard = ({ user }) => {
    return (
        <h5 className="userCard">{user.firstName} {user.lastName}</h5>
    )
}