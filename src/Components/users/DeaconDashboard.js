import { useState } from "react"
import { CallForm } from "../history/CallForm"
import { News } from "../news/News"
import './DeaconDashboard.css'

export const DeaconDashboard = () => {

    const member = {
        id: 1
    }

    return (
        <main className="elderDashboard">
            <section className="leftContent">
                <CallForm member={member}/>
            </section>
            <section className="rightContent">
                <News />
            </section>
        </main>
    )
}