import React, { useContext, useEffect } from "react"
import { Route } from "react-router-dom"
import { GroupProvider } from "./groups/GroupProvider";
import { MemberForm } from "./members/MemberForm";
import { MemberProvider } from "./members/MemberProvider";
import { NewsProvider } from "./news/NewsProvider";
import { RoleProvider } from "./roles/RoleProvider";
import { HistoryProvider } from "./history/HistoryProvider";
import { ElderDashboard } from "./users/ElderDashboard";
import { DeaconDashboard } from "./users/DeaconDashboard";
import { UserContext, UserProvider } from "./users/UserProvider";
import { getRoles } from "@testing-library/dom";

export const ApplicationViews = () => {

    const loggedInUserId = parseInt(sessionStorage.getItem("Lost_River_User"))
    const { getUserById } = useContext(UserContext)
    const loggedInUserObj = users?.find(user => user.roleId === loggedInUserId)
    const matchingRole = roles.find(role => role.id === loggedInUserObj.roleId)

    useEffect(() => {
        getRoles()
            .then(() => {
                getUserById(loggedInUserId)
            })
    })

    return (
        <>
            <Route exact path="/">
                <>
                    <GroupProvider>
                        <UserProvider>
                            <RoleProvider>
                                <NewsProvider>
                                    <MemberProvider>
                                        <HistoryProvider>
                                            {matchingRole.name.toLowerCase() === "elder" ? <ElderDashboard /> : <DeaconDashboard />}
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
