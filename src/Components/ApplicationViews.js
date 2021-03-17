import React from "react"
import { Route } from "react-router-dom"
import { MemberForm } from "./members/MemberForm"

export const ApplicationViews = () => {

    return (
        <>
            <Route exact path="/">
                <>
                </>
            </Route>
            <Route path="/members/create">
                <MemberForm />
            </Route>
        </>
    )
}
