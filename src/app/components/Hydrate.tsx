'use client'

import { ReactNode, useState, useEffect } from "react"

export default function Hydrate({ children }: { children: ReactNode }) {
    const [isMounted, setIsMounted]  = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return isMounted ? <>{children}</> : (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-700">
            <div className="flex flex-col items-center">
                <svg 
                    className="animate-spin h-10 w-10 text-blue-500" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                >
                    <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                    ></circle>
                    <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 0 1 8-8V0A12 12 0 0 0 4 12h0z"
                    ></path>
                </svg>
            </div>
        </div>
    );
}