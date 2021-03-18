import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const NewsContext = createContext()

// This component establishes what data can be used.
export const NewsProvider = (props) => {
    const [news, setNews] = useState([])

    const getNews = () => {
        return fetch("http://localhost:8088/news?_expand=user")
            .then(res => res.json())
            .then(setNews)
    }

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

    const getNewsById = (id) => {
        return fetch(`http://localhost:8088/news/${id}`)
            .then(res => res.json())
    }

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

    const deleteNews = newsId => {
        return fetch(`http://localhost:8088/news/${newsId}`, {
            method: "DELETE",
        })
            .then(getNews)
    }


    return (
        <NewsContext.Provider value={{
            news, getNews, addNews, getNewsById, updateNews, deleteNews
        }}>
            {props.children}
        </NewsContext.Provider>
    )
}