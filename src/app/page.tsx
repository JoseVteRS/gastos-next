import { Entry } from "@prisma/client"


const getTotal = (entries: Entry[]) => {
  return entries.reduce((acc, entry) => acc + entry.amount, 0).toFixed(2)
}

// Group by createdAt day and return an array of entries. The day will be the num day and name day of the week. Per example: 2021-05-01 -> 1 - Saturday
const getEntriesByDay = (entries: Entry[]) => {

  const entriesByDay = entries.reduce((acc: any, entry) => {
    const date = new Date(entry.createdAt)
    const day = date.getDate()
    const nameDay = date.toLocaleString('es-ES', { weekday: 'long' })

    if (!acc[day]) {
      acc[day] = {
        day,
        nameDay,
        entries: []
      }
    }

    acc[day].entries.push(entry)

    return acc
  }, {})

  return Object.values(entriesByDay)


}

const SALARY = 1070.62

export default async function Home() {
  const entries = await fetch('http://localhost:3000/api/entry', {
    method: 'GET',
  }).then(res => res.json())

  return (
    <main className="min-h-screen  overflow-hidden p-4">
      <h1 className="text-2xl font-bold mb-4">Ticket (Julio)</h1>

      {
        getEntriesByDay(entries).map((entry: any) => (
          <div className="my-5" >
            <div className="border-b mb-4 border-black border-dashed">
              <span className="font-bold">Día {entry.day} </span>
              <small className="capitalize block mb-1">{entry.nameDay}</small>
            </div>

            {
              entry.entries.map((entry: Entry) => (
                <div className="flex items-center justify-between">
                  <div>
                    <strong>{entry.concept}</strong> -- <span>{entry.category}</span>
                  </div>
                  <div>
                    {entry.amount}
                  </div>
                </div>
              ))
            }
          </div>
        ))
      }

      <div className="border-t py-3 border-black border-double border-b-4 mb-5 flex items-start justify-end">
        TOTAL: {getTotal(entries)}€
      </div>

      NETO: {(SALARY - Number(getTotal(entries))).toFixed(2)}€
    </main>
  )
}
