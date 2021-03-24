import React, { useContext, useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { GroupProvider } from "./groups/GroupProvider";
import { MemberForm } from "./members/MemberForm";
import { MemberProvider } from "./members/MemberProvider";
import { NewsProvider } from "./news/NewsProvider";
import { RoleContext, RoleProvider } from "./roles/RoleProvider";
import { HistoryProvider } from "./history/HistoryProvider";
import { ElderDashboard } from "./users/ElderDashboard";
import { DeaconDashboard } from "./users/DeaconDashboard";
import { UserContext, UserProvider } from "./users/UserProvider";

export const ApplicationViews = () => {

    const loggedInUserId = parseInt(sessionStorage.getItem("Lost_River_User"))
    const [loggedInUserObj, setLoggedInUserObj] = useState({})
    const { getUserById } = useContext(UserContext)
    const { getRoles, roles } = useContext(RoleContext)
    const matchingRole = roles?.find(role => role.id === loggedInUserObj.roleId)

    useEffect(() => {
        getUserById(loggedInUserId)
            .then(setLoggedInUserObj)
            .then(getRoles)
    }, [])

    return (
        <>
            <Route exact path="/">
                <GroupProvider>
                    <UserProvider>
                        <RoleProvider>
                            <NewsProvider>
                                <MemberProvider>
                                    <HistoryProvider>
                                        {matchingRole?.name.toLowerCase() === "elder" ? <ElderDashboard /> : <DeaconDashboard />}
                                    </HistoryProvider>
                                </MemberProvider>
                            </NewsProvider>
                        </RoleProvider>
                    </UserProvider>
                </GroupProvider>
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
