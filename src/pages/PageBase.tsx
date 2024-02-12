import React from "react";
import { Link } from "react-router-dom";

type Props = {
    children: React.ReactNode
    title: string
}

const PageBase = ({ children, title }: Props) => {
    return (
        <>
            <header className="flex flex-row justify-between p-3 px-10 items-center border-b-2">
                <h1 className="text-2xl font-bold tracking-wider text-blue-800">{title}</h1>

                <nav className="p-1">
                    <ul className="flex flex-row">
                        <li className="w-14 border-r-2 text-center pr-2 mr-2"><Link to={'/'}>Home</Link></li>
                        <li className="w-14 border-r-2 text-center pr-2 mr-2"><Link to={'/admin'}>Admin</Link></li>
                    </ul>
                </nav>
            </header>

            <hr hidden />

            <main className=" min-h-[80vh] p-4 px-10">
                {children}
            </main >

            <hr hidden />

            <footer className="border-t-2 p-2 flex flex-col items-center">
                <h2>El Mejor Banco del Mundo &reg;</h2>
                <p>Hecho con Amor</p>
                <p>Design by &copy; Carlos Cancino </p>

            </footer>
        </>
    );
}

export default PageBase;