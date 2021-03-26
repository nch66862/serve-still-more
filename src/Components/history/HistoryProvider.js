import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const HistoryContext = createContext()

// This component establishes what data can be used.
export const HistoryProvider = (props) => {
    //the main state variable that holds all of the call history data
    const [history, setHistory] = useState([])
    //fetches all of the history data and stores it in the state variable
    const getHistory = () => {
        return fetch("http://localhost:8088/history?_expand=user")
            .then(res => res.json())
            .then(setHistory)
    }
    //adds a date ket to the object and saves it as a new history object in the API
    const addHistory = historyObj => {
        historyObj.date = new Date()
        return fetch("http://localhost:8088/history", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(historyObj)
        })
        .then(getHistory)
    }
    //gets a sinlge  history object specified by its primary key
    const getHistoryById = (id) => {
        return fetch(`http://localhost:8088/history/${id}`)
            .then(res => res.json())
    }
    //changes the data inside an existing history object given a primary key
    const updateHistory = historyObj => {
        return fetch(`http://localhost:8088/history/${historyObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(historyObj)
        })
            .then(getHistory)
    }
    //deletes a history object given its primary key
    const deleteHistory = historyId => {
        return fetch(`http://localhost:8088/history/${historyId}`, {
            method: "DELETE",
        })
            .then(getHistory)
    }
    //exposes all of the data and the functions in the history context
    return (
        <HistoryContext.Provider value={{
            history, getHistory, addHistory, getHistoryById, updateHistory, deleteHistory
        }}>
            {props.children}
        </HistoryContext.Provider>
    )
}