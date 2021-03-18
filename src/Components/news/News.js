import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../users/UserProvider'
import './News.css'
import { NewsContext } from './NewsProvider'

export const News = () => {
    const { getUserById } = useContext(UserContext)
    const { getNews, news } = useContext(NewsContext)
    const loggedInUserId = sessionStorage.getItem("Lost_River_User")
    const [loggedInUser, setLoggedInUser] = useState({})
    const [latestGroupNewsPost, setLatestGroupNewsPost] = useState({})
    const groupIdOfLoggedInUser = loggedInUser.groupId
    let arrayOfNewsPostsForMatchingGroup = []
    if (news) {
        arrayOfNewsPostsForMatchingGroup = news.filter(newsPost => newsPost.user.groupId === groupIdOfLoggedInUser)
    }

    const sortedNews = arrayOfNewsPostsForMatchingGroup.slice().sort((a, b) => {
        const aDate = new Date(a.date)
        const bDate = new Date(b.date)
        a.date = aDate
        b.date = bDate
        return a.date - b.date
    })
    setLatestGroupNewsPost(sortedNews[0])

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