import { useState } from 'react'
import { EditMember } from './EditMember'
import './MemberCard.css'
import { MemberDetail } from './MemberDetail'

export const MemberCard = ({ member }) => {
    const [openDetail, setOpenDetail] = useState(false)
    const [openEditMember, setOpenEditMember] = useState(false)
    const handleClickMember = () => {
        setOpenDetail(true)
    }
    return (
        <>
            <h5 onClick={handleClickMember} className="personCard">{member.firstName} {member.lastName}</h5>
            {openDetail && <MemberDetail setOpenDetail={setOpenDetail} setOpenEditMember={setOpenEditMember} member={member} />}
            {openEditMember && <EditMember setOpenEditMember={setOpenEditMember} member={member} />}
        </>
    )
}
