import { useState } from 'react'
import { EditMember } from './EditMember'
import './MemberCard.css'
import { MemberDetail } from './MemberDetail'
//component that represents a single member. Allows showing more details and editing
export const MemberCard = ({ member }) => {
    //initializes the state variables to display the child components to false
    const [openDetail, setOpenDetail] = useState(false)
    const [openEditMember, setOpenEditMember] = useState(false)
    //changes the state variable to open the detail page when the name of the member is clicked
    const handleClickMember = () => {
        setOpenDetail(true)
    }
    return (
        <>
            <h5 onClick={handleClickMember} className="personCard">{member.firstName} {member.lastName}</h5>
            {openDetail && <MemberDetail setOpenDetail={setOpenDetail} setOpenEditMember={setOpenEditMember} member={member} />}
            {openEditMember && <EditMember setOpenEditMember={setOpenEditMember} member={member} setOpenDetail={setOpenDetail} />}
        </>
    )
}
