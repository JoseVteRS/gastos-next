'use client'

import { signIn, useSession } from "next-auth/react"
import { useState } from "react"


export const NewEntry = () => {
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            setLoading(true)
            const { concept, category, amount } = e.currentTarget

           
            const data = {
                concept: concept.value,
                category: category.value,
                amount: parseFloat(amount.value),
            }

            const res = await fetch('/api/entry', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'no-cache',
            })
            setShow(false)
            return res.json()
        } catch (error) {
            setLoading(false)
            console.log(error)
        } finally {
            setLoading(false)
        }


    }

    return (
        <>
            <button className="border border-black px-2 py-1" onClick={() => setShow(old => !old)} >Crear</button>
            {
                show && (
                    <div className="mb-10 border p-5 border-black mt-5">
                        <form onSubmit={handleSave}>
                            <div className="md:flex items-center justify-start gap-10">
                                <div className="mb-5">
                                    <label htmlFor="concept" className="">Concepto</label>
                                    <input type="text" name="concept" id="concept" className="w-full border-b border-dashed border-black p-1 input-focus" />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="category" className="">Categoría</label>
                                    <input type="text" name="category" id="category" className="w-full border-b border-dashed border-black p-1 input-focus" />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="amount" className="">Monto</label>
                                    <input type="number" step="any" name="amount" id="amount" className="w-full border-b border-dashed border-black p-1 input-focus" />
                                </div>
                                <div className="w-full">
                                    <button className="w-full md:w-auto border border-black px-2 py-1 hover:bg-black hover:text-white transition duration-200" type="submit">
                                        {
                                            loading ? 'Guardando...' : 'Guardar'
                                        }</button>
                                </div>
                            </div>

                        </form>
                    </div>
                )
            }

        </>
    )
}
