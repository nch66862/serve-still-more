
export const MemberDetail = ({ member, setOpenDetail }) => {
const handleClose = () => {
    setOpenDetail(false)
}
    return (
        <>
            <h1>{member.firstName} {member.lastName}</h1>
            <button onClick={handleClose}>close</button>
        </>
    )
}