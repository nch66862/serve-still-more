import { useState } from 'react'
import { EditMember } from './EditMember'
import './MemberCard.css'
import { MemberDetail } from './MemberDetail'
import { Image } from 'cloudinary-react'

//component that represents a single member. Allows showing more details and editing
export const MemberCard = ({ member }) => {
    //initializes the state variables to display the child components to false
    const [openDetail, setOpenDetail] = useState(false)
    const [openEditMember, setOpenEditMember] = useState(false)
    //changes the state variable to open the detail page when the name of the member is clicked
    const handleClickMember = () => {
        setOpenDetail(true)
    }
    //handles the size of the picture of the member
    let croppedURLPhoto = ""
    if (member.photo) {
        const [prefix, suffix] = member.photo.split("/upload/")
        const cropSection = "/upload/w_400,h_400,c_crop,g_face,r_max/w_100/"
        croppedURLPhoto = prefix.concat(cropSection, suffix)
    }
    return (
        <>
            <article className="memberCard">
                <Image onClick={handleClickMember} style={{ borderRadius: "50px", marginRight: "10px", marginLeft: "10px", marginBottom: "5px" }} cloudName="nch66862" publicId={croppedURLPhoto} />
                <h5 onClick={handleClickMember} className="personCard">{member.firstName} {member.lastName}</h5>
            </article>
            {openDetail && <MemberDetail setOpenDetail={setOpenDetail} setOpenEditMember={setOpenEditMember} member={member} />}
            {openEditMember && <EditMember setOpenEditMember={setOpenEditMember} member={member} setOpenDetail={setOpenDetail} />}
        </>
    )
}
