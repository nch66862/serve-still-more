import React from "react"
import { Route } from "react-router-dom"
import { GroupProvider } from "./groups/GroupProvider";
import { MemberForm } from "./members/MemberForm";
import { MemberProvider } from "./members/MemberProvider";
import { NewsProvider } from "./news/NewsProvider";
import { RoleProvider } from "./roles/RoleProvider";
import { HistoryProvider } from "./history/HistoryProvider";
import { ElderDashboard } from "./users/ElderDashboard";
import { DeaconDashboard } from "./users/DeaconDashboard";
import { UserProvider } from "./users/UserProvider";

export const ApplicationViews = () => {

    const loggedInUserId = sessionStorage.getItem("Lost_River_User")

    return (
        <>
            <Route exact path="/">
                <>
                    <GroupProvider>
                        <UserProvider>
                            <RoleProvider>
                                <NewsProvider>
                                    <MemberProvider>
                                        {/* <ElderDashboard /> */}
                                        <HistoryProvider>
                                            <DeaconDashboard />
                                        </HistoryProvider>
                                    </MemberProvider>
                                </NewsProvider>
                            </RoleProvider>
                        </UserProvider>
                    </GroupProvider>
                </>
            </Route>
            <Route path="/members/create">
                <MemberProvider>
                    <GroupProvider>
                        <MemberForm />
                    </GroupProvider>
                </MemberProvider>
            </Route>
        </>
    )
}
