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
                    <h1>{member.firstName} {member.lastName}</h1>
                    {callingMember ? <button onClick={handleEdit}>edit member</button> : ""}
                    <h3>{member.phone}</h3>
                    <h3>{member.email}</h3>
                    <h3>{member.address}</h3>
                    <h3>{member.city}, {member.state}</h3>
                    <label htmlFor="bestTimeToTalk"> Best Time to Talk </label>
                    <h3>{member.callTime !== "" ? member.callTime : "no available time reported"}</h3>
                    {callingMember ? "" : <button onClick={handleClose}>close</button>}
                    {callingMember ? "" : <button onClick={handleEdit}>edit</button>}
                </section>
            </main> : "" }
        </>
    )
}