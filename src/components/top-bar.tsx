/* eslint-disable @next/next/no-img-element */
'use client';

import { signIn, signOut, useSession } from "next-auth/react";

export const TopBar = () => {
    const { data, status } = useSession()
    if (status === 'loading') return (<div>Loading...</div>)


    return (
        <div className="mb-14 border-b-2 border-black border-dashed">
            {
                data
                    ? (
                        <div className="flex gap-2 items-center justify-between p-1">
                            <img src={data?.user?.image || ''} alt="" className="w-8 h-8 rounded-full" />
                            <div className="flex-grow">

                                {
                                    data?.user?.name
                                }
                            </div>

                            <button onClick={() => signOut()}>
                                Salir
                            </button>
                        </div>
                    )
                    : (
                        <button onClick={() => signIn()}>Iniciar sesión</button>
                    )
            }
        </div>
    )
}
