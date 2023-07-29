import { Entry } from "@/ticket/interface/ticket.interface";


interface GroupedData {
    [date: string]: Entry[];
}

export function groupEntriesByDate(entries: Entry[] | null): { date: string; data: Entry[] }[] {
    const groupedData: { [date: string]: Entry[] } = {};

    if (!entries || entries.length === 0) {
        return [];
    }

    entries.forEach((entry) => {
        if (!entry || !entry.createdAt) {
            return;
        }

        const dateKey = entry.createdAt.toISOString().split('T')[0];
        if (!groupedData[dateKey]) {
            groupedData[dateKey] = [];
        }
        groupedData[dateKey].push(entry);
    });

    return Object.entries(groupedData).map(([date, data]) => ({ date, data }));
}