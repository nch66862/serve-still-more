import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const NewsContext = createContext()
// This component establishes what data can be used.
export const NewsProvider = (props) => {
    //the main state variable that holds all of the news data from the API
    const [news, setNews] = useState([])
    //gets all of the news objects from the database
    const getNews = () => {
        return fetch("http://localhost:8088/news?_expand=user")
            .then(res => res.json())
            .then(setNews)
    }
    //adds a new news object to the database
    const addNews = newsObj => {
        return fetch("http://localhost:8088/news", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newsObj)
        })
        .then(getNews)
    }
    //gets a single news object from the database given its primary key
    const getNewsById = (id) => {
        return fetch(`http://localhost:8088/news/${id}`)
            .then(res => res.json())
    }
    //updates the data on a single news object in the database given its primary key
    const updateNews = newsObj => {
        return fetch(`http://localhost:8088/news/${newsObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newsObj)
        })
            .then(getNews)
    }
    //delets a single news object from the database given its primary key
    const deleteNews = newsId => {
        return fetch(`http://localhost:8088/news/${newsId}`, {
            method: "DELETE",
        })
            .then(getNews)
    }
    //allows access to all functions and variables in the provider through the context
    return (
        <NewsContext.Provider value={{
            news, getNews, addNews, getNewsById, updateNews, deleteNews
        }}>
            {props.children}
        </NewsContext.Provider>
    )
}