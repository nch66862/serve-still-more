import { useState } from "react"
import { CallForm } from "../history/CallForm"
import { MemberDetail } from "../members/MemberDetail"
import { News } from "../news/News"
import './DeaconDashboard.css'

export const DeaconDashboard = () => {

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
                <MemberDetail member={member} callingMember={true}/>
                <CallForm member={member}/>
            </section>
            <section className="rightContent">
                <News />
            </section>
        </main>
    )
}