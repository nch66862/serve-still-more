import React, { useContext, useState } from "react"
import { Link, useHistory } from "react-router-dom";
import "./NewsForm.css"
import { NewsContext } from "./NewsProvider";


export const NewsForm = () => {
    const [news, setNews] = useState({
        deaconNews: "",
        memberNews: "",
        userId: sessionStorage.getItem('Lost_River_User'),
        date: new Date()
    })
    const { addNews } = useContext(NewsContext)
    const history = useHistory()
    const handleInputChange = (event) => {
        const newNews = { ...news }
        newNews[event.target.id] = event.target.value
        setNews(newNews)
    }
    const textBoxStyle = {
        height: '200px',
    }
    const handleSaveNews = (event) => {
        event.preventDefault()
        addNews(news)
        .then(() => history.push("/"))
    }

    return (
        <main className="container--login">
            <section>
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