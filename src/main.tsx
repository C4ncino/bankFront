import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { router } from 'router';
import './index.css'
import AccountContextProvider from '@context/AccountContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AccountContextProvider>
			<RouterProvider router={router} />
		</AccountContextProvider>
	</React.StrictMode>,
)