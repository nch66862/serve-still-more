import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../users/UserProvider'
import './News.css'
import { NewsContext } from './NewsProvider'

export const News = ({ setOpenForm }) => {
    //allows access to a state variable in the news provider
    const { getUserById } = useContext(UserContext)
    const { getNews, news } = useContext(NewsContext)
    //grabs the number from the session storage that should match the logged in user
    const loggedInUserId = parseInt(sessionStorage.getItem("Lost_River_User"))
    //initializes a state variable for the logged in user to be updated in useEffect on component load
    const [loggedInUser, setLoggedInUser] = useState({})
    //initializes a state variable to store the latest news post in a certain group
    const [latestGroupNewsPost, setLatestGroupNewsPost] = useState({})
    //gets the groupId of the logged in user
    const groupIdOfLoggedInUser = loggedInUser?.groupId
    let arrayOfNewsPostsForMatchingGroup = []
    //if the news data is there and there is a group chosen, then filter the news to find only the news for a certain group
    if (news.length && groupIdOfLoggedInUser) {
        arrayOfNewsPostsForMatchingGroup = news.filter(newsPost => newsPost.user.groupId === groupIdOfLoggedInUser)
    }
    //controls the state variable that opens the form to edit the news
    const handleEditButton = () => {
        setOpenForm(true)
    }
    //runs every time the news is changed to sort the news posts again and display the latest one
    useEffect(() => {
        const sortedNews = arrayOfNewsPostsForMatchingGroup.slice().sort((a, b) => {
            const aDate = new Date(a.date)
            const bDate = new Date(b.date)
            a.date = aDate
            b.date = bDate
            return b.date - a.date
        })
        setLatestGroupNewsPost(sortedNews[0])
    }, [news])
    //gets the data and sets the current logged in user
    useEffect(() => {
        getUserById(loggedInUserId)
            .then(setLoggedInUser)
            .then(getNews)
    }, [])
    //component that only shows the edit button if the logged in user is an elder
    return (
        <aside className="newsAside">
            <h3>Group {loggedInUser.groupId} News and Notes</h3>
            {loggedInUser.roleId === 1 ? <button className="btn" onClick={handleEditButton}> + News </button> : "" }
            <section>
                <label htmlFor="deaconNews"> To the Deacons </label>
                <article className="newsArticle">{latestGroupNewsPost?.deaconNews}</article>
                <label htmlFor="memberNews"> To the Members </label>
                <article className="newsArticle">{latestGroupNewsPost?.memberNews}</article>
            </section>
        </aside>
    )
}