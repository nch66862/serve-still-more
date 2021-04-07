import { useContext } from 'react'
import './MemberInList.css'
import { MemberContext } from './MemberProvider'
import { Image } from 'cloudinary-react'
//component that represents a single member and will update the chosen member if it is clicked on
export const MemberInList = ({ member }) => {
    //allows access to a state variable in the member provider
    const { setMemberToCall } = useContext(MemberContext)
    //function that sets the chosen member when the element is clicked on
    const handleClickMember = () => {
        setMemberToCall(member)
    }
    //sets and crops the photo of the member
    let croppedURLPhoto = ""
    if (member.photo) {
        const [prefix, suffix] = member.photo.split("/upload/")
        const cropSection = "/upload/w_400,h_400,c_crop,g_face,r_max/w_50/"
        croppedURLPhoto = prefix.concat(cropSection, suffix)
    }
    return (
        <article onClick={handleClickMember} className="memberInList">
            <Image style={{ borderRadius: "25px", marginRight: "10px", marginLeft: "10px", marginBottom: "5px" }} cloudName="nch66862" publicId={croppedURLPhoto} />
            <h5 className="personInList">{member.firstName} {member.lastName}</h5>
        </article>
    )
}