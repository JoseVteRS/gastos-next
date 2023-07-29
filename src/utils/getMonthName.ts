

export function getMonthName(date: Date) {
    if(!date) return '';
    const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);
    return monthName;
}