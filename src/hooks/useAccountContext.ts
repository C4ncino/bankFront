import { AccountContext } from "@context/AccountContext"
import { useContext } from "react"

export const useAccountContext = () => {
    return useContext(AccountContext)
}