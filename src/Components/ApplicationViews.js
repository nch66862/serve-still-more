import React from "react"
import { Route } from "react-router-dom"
import { AddGroupButton } from "./groups/AddGroupButton";
import { GroupProvider } from "./groups/GroupProvider";
import { MemberForm } from "./members/MemberForm";
import { MemberProvider } from "./members/MemberProvider";

export const ApplicationViews = () => {

    return (
        <>
            <Route exact path="/">
                <>
                    <GroupProvider>
                        <AddGroupButton />
                    </GroupProvider>
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
