import { useContext } from "react";
import { MemberContext } from "./MemberProvider";

export const MemberForm = () => {
    const { getMembers } = useContext(MemberContext)

    getMembers()
}