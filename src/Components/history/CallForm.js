import { useContext, useEffect, useState } from "react"
import { HistoryContext } from "./HistoryProvider"

export const CallForm = ({ member }) => {

    const { addHistory } = useContext(HistoryContext)

    const [history, setHistory] = useState({
        note: "",
        userId: parseInt(sessionStorage.getItem('Lost_River_User')),
        memberId: member.id,
    })

    const handleSaveHistory = (event) => {
        event.preventDefault()
        addHistory(history)
            .then(() => {
                const newHistory = {
                    note: "",
                    userId: parseInt(sessionStorage.getItem('Lost_River_User')),
                    memberId: member.id,
                }
                setHistory(newHistory)
            })
    }

    const textBoxStyle = {
        height: '150px',
    }

    const handleInputChange = (event) => {
        const newHistory = { ...history }
        newHistory[event.target.id] = event.target.value
        setHistory(newHistory)
    }

    useEffect(() => {
        const newHistory = { ...history }
        newHistory.memberId = member.id
        setHistory(newHistory)
    }, [member])

    return (
        <>
            <form className="form--login" onSubmit={handleSaveHistory}>
                <fieldset>
                    <label htmlFor="inputHistory"> Call Note </label>
                    <textarea type="textArea"
                        id="note"
                        className="form-control"
                        placeholder="we talked about..."
                        autoFocus
                        value={history.note}
                        style={textBoxStyle}
                        onChange={handleInputChange} />
                </fieldset>
                <button disabled={!member} type="submit">Submit</button>
            </form>
        </>
    )
}