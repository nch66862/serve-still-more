import React from "react"
import { Route } from "react-router-dom"
import { AddGroupButton } from "./groups/AddGroupButton";
import { GroupProvider } from "./groups/GroupProvider";
import { MemberForm } from "./members/MemberForm";
import { MemberProvider } from "./members/MemberProvider";
import { NewsForm } from "./news/NewsForm";
import { NewsProvider } from "./news/NewsProvider";

export const ApplicationViews = () => {

    return (
        <>
            <Route exact path="/">
                <>
                    <GroupProvider>
                        <AddGroupButton />
                    </GroupProvider>
                    <NewsProvider>
                        <NewsForm />
                    </NewsProvider>
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
