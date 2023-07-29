// export const dynamic = 'force-dynamic'

import { NewEntry } from "@/ticket/components/new-entry"

import { TopBar } from "../components/top-bar"
import { getUserSessionServer } from "@/auth/actions/auth-actions"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { ListItem } from "@/ticket/components/list-item"
import { getMonthName, getTotal, getDayOfWeekName, groupEntriesByDate } from "@/utils"

import { Entry } from "@/ticket/interface/ticket.interface"


export default async function Home() {

  const user = await getUserSessionServer()
  if (!user) redirect('/api/auth/signin')

  const entries = await prisma.entry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  })


  return (
    <main className="min-h-screen  overflow-hidden">

      <TopBar />

      <header className=" px-5 mb-2 flex gap-4 items-center justify-between" >

        <h1 className="text-xl font-bold">Tickets <span className="capitalize">({getMonthName(new Date())})</span></h1>
      </header>

      <div className="px-5">
        <NewEntry />

      </div>

      {!entries || entries.length === 0 && (<p className="mt-5 text-center">No hay gastos</p>)}

      <div className="mt-5 pt-5 px-4 border-t-2 border-black border-dashed" >
        {/* {entries.map((entry: Entry) => <ListItem key={entry.id} entry={entry} />)} */}



        {
          groupEntriesByDate(entries).reverse().map((group, index) => (
            <div key={index} className="mt-1 p-3">


              <div className="mb-3 border-b border-black border-dashed" >
                <span className="font-bold text-lg" >Día: {group.date.split('-')[2]}</span>
                <span className="block capitalize">{getDayOfWeekName(group.date)}</span>
              </div>


              <div>
                {
                  group.data.map((entry: Entry) => <ListItem key={entry.id} entry={entry} />)
                }
              </div>
            </div>
          ))
        }

        {
          entries.length > 0 && (
            <div className="mt-10 p-3 border-black border-double border-t-4 ">
              <p className="text-right">TOTAL: <span className="font-bold text-xl">{getTotal(entries)} €</span></p>
            </div>
          )
        }

      </div>


    </main>
  )
}
