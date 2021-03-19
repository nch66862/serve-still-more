import { useState } from 'react'
import './MemberCard.css'
import { MemberDetail } from './MemberDetail'

export const MemberCard = ({ member }) => {
    const [openDetail, setOpenDetail] = useState(false)
    const handleClickMember = () => {
        setOpenDetail(true)
    }
    return (
        <>
            <h5 onClick={handleClickMember} className="personCard">{member.firstName} {member.lastName}</h5>
            {openDetail && <MemberDetail setOpenDetail={setOpenDetail} member={member} />}
        </>
    )
}
