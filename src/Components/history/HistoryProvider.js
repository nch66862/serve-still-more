import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const HistoryContext = createContext()

// This component establishes what data can be used.
export const HistoryProvider = (props) => {
    const [history, setHistory] = useState([])

    const getHistory = () => {
        return fetch("http://localhost:8088/history")
            .then(res => res.json())
            .then(setHistory)
    }

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

    const getHistoryById = (id) => {
        return fetch(`http://localhost:8088/history/${id}`)
            .then(res => res.json())
    }

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

    const deleteHistory = historyId => {
        return fetch(`http://localhost:8088/history/${historyId}`, {
            method: "DELETE",
        })
            .then(getHistory)
    }


    return (
        <HistoryContext.Provider value={{
            history, getHistory, addHistory, getHistoryById, updateHistory, deleteHistory
        }}>
            {props.children}
        </HistoryContext.Provider>
    )
}