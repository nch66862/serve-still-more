import { useContext, useState } from "react"
import { CallForm } from "../history/CallForm"
import { History } from "../history/History"
import { EditMember } from "../members/EditMember"
import { MemberDetail } from "../members/MemberDetail"
import { MemberContext } from "../members/MemberProvider"
import { News } from "../news/News"
import './DeaconDashboard.css'
import { MemberCallList } from "./MemberCallList"
//component that shows all of the deacon specific components for a deacon
export const DeaconDashboard = () => {
    //context exposes what data needed from the provider (specifically the state variable that will show one member to call at a time)
    const { memberToCall, setMemberToCall } = useContext(MemberContext)
    //state variable to toggle rendering of the edit member component
    const [openEditMember, setOpenEditMember] = useState(false)
    return (
        <main className="elderDashboard">
            <MemberCallList memberToCall={memberToCall} />
            <section className="leftContent">
                <MemberDetail member={memberToCall} callingMember={true} setOpenEditMember={setOpenEditMember} />
                <CallForm member={memberToCall} />
                <History member={memberToCall} />
                {openEditMember && <EditMember setOpenEditMember={setOpenEditMember} member={memberToCall} callingMember={true} setMemberToCall={setMemberToCall} />}
            </section>
            <section className="rightContent">
                <News />
            </section>
        </main>
    )
}