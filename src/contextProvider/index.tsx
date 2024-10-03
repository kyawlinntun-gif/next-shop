"use client";
import { createContext, useEffect, useState } from "react";

// Define export state

export const AuthContext = createContext<AuthCheck>({auth: {api_token: '', role: ''}, setAuth: () => {}, totalQuantity: 0, setTotalQuantity: () => {}});

interface AuthState {
    api_token: string,
    role: string
}

interface AuthCheck {
    auth: AuthState,
    setAuth: (api_token: string, role: string) => void,
    totalQuantity: number,
    setTotalQuantity: (totalQuantity: number) => void
}

// End Define export state

function ContextProvider({children}: {children: React.ReactNode}) {
    const [auth, setAuthState] = useState<AuthState>({
        api_token: '',
        role: ""
    });

    const [totalQuantity, setTotalQuantityState] = useState<number>(0);

    useEffect(() => {
        let getApi_token = localStorage.getItem('api_token') || '';
        let getRole = localStorage.getItem('role') || '';
        let getTotalQuantity = JSON.parse(localStorage.getItem('totalQuantity') || '0');
        setAuthState({
            api_token: getApi_token,
            role: getRole
        });
        setTotalQuantityState(getTotalQuantity);
    }, []);

    const setAuth = (api_token: string, role: string) => {
        localStorage.setItem('api_token', api_token);
        localStorage.setItem('role', role);
        setAuthState({api_token, role});
    }

    const setTotalQuantity = (totalQuantity: number) => {
        localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
        setTotalQuantityState(totalQuantity);
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, totalQuantity, setTotalQuantity }}>
            {children}
        </AuthContext.Provider>
    )
}

export default ContextProvider;