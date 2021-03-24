import { useContext, useEffect, useState } from "react"
import { HistoryContext } from "./HistoryProvider"
import './CallForm.css'
//a form that lets users make notes about a phone call
export const CallForm = ({ member }) => {
    //history keeps track of where youve been in a URL stack
    const { addHistory } = useContext(HistoryContext)
    //the primary state variable to be modified by the form
    const [history, setHistory] = useState({
        note: "",
        userId: parseInt(sessionStorage.getItem('Lost_River_User')),
        memberId: member.id,
    })
    //function that creates a new history object in the database and resets the form so that it is empty and ready for the next note
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
    //inline styling for the size of the input field
    const textBoxStyle = {
        height: '150px',
    }
    //changes the state variable
    const handleInputChange = (event) => {
        const newHistory = { ...history }
        newHistory[event.target.id] = event.target.value
        setHistory(newHistory)
    }
    //updates the state variable every time a new member is chosen so that the memberId foreign ket is accurate for the selected member
    useEffect(() => {
        const newHistory = { ...history }
        newHistory.memberId = member.id
        setHistory(newHistory)
    }, [member])
    //displays the form if a member object is selected (it has any keys)
    return (
        <>
            {Object.keys(member).length !== 0 ? <form className="form--login" onSubmit={handleSaveHistory}>
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
            : "" }
        </>
    )
}