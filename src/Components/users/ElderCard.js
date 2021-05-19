import './UserCard.css'
import { Image } from 'cloudinary-react'

//component that shows the basic information for a single elder
export const ElderCard = ({ user }) => {
    let croppedURLPhoto = ""
    if (user.photo) {
        const [prefix, suffix] = user.photo.split("/upload/")
        const cropSection = "/upload/"
        croppedURLPhoto = prefix.concat(cropSection, suffix)
    }
    return (
        <article className="deaconCard">
            <Image style={{ borderRadius: "50px", marginRight: "10px", marginLeft: "10px", marginBottom: "5px", height: "100px", width: "100px" }} cloudName="nch66862" publicId={croppedURLPhoto} />
            <h5 className="userCard">{user.firstName} {user.lastName}</h5>
        </article>
    )
}