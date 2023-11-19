function getMonth(month) {
    switch (month) {
        case 0: return 'Enero';
        case 1: return 'Febrero';
        case 2: return 'Marzo';
        case 3: return 'Abril';
        case 4: return 'Mayo';
        case 5: return 'Junio';
        case 6: return 'Julio';
        case 7: return 'Agosto';
        case 8: return 'Septiembre';
        case 9: return 'Octubre';
        case 10: return 'Noviembre';
        case 11: return 'Diciembre';
        default: return;
    }
}

function formatHour(hour, minutes) {
    let isDay = true;
    if (hour > 12) isDay = false;
    return `${isDay ? hour : hour - 12}:${minutes} ${isDay ? 'AM' : 'PM'}`
}

function formatDate(dateUTC) {
    let date = new Date(dateUTC);
    return `${date.getDate()} de ${getMonth(date.getMonth())} del ${date.getFullYear()} a las ${formatHour(date.getHours(), date.getMinutes())}.`;
}

export {
    formatDate,
}