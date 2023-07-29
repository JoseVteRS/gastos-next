import { Entry } from "@/ticket/interface/ticket.interface";


export function getTotal(entries: Entry[]) {
    if(!entries.length) return 0;
    
    const total = entries.reduce((acc, curr) => {
        return acc + curr.amount;
    }, 0);

    return total.toFixed(2);
}