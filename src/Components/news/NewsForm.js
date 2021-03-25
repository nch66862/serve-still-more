import React, { useContext, useState } from "react"
import "./NewsForm.css"
import { NewsContext } from "./NewsProvider";
//component that renders a form that takes the values and builds a new user object
export const NewsForm = ({ setOpenForm }) => {
    //the main state variable that will be saved to the API
    const [news, setNews] = useState({
        deaconNews: "",
        memberNews: "",
        userId: parseInt(sessionStorage.getItem('Lost_River_User')),
        date: new Date()
    })
    //exposes the data in the news provider
    const { addNews } = useContext(NewsContext)
    //updates the news object when inputs change in the form
    const handleInputChange = (event) => {
        const newNews = { ...news }
        newNews[event.target.id] = event.target.value
        setNews(newNews)
    }
    //specifies an in-line styling
    const textBoxStyle = {
        height: '200px',
    }
    //saves the news object and closes the form component
    const handleSaveNews = (event) => {
        event.preventDefault()
        addNews(news)
            .then(() => setOpenForm(false))
    }
    //a modal form
    return (
        <main className="modal--parent">
            <section className="modal--content">
                <form className="form--login" onSubmit={handleSaveNews}>
                    <h1>Lost River Call Center</h1>
                    <h2>News and Notes</h2>
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
                        <label htmlFor="inputMemberNews"> Message to the Members </label>
                        <textarea type="textArea"
                            id="memberNews"
                            className="form-control"
                            placeholder="to the members of your group..."
                            value={news.memberNews}
                            style={textBoxStyle}
                            onChange={handleInputChange} />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Submit
                        </button>
                    </fieldset>
                </form>
            </section>
        </main>
    )
}