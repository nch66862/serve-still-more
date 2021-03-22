import { useState } from "react"
import { News } from "../news/News"
import './DeaconDashboard.css'

export const DeaconDashboard = () => {

    return (
        <main className="elderDashboard">
            <section className="leftContent">
            </section>
            <section className="rightContent">
                <News />
            </section>
        </main>
    )
}