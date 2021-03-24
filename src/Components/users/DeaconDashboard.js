import { useContext, useState } from "react"
import { CallForm } from "../history/CallForm"
import { History } from "../history/History"
import { EditMember } from "../members/EditMember"
import { MemberDetail } from "../members/MemberDetail"
import { MemberContext } from "../members/MemberProvider"
import { News } from "../news/News"
import './DeaconDashboard.css'
import { MemberCallList } from "./MemberCallList"

export const DeaconDashboard = () => {

    const { memberToCall } = useContext(MemberContext)
    const [openEditMember, setOpenEditMember] = useState(false)

    return (
        <main className="elderDashboard">
            <MemberCallList />
            <section className="leftContent">
                <MemberDetail member={memberToCall} callingMember={true} setOpenEditMember={setOpenEditMember} />
                <CallForm member={memberToCall} />
                <History member={memberToCall}/>
                {openEditMember && <EditMember setOpenEditMember={setOpenEditMember} member={memberToCall} callingMember={true} />}
            </section>
            <section className="rightContent">
                <News />
            </section>
        </main>
    )
}