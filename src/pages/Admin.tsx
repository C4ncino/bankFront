import PageBase from './PageBase'
import { useAccountContext } from 'hooks/useAccountContext'

function Admin() {

    const context = useAccountContext()

    return (
        <PageBase title='Admin'>
            <article>
                <header>
                    <h2 className='text-xl'>Accounts</h2>
                </header>

                <section className='pt-4 flex flex-row flex-wrap justify-around gap-4'>
                    {context.accounts.map((account, i) =>
                        <div className='border-2 flex flex-row lg:w-96 w-80 justify-between p-2' key={i}>
                            <h3>Cuenta: {account.account}</h3>
                            <p>Saldo: ${account.balance}</p>
                        </div>
                    )}
                </section>
            </article>
        </PageBase>
    )
}

export default Admin
