import React from "react"
import { Route } from "react-router-dom"
import { MemberForm } from "./members/MemberForm"
import { MemberProvider } from "./members/MemberProvider"

export const ApplicationViews = () => {

    return (
        <>
            <Route exact path="/">
                <>
                </>
            </Route>
            <Route path="/members/create">
                <MemberProvider>
                    <MemberForm />
                </MemberProvider>
            </Route>
        </>
    )
}
