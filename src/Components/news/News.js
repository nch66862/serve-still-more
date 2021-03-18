import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../users/UserProvider'
import './News.css'
import { NewsContext } from './NewsProvider'

export const News = () => {
    const { getUserById } = useContext(UserContext)
    const { getNews } = useContext(NewsContext)
    const loggedInUserId = sessionStorage.getItem("Lost_River_User")
    const [loggedInUser, setLoggedInUser] = useState({})
    const groupOfLoggedInUser = loggedInUser.groupId
    const arrayOf

    useEffect(() => {
        getNews()
            .then(() => {
                getUserById(loggedInUserId)
            })
            .then(setLoggedInUser)
    }, [])
    return (
        <aside className="newsAside">
            <h3>News and Notes</h3>
            <h6>Week of</h6>
            <section>
                <label htmlFor="deaconNews"> To the Deacons </label>
                <article className="newsArticle">message to the deacons</article>
                <label htmlFor="memberNews"> To the Members </label>
                <article className="newsArticle">message to the memebers</article>
            </section>
        </aside>
    )
}