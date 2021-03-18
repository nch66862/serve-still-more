import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../users/UserProvider'
import './News.css'
import { NewsContext } from './NewsProvider'

export const News = ({ setOpenForm }) => {
    const { getUserById } = useContext(UserContext)
    const { getNews, news } = useContext(NewsContext)
    const loggedInUserId = parseInt(sessionStorage.getItem("Lost_River_User"))
    const [loggedInUser, setLoggedInUser] = useState({})
    const [latestGroupNewsPost, setLatestGroupNewsPost] = useState({})
    let groupIdOfLoggedInUser = 0
    if (loggedInUser) {
        groupIdOfLoggedInUser = loggedInUser.groupId
    }
    let arrayOfNewsPostsForMatchingGroup = []
    if (news.length && groupIdOfLoggedInUser) {
        arrayOfNewsPostsForMatchingGroup = news.filter(newsPost => newsPost.user.groupId === groupIdOfLoggedInUser)
    }

    const handleEditButton = () => {
        setOpenForm(true)
    }

    useEffect(() => {
        const sortedNews = arrayOfNewsPostsForMatchingGroup.slice().sort((a, b) => {
            const aDate = new Date(a.date)
            const bDate = new Date(b.date)
            a.date = aDate
            b.date = bDate
            return a.date - b.date
        })
        setLatestGroupNewsPost(sortedNews[0])
    }, [news])

    useEffect(() => {
        getUserById(loggedInUserId)
            .then(setLoggedInUser)
            .then(getNews)
    }, [])

    return (
        <aside className="newsAside">
            <h3>News and Notes</h3>
            <h6>Week of</h6>
            <button onClick={handleEditButton}>edit</button>
            <section>
                <label htmlFor="deaconNews"> To the Deacons </label>
                <article className="newsArticle">{latestGroupNewsPost?.deaconNews}</article>
                <label htmlFor="memberNews"> To the Members </label>
                <article className="newsArticle">{latestGroupNewsPost?.memberNews}</article>
            </section>
        </aside>
    )
}