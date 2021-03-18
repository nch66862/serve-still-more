import React from "react"
import { Route } from "react-router-dom"
import { AddGroupButton } from "./groups/AddGroupButton";
import { GroupList } from "./groups/GroupList";
import { GroupProvider } from "./groups/GroupProvider";
import { MemberForm } from "./members/MemberForm";
import { MemberProvider } from "./members/MemberProvider";
import { News } from "./news/News";
import { NewsForm } from "./news/NewsForm";
import { NewsProvider } from "./news/NewsProvider";
import { UserProvider } from "./users/UserProvider";

export const ApplicationViews = () => {

    return (
        <>
            <Route exact path="/">
                <>
                <GroupProvider>
                    <UserProvider>
                        <MemberProvider>
                            <GroupList />
                        </MemberProvider>
                    </UserProvider>
                </GroupProvider>
                    <GroupProvider>
                        <AddGroupButton />
                    </GroupProvider>
                    <NewsProvider>
                        <NewsForm />
                    </NewsProvider>
                    <UserProvider>
                        <NewsProvider>
                            <News />
                        </NewsProvider>
                    </UserProvider>
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
