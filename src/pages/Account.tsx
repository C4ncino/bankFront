import { useNavigate, useParams } from "react-router-dom";
import PageBase from "./PageBase";
import { useAccountContext } from "hooks/useAccountContext";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Account = () => {
    const context = useAccountContext()
    const account_id = Number(useParams()['id'])
    const account = context.accounts[account_id]
    const navigate = useNavigate()

    const [movementType, setMovementType] = useState(0)
    const [amount, setAmount] = useState<number>(0)
    const [destiny, setDestiny] = useState("")
    const [errors, setErrors] = useState<formErrors>()
    const [rMessage, setRMessage] = useState("")

    useEffect(() => {
        if (account.token === undefined) {
            navigate('/')
        }
    }, [account, navigate])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "D" || e.target.id === "R" || e.target.id === "T") {
            switch (e.target.id) {
                case "D":
                    setMovementType(1)
                    break;
                case "R":
                    setMovementType(2)
                    break;
                case "T":
                    setMovementType(3)
                    break;
            }
        }
        else if (e.target.id === "amount") {
            setAmount(Number(e.target.value))
        }
        else if (e.target.id === "destiny") {
            setDestiny(e.target.value)
        }
    }

    const validate = () => {
        const tempErrors = {
            amount: "",
            destiny: "",
            type: ""
        }
        let count = 0

        if (amount) {
            if (amount <= 0) {
                tempErrors.amount = "Se requiere una cantidad mayor a 0"
                count++
            }
            else if (amount > account.balance && movementType > 1) {
                tempErrors.amount = "Se requiere una cantidad menor a su Saldo"
                count++
            }
        }
        else {
            tempErrors.amount = "Se requiere una cantidad"
        }

        if (movementType === 0) {
            tempErrors.type = "Seleccione un tipo de movimiento"
            count++
        }

        if (movementType === 3 && destiny === "") {
            tempErrors.destiny = "Se requiere una cuenta destino"
            count++
        }

        return count > 0 ? tempErrors : undefined
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const tempErrors = validate()

        if (tempErrors === undefined) {
            let message = ""

            if (amount) {
                if (movementType === 3) {
                    message = await context.movement({ id: account_id, type: movementType, amount: amount, destiny: destiny })
                }
                else if (movementType === 1 || movementType === 2) {
                    message = await context.movement({ id: account_id, type: movementType, amount: amount })
                }
            }

            if (message === "T") {
                setRMessage("Movimiento Realizado Correctamente")
                setAmount(0)
                setDestiny("")
                setMovementType(0)
            }
            else {
                setRMessage(message)
            }
        }
        else {
            setErrors(tempErrors)
        }
    }

    return (
        <PageBase title={'Menu de Cuenta'}>
            <h2 className="text-lg font-bold text-center">Bienvenido: {account.account}</h2>
            <p className="text-center mb-4">Saldo Actual: <strong>{account.balance}</strong></p>

            <form className="border-2 rounded-lg p-3 py-4 w-1/2 xl:w-1/3 mx-auto" onSubmit={onSubmit}>
                <h3 className="text-center text-lg font-semibold">Movimiento</h3>

                <fieldset className="w-full ">
                    <legend className="pb-1">Información</legend>
                    <div className="flex justify-between w-[90%] mb-2">
                        <label htmlFor="amount">Cantidad: </label>
                        <input className="border-2 rounded-lg w-64 mx-3 p-1" id="amount" onChange={onChange} type="number" step={0.1} value={amount} min={0} max={movementType === 2 || movementType === 3 ? account.balance : ""} />
                    </div>
                    <p className="text-red-500 text-xs">{errors?.amount}</p>
                    {movementType === 3 &&
                        <>
                            <div className="flex justify-between w-[90%] mb-2">
                                <label htmlFor="destiny">Cuenta Destino: </label>
                                <input className="border-2 rounded-lg w-64 mx-3 p-1" id="destiny" onChange={onChange} type="text" value={destiny} />
                            </div>
                            <p className="text-red-500 text-xs">{errors?.destiny}</p>
                        </>
                    }
                </fieldset>

                <fieldset className="grid grid-cols-3 grid-rows-2">
                    <legend>Tipo</legend>
                    <div className="flex justify-between max-w-32">
                        <label htmlFor="D">Depósito</label>
                        <input id="D" onChange={onChange} type="checkbox" checked={movementType === 1} />
                    </div>
                    <div className="flex justify-between max-w-32">
                        <label htmlFor="R">Retiro</label>
                        <input id="R" onChange={onChange} type="checkbox" checked={movementType === 2} />
                    </div>
                    <div className="flex justify-between max-w-32">
                        <label htmlFor="T">Transferencia</label>
                        <input id="T" onChange={onChange} type="checkbox" checked={movementType === 3} />
                    </div>
                    <p className="text-red-500 text-xs col-span-3">{errors?.type}</p>
                </fieldset>

                <div className="w-full flex justify-center">
                    <button className="border-2 rounded-lg p-1 px-2">Enviar</button>
                </div>
            </form>
            <p className={rMessage === "Movimiento Realizado Correctamente" ? "w-full text-center text-green-500 text-sm" : "w-full text-center text-red-500 text-sm"}>{rMessage}</p>
        </PageBase >
    );
}

export default Account;