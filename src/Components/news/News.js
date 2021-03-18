import './News.css'

export const News = () => {
    const { getUsers }
    const loggedInUserId = sessionStorage.getItem("Lost_River_User")
    const loggedInUserGroup = 
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