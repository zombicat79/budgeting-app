function validateName(context, name) {
    if (!name) {
        return { status: false, msg: context === 'Entry' ? `Description field cannot be empty` : `Name field cannot be empty` };
    }

    if (name.length > 20) {
        return { status: false, msg: context === 'Entry' ? `Description must have less than 20 characters` : `Name must have no more than 20 characters` };
    }
    
    return { status: true, msg: 'ok' };
}

function validateAmount(context, amount) {
    if (amount === 0) {
        if (context === 'Budget') {
            return { status: false, msg: `INITIAL BALANCE cannot be empty and must be greater than ${amount}` };
        } else {
            return { status: false, msg: `${context} amount cannot be empty and must be greater than ${amount}` };
        }
    }

    if (amount < 0) {
        return { status: false, msg: `${context} amount does not accept negative numbers` };
    }
    
    return { status: true, msg: 'ok' };
}

function validateDates(start, end) {
    const presentDate = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (!start) {
        return { status: false, msg: `START DATE field cannot be empty` };
    }

    if (!end) {
        return { status: false, msg: `END DATE field cannot be empty` };
    }

    if (startDate < presentDate && startDate.getDate() < presentDate.getDate()) {
        return { status: false, msg: 'START DATE cannot be set earlier than the present date.' };
    }

    if (startDate > endDate) {
        return { status: false, msg: 'END DATE cannot be set earlier than the start date.' };
    }

    return { status: true, msg: 'ok' };
}

function validateSingleDate(date) {
    const presentDate = new Date();
    const inputDate = new Date(date);

    if (!date) {
        return { status: false, msg: `DATE field cannot be empty` };
    }

    if (inputDate < presentDate) {
        return { status: false, msg: 'DATE cannot be set earlier than the present date.' };
    }

    return { status: true, msg: 'ok' };
}

function validate(context, data) {
    const descriptiveData = data.name || data.description;
    const nameValidation = validateName(context, descriptiveData);
    if (!nameValidation.status) {
        return { validationError: true, validationMsg: nameValidation.msg };
    }

    const amountData = data.initialBalance || data.amount || data.cashAllowance || 0;
    const amountValidation = validateAmount(context, amountData);
    if (!amountValidation.status) {
        return { validationError: true, validationMsg: amountValidation.msg };
    }

    let dateValidation;
    if (context === 'Budget') {
        dateValidation = validateDates(data.startDate, data.endDate);
    } else {
        dateValidation = validateSingleDate(data.inputDate || data.expiryDate);
    }
    if (!dateValidation.status) {
        return { validationError: true, validationMsg: dateValidation.msg };
    }

    return { validationError: false, validationMsg: 'ok'};
}

export { validateSingleDate };
export default validate;
