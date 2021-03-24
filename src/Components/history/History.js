import { useContext, useEffect } from "react"
import { HistoryContext } from "./HistoryProvider"
import './History.css'

export const History = ({ member }) => {

    const { getHistory, history } = useContext(HistoryContext)
    const historyForMember = history.filter(history => history.memberId === member?.id)
    const sortedHistory = historyForMember.slice().sort((a, b) => {
        const aDate = new Date(a.date)
        const bDate = new Date(b.date)
        a.date = aDate
        b.date = bDate
        return b.date - a.date
    })

    useEffect(() => {
        getHistory()
    }, [])

    return (
        <section className="historyList">
            {sortedHistory.map(history => {
                return (
                    <section key={history.id}>
                        <label>{history.date.toLocaleDateString('en-US', { timeZone: "CST" })}</label>
                        <article className="historyCard" >
                            <label>{history.note}</label>
                        </article>
                    </section>
                )
            })}
        </section>
    )
}