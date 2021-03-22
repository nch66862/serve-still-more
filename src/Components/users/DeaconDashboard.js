import { useState } from "react"
import { CallForm } from "../history/CallForm"
import { EditMember } from "../members/EditMember"
import { MemberDetail } from "../members/MemberDetail"
import { News } from "../news/News"
import './DeaconDashboard.css'

export const DeaconDashboard = () => {

    const [openEditMember, setOpenEditMember] = useState(false)
    const member = {
        "firstName": "Jeremy Boy",
        "lastName": "Jones",
        "email": "",
        "groupId": 1,
        "phone": "(270) 543-3086",
        "address": "435 Main Street",
        "city": "Nashville",
        "state": "TN",
        "photo": "",
        "callTime": "",
        "canCall": true,
        "familyId": 0,
        "primaryMember": false,
        "id": 1
    }

    return (
        <main className="elderDashboard">
            <section className="leftContent">
                <MemberDetail member={member} callingMember={true} setOpenEditMember={setOpenEditMember}/>
                <CallForm member={member}/>
                {openEditMember && <EditMember setOpenEditMember={setOpenEditMember} member={member} callingMember={true}/>}
            </section>
            <section className="rightContent">
                <News />
            </section>
        </main>
    )
}