export const dynamic = 'force-dynamic'

import { NewEntry } from "@/ticket/components/new-entry"
import { Entry } from "@prisma/client"
import { TopBar } from "../components/top-bar"
import { getUserSessionServer } from "@/auth/actions/auth-actions"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { DeleteTicket } from "@/ticket/components/delete-ticket"
import { ListItem } from "@/ticket/components/list-item"


const SALARY = 1070.62

export default async function Home() {

  const user = await getUserSessionServer()
  if (!user) redirect('/api/auth/signin')

  const entries = await prisma.entry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  })



  return (
    <main className="min-h-screen  overflow-hidden p-4">

      <TopBar />
      <h1 className="text-xl font-bold mb-4">Ticket (Julio)</h1>
      <NewEntry />

      {!entries || entries.length === 0 && (<p className="mt-5 text-center">No hay gastos</p>)}

      <div className="mt-5 pt-5 border-t-2 border-black border-dashed" >
        {entries.map((entry: Entry) => <ListItem key={entry.id} entry={entry} />)}
      </div>


    </main>
  )
}
