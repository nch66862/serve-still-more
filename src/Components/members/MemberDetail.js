import './MemberDetail.css'
//component that accepts a member object and displays the information for it
export const MemberDetail = ({ member, setOpenDetail, setOpenEditMember, callingMember }) => {
    //sets the state variable to close the component when the close button is clicked
    const handleClose = () => {
        setOpenDetail(false)
    }
    //closes the detail component and opens the edit member component when edit is clicked
    const handleEdit = () => {
        if (!callingMember) {
            setOpenDetail(false)
        }
        setOpenEditMember(true)
    }
    //adjust the class names for modal styling or in-line styling depending on if it is called from the elder dashboard or the deacon dashboard
    let memberDetailMainClass = "callingMember"
    if (!callingMember) {
        memberDetailMainClass = "modal--parent"
    }
    let memberDetailSectionClass = ""
    if (!callingMember) {
        memberDetailSectionClass = "modal--content"
    }
    //checks to see if the member object has any keys before it tries to render the html
    return (
        <>
            { Object.keys(member).length !== 0 ? <main className={memberDetailMainClass}>
                <section className={memberDetailSectionClass}>
                    <h2 className="memberDetailName">{member.firstName} {member.lastName}</h2>
                    <div className="memberInformation">
                        <div className="leftInformation">
                            <label htmlFor="phoneNumber"> Phone </label>
                            <p className="memberPhoneNumber">{member.phone}</p>
                            <label htmlFor="email"> Email </label>
                            <p className="memberEmail">{member.email !== "" ? member.email : "No email on record"}</p>
                        </div>
                        <div className="rightInformation">
                            <label htmlFor="address"> Address </label>
                            <div className="memberAddressBox">
                                <p className="memberAddress">{member.address}</p>
                                <p className="memberCityState">{member.city}, {member.state}</p>
                            </div>
                        </div>
                    </div>
                    <label htmlFor="bestTimeToTalk"> Best Time to Talk </label>
                    <p className="memberCallTime">{member.callTime !== "" ? member.callTime : "No available time reported"}</p>
                    {callingMember && <button className="editMemberButton" onClick={handleEdit}>edit member</button>}
                    {callingMember ? "" : <button onClick={handleClose}>close</button>}
                    {callingMember ? "" : <button onClick={handleEdit}>edit</button>}
                </section>
            </main> : ""}
        </>
    )
}