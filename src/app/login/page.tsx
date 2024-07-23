'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "../lib/types"
import { useRouter } from 'next/navigation';

export default function login() {
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm<login>();

    const onSubmit: SubmitHandler<login> = (data) => {
        fetch('http://localhost:3000/api/auth', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ 
                ...data
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao enviar os dados para API');
            }
            return response.json();
        })
        .then(() => {
            reset();
            router.replace('/');
        })
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 mx-auto p-4 bg-slate-500 shadow-md rounded-md mt-5">
            <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="email">Email</label>
                <input
                    type="text"
                    {...register('email')}
                    className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="password">Password</label>
                <input
                    type="text"
                    {...register('password')}
                    className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans focus:outline-none"
                />
            </div>

            <button 
                type="submit"
                className="bg-teal-600 text-gray-300 w-full text-center py-3 rounded-md mt-5"
            >
                Login
            </button>
        </form>
    )
}