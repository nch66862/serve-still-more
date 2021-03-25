import './UserCard.css'
//component that shows the basic information for a single deacon
export const DeaconCard = ({ user }) => {
    return (
        <h5 className="userCard">{user.firstName} {user.lastName}</h5>
    )
}