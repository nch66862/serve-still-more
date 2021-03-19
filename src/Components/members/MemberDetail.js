
export const MemberDetail = ({ member, setOpenDetail }) => {
    const handleClose = () => {
        setOpenDetail(false)
    }

    return (
        <main className="modal--parent">
            <section className="modal--content">
                <h1>{member.firstName} {member.lastName}</h1>
                <button onClick={handleClose}>close</button>
            </section>
        </main>
    )
}