import './MemberDetail.css'

export const MemberDetail = ({ member, setOpenDetail, setOpenEditMember, callingMember }) => {
    const handleClose = () => {
        setOpenDetail(false)
    }
    const handleEdit = () => {
        if (!callingMember) {
            setOpenDetail(false)
        }
        setOpenEditMember(true)
    }

    let memberDetailMainClass = "callingMember"
    if (!callingMember) {
        memberDetailMainClass = "modal--parent"
    }
    let memberDetailSectionClass = ""
    if (!callingMember) {
        memberDetailSectionClass = "modal--parent"
    }

    console.log(member)
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
            </main> : ""}
        </>
    )
}