import { useState } from "react"
import { AddGroupButton } from "../groups/AddGroupButton"
import { GroupList } from "../groups/GroupList"
import { News } from "../news/News"
import { NewsForm } from "../news/NewsForm"

export const ElderDashboard = () => {
    const [openForm, setOpenForm] = useState(false)

    return (
        <main className="elderDashboard">
            <section className="leftContent">
                <AddGroupButton />
                <GroupList />
            </section>
            <News setOpenForm={setOpenForm}/>
            {openForm && <NewsForm  setOpenForm={setOpenForm}/>}
        </main>
    )
}