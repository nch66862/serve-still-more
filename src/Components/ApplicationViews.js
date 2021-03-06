import React, { useContext, useEffect, useState } from "react"
import { Route, useHistory } from "react-router-dom"
import { GroupProvider } from "./groups/GroupProvider";
import { MemberForm } from "./members/MemberForm";
import { MemberProvider } from "./members/MemberProvider";
import { NewsProvider } from "./news/NewsProvider";
import { RoleContext, RoleProvider } from "./roles/RoleProvider";
import { HistoryProvider } from "./history/HistoryProvider";
import { ElderDashboard } from "./users/ElderDashboard";
import { DeaconDashboard } from "./users/DeaconDashboard";
import { UserContext, UserProvider } from "./users/UserProvider";
import { ImageProvider } from "./images/ImageProvider";
import { Loading } from "./nav/Loading";
//this component handles which component to display based on the URL route
export const ApplicationViews = () => {
    //gets the current logged in user id
    const loggedInUserId = parseInt(sessionStorage.getItem("Lost_River_User"))
    const [loggedInUserObj, setLoggedInUserObj] = useState({})
    const [serverIsLoading, setServerIsLoading] = useState(true)
    const history = useHistory()
    const { getUserById } = useContext(UserContext)
    const { getRoles, roles } = useContext(RoleContext)
    //finds the matching role object of the current logged in user
    const matchingRole = roles?.find(role => role.id === loggedInUserObj.roleId)
    //gets data and sets the current logged in user state variable
    useEffect(() => {
        getUserById(loggedInUserId)
            .then(setLoggedInUserObj)
            .then(getRoles)
    }, [])
    useEffect(() => {
        if (loggedInUserObj.id){
            setServerIsLoading(false)
            history.push("/")
        }
    }, [loggedInUserObj])
    return (
        <>
            <Route exact path="/">
                <GroupProvider>
                    <UserProvider>
                        <RoleProvider>
                            <NewsProvider>
                                <MemberProvider>
                                    <HistoryProvider>
                                        <ImageProvider>
                                            {/* renders a dashboard based on if the user is an elder or not */}
                                            {!serverIsLoading && matchingRole?.name.toLowerCase() === "elder" ? <ElderDashboard /> : !serverIsLoading && <DeaconDashboard />}
                                        </ImageProvider>
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
                        <ImageProvider>
                            <MemberForm />
                        </ImageProvider>
                    </GroupProvider>
                </MemberProvider>
            </Route>
            <Route exact path="/loading">
                {serverIsLoading && <Loading />}
            </Route>
        </>
    )
}
