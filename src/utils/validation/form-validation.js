function validateDates(start, end) {
    const presentDate = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (startDate < presentDate && startDate.getDay() < presentDate.getDay()) {
        return { status: false, msg: 'Start date cannot be set earlier than the present date.' };
    }

    if (startDate > endDate) {
        return { status: false, msg: 'End date cannot be set earlier than the start date.' };
    }

    return { status: true, msg: 'ok' };
}

export { validateDates };