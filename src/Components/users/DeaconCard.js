import './UserCard.css'

export const DeaconCard = ({ user }) => {
    return (
        <h5 className="personCard">{user.firstName} {user.lastName}</h5>
    )
}