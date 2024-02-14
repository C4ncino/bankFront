import { useState, ChangeEvent, FormEvent } from "react";
import PageBase from "./PageBase";
import { useAccountContext } from "hooks/useAccountContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const context = useAccountContext()
    const navigate = useNavigate()

    const [login, setLogin] = useState(true)
    const [account, setAccount] = useState('')
    const [msg, setMsg] = useState('')
    const [newAccount, setNewAccount] = useState('')

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAccount(e.target.value)
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (login) {
            if (account) {
                const success = await context.login(account)
                if (success) {
                    console.log(context.get_account(account))
                    navigate(`account/${context.get_account(account)}`)
                }
                else {
                    setMsg('Verifique sus datos')
                }
            }
            else {
                setMsg('Se necesita su cuenta')
            }
        }
        else {
            const newAcc = await context.create_account()
            setNewAccount(newAcc)
        }
    }

    return (
        <PageBase title="Home">
            <h2 className="text-xl">Hola, Bienvenido</h2>

            <section className="pt-4 flex items-center justify-center">
                {newAccount ? (
                    <div className="flex flex-col gap-y-3 border-2 p-4 rounded-lg min-w-64">
                        <h3>Cuenta Creada Correctamente</h3>
                        <p>Su cuenta es {newAccount}</p>

                        <button onClick={() => { setLogin(!login); setNewAccount("") }} className="text-blue-600">
                            Ir al Login
                        </button>
                    </div>
                ) : (
                    <form className="flex flex-col gap-y-3 border-2 p-4 rounded-lg min-w-64" onSubmit={onSubmit}>
                        {login ? (
                            <>
                                <label htmlFor="accountN">Número de Cuenta</label>
                                <input
                                    id="accountN" placeholder="Ingrese su número de cuenta"
                                    className="border-2 rounded-lg p-1"
                                    value={account} onChange={onChange}
                                />

                                <p id="error" className="text-red-500 text-sm">{msg}</p>
                            </>
                        ) : (
                            <p>Esta seguro que desea crear una cuenta</p>
                        )}

                        <button className="border-2 p-1 rounded-lg hover:bg-gray-600 hover:text-white w-32 mx-auto">
                            {login ? 'Ingresar' : 'Crear Cuenta'}
                        </button>

                        <button type="button" onClick={() => setLogin(!login)} className="text-blue-600">
                            {login ? 'Aún no tiene cuenta?' : 'Ya tiene cuenta?'}
                        </button>
                    </form>
                )}
            </section>
        </PageBase>
    );
}

export default Home;