import { Entry } from "../interface/ticket.interface"
import { DeleteTicket } from "./delete-ticket"

interface Props {
    entry: Entry
}

export const ListItem = ({ entry }: Props) => {

    return (
        <div key={entry.id} className="flex items-center justify-between">
            <div className="flex gap-2 items-center">

                <DeleteTicket id={entry.id} />
                <div>
                    <strong>{entry.concept}</strong> -- <span>{entry.category}</span>
                </div>
            </div>

            <div>
                {entry.amount.toFixed(2)}€
            </div>
        </div>
    )
}
