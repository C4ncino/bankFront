type movementProps = (
    {
        id: number
        amount: number
    } & (
        {
            type: 1 | 2
        } | {
            type: 3
            destiny: string
        }
    )
)

type AccountContextModel = {
    accounts: Account[]

    login: (account: string) => Promise<boolean>
    get_account: (account: string) => string
    create_account: () => Promise<string>
    movement: (props: movementProps) => Promise<string>
}