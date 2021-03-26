import './UserCard.css'
//component that shows the basic information for a single elder
export const ElderCard = ({ user }) => {
    return (
        <h5 className="userCard">{user.firstName} {user.lastName}</h5>
    )
}