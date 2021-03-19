import './MemberDetail.css'
export const MemberDetail = ({ member, setOpenDetail, setOpenEditMember }) => {
    const handleClose = () => {
        setOpenDetail(false)
    }
    const handleEdit = () => {
        setOpenDetail(false)
        setOpenEditMember(true)
    }

    return (
        <main className="modal--parent">
            <section className="modal--content">
                <h1>{member.firstName} {member.lastName}</h1>
                <h3>{member.phone}</h3>
                <h3>{member.email}</h3>
                <h3>{member.address}</h3>
                <h3>{member.city}, {member.state}</h3>
                <label htmlFor="bestTimeToTalk"> Best Time to Talk </label>
                <h3>{member.callTime !== "" ? member.callTime : "no available time reported"}</h3>
                <button onClick={handleClose}>close</button>
                <button onClick={handleEdit}>edit</button>
            </section>
        </main>
    )
}