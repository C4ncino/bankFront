import React, { useEffect, useState } from "react"

export const AccountContext = React.createContext<AccountContextModel>({
    accounts: [],

    login: async () => false,
    get_account: () => "",
    create_account: async () => "",
    movement: async () => ""
})

type Props = {
    children: React.ReactNode
}

const AccountContextProvider = ({ children }: Props) => {
    const [accounts, setAccounts] = useState<Account[]>([])
    const url = "http://127.0.0.1:5000/"

    const get_endpoint = (endpoint: string) => {
        return url + endpoint
    }

    const get_data = () => {
        fetch(get_endpoint("get_accounts")).then(
            (response) => response.json()
        ).then(
            (data) => setAccounts(data.accounts)
        )
    }

    useEffect(() => {
        get_data()
    }, [])

    const login = async (account: string) => {
        const response = await fetch(get_endpoint("login"), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'account': account
            }),
        })

        if (response.ok) {
            const data = await response.json()

            setAccounts((currentAccounts: Account[]) => {
                const tempAccounts = currentAccounts
                const id = Number(get_account(account))
                console.log(id)

                tempAccounts[id] = {
                    account: data.account,
                    balance: data.balance,
                    token: data.token
                }

                return tempAccounts
            })

            return data.success
        }
        else {
            return false
        }

    }

    const create_account = async () => {
        const response = await fetch(get_endpoint("new_account"))

        const data = await response.json()

        setAccounts([...accounts, data])

        return data.account
    }


    const get_account = (account: string): string => {
        let id = ""

        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].account === account) {
                id = String(i)
                break
            }
        }

        return id
    }

    const movement = async (props: movementProps) => {
        let message = ""
        let response

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accounts[props.id].token
        }

        switch (props.type) {
            case 1:
                response = await fetch(get_endpoint("deposit"), {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        'account': accounts[props.id].account,
                        'amount': props.amount
                    }),
                })
                break;

            case 2:
                response = await fetch(get_endpoint("withdrawal"), {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        'account': accounts[props.id].account,
                        'amount': props.amount
                    }),
                })
                break;

            case 3:
                response = await fetch(get_endpoint("transfer"), {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        'origin': accounts[props.id].account,
                        'destiny': props.destiny,
                        'amount': props.amount
                    }),
                })
                break;
        }

        if (response.ok) {
            const data = await response.json()

            if (data.success) {
                message = "T"

                setAccounts((currentAccounts: Account[]) => {
                    const tempAccounts = currentAccounts

                    tempAccounts[props.id] = {
                        account: data.account,
                        balance: data.balance,
                        token: tempAccounts[props.id].token
                    }

                    return tempAccounts
                })
            }
            else {
                message = data.message
            }
        }
        else {
            message = "Faltan Datos"
        }

        return message
    }

    const accountContext: AccountContextModel = {
        accounts,

        login,
        get_account,
        create_account,
        movement
    }

    return (
        <AccountContext.Provider value={accountContext} >
            {children}
        </ AccountContext.Provider>
    );
}

export default AccountContextProvider;
