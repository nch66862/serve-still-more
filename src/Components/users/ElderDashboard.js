import { useState } from "react"
import { AddGroupButton } from "../groups/AddGroupButton"
import { GroupList } from "../groups/GroupList"
import { News } from "../news/News"
import { NewsForm } from "../news/NewsForm"
import './ElderDashboard.css'
//component that shows all of the compnents related to the elder on a single page
export const ElderDashboard = () => {
    //a state variable that toggles displaying the news form
    const [openForm, setOpenForm] = useState(false)
    return (
        <main className="elderDashboard">
            <section className="leftContent">
                <AddGroupButton />
                <GroupList />
            </section>
            <section className="rightContent">
                <News setOpenForm={setOpenForm} />
            </section>
            {openForm && <NewsForm setOpenForm={setOpenForm} />}
        </main>
    )
}