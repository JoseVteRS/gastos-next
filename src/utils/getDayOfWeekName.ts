export function getDayOfWeekName(dateString: string): string {
    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleString('es-ES', { weekday: 'long' });
    return dayOfWeek;
}