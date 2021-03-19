export const CallForm = () => {

    const [note, setNote] = useState({
        deaconNews: "",
        memberNews: "",
        userId: parseInt(sessionStorage.getItem('Lost_River_User')),
        date: new Date()
    })

    const handleSaveNote = (event) => {
        event.preventDefault()
        addNews(news)
        .then(() => setOpenForm(false))
    }

    return (
        <>
            <form className="form--login" onSubmit={handleSaveNote}>
                <fieldset>
                    <label htmlFor="inputDeaconNews"> Message to the Deacons </label>
                    <textarea type="textArea"
                        id="deaconNews"
                        className="form-control"
                        placeholder="to the deacons of your group..."
                        autoFocus
                        value={news.deaconNews}
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