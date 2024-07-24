'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import { registerUser } from "../lib/types"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function user() {
    const { register, handleSubmit, reset  } = useForm<registerUser>();

    const onSubmit: SubmitHandler<registerUser> = (data) => {
        fetch('http://localhost:3000/api/auth/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((data) => {
            if ('error' in data) {
                toast.error(data.error);
                return;
            }

            reset();
            toast.success("Usuário criado com sucesso!");
        })
    };
    
    return (
        <>
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
                    <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="password">Senha</label>
                    <input
                        type="password"
                        {...register('password')}
                        className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans focus:outline-none"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="role">Autorização do usuário</label>
                    <select {...register('role')} className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans">
                        <option value="vendedor">Vendedor</option>
                        <option value="gerente">Gerente</option>
                    </select>
                </div>

                <button 
                    type="submit"
                    className="bg-teal-600 text-gray-300 w-full text-center py-3 rounded-md mt-5"
                >
                    Cadastrar
                </button>
            </form>
            <ToastContainer />
        </>
    )
}