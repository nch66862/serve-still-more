import { useContext } from "react"
import { HistoryContext } from "./HistoryProvider"

export const CallForm = ({ member }) => {
const { addHistory } = useContext(HistoryContext)

    const [history, setHistory] = useState({
        note: "",
        userId: parseInt(sessionStorage.getItem('Lost_River_User')),
        memberId: member.id,
        date: new Date()
    })

    const handleSaveHistory = (event) => {
        event.preventDefault()
        addHistory(history)
        .then(() => setOpenForm(false))
    }

    const handleInputChange = (event) => {
        const newHistory = { ...history }
        newHistory[event.target.id] = event.target.value
        setHistory(newNews)
    }

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
                <fieldset>
                    <button type="submit">
                        Submit
                        </button>
                </fieldset>
            </form>
        </>
    )
}