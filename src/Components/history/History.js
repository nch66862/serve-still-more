import { useContext, useEffect, useState } from "react"
import { HistoryContext } from "./HistoryProvider"
import './History.css'
//component that displays the call history for a certain user
export const History = ({ member }) => {
    //allows access to functions and data in the history provider
    const { getHistory, history } = useContext(HistoryContext)
    //the variable that is to be rendered on the DOM
    const [sortedHistory, setSortedHistory] = useState([])
    //does the fetch call to get the history log for all users
    useEffect(() => {
        getHistory()
    }, [])
    //updates what is on the page when the history changes
    useEffect(() => {
        const newSortedHistory = sortedHistoryFunc(history, member)
        setSortedHistory(newSortedHistory)
    }, [history, member])
    console.log(sortedHistory)
    //maps through the sorted history and builds out the date and who called them and the notes that were made
    return (
        <>
            {Object.keys(member).length !== 0 && <section className="historyList">
                <h3>Conversation History</h3>
                {sortedHistory.length ? sortedHistory.map(history => {
                    return (
                        <section key={history.id}>
                            <label>{history?.date.toLocaleDateString('en-US', { timeZone: "CST" })} - {history.user.firstName} {history.user.lastName}</label>
                            <article className="historyCard" >
                                <label>{history.note}</label>
                            </article>
                        </section>
                    )
                }) : <p>no call history</p>}
            </section>}
        </>
    )
}

//sorts the call logs by date posted
const sortedHistoryFunc = (history, member) => {
    //finds the call logs that match the currently selected member to call
    const historyForMember = history.filter(history => history.memberId === member?.id)
    const sortedHistory = historyForMember.slice().sort((a, b) => {
        const aDate = new Date(a.date)
        const bDate = new Date(b.date)
        a.date = aDate
        b.date = bDate
        return b.date - a.date
    })
    return sortedHistory
}
