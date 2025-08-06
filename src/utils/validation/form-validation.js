function validateName(context, action, name, currentProject) {
    if (!name) {
        return { status: false, msg: 'Name field cannot be empty' };
    }

    if (name.length > 20) {
        return { status: false, msg: 'Name must have no more than 20 characters' };
    }

    if (context === 'Budget' && action === 'create') {
        let budgetScanResult = false;
        currentProject.attachedBudgets.forEach((budget) => {
            if (budget.name === name) {
                budgetScanResult = true;
            }
        });

        if (budgetScanResult) return { status: false, msg: `There is already a budget with the chosen name existing in the current project. Please choose a DIFFERENT NAME` };
    }
    
    return { status: true, msg: 'ok' };
}

function validateDescription(description) {
    if (description.length > 250) {
        return { status: false, msg: 'Description must have no more than 250 characters' };
    }

    return { status: true, msg: 'ok' };
}

function validateAmount(context, amount, currentProject, currentBudget, isExpense) {
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

    if (currentBudget && amount > currentBudget.currentBalance && isExpense ) {
        return { status: false, msg: `EXPENSES cannot be higher than the current budget's AVAILABLE BALANCE` };
    }

    if (currentProject && amount > currentProject.availableAllowance) {
        return { status: false, msg: `Budget's INITIAL BALANCE cannot be higher than the current project's NON-ALLOCATED amount` };
    }
    
    return { status: true, msg: 'ok' };
}

function validateDates(start, end, projectExpiry) {
    const normalizedStart = start.split('-').reverse().join('-');
    const normalizedEnd = end.split('-').reverse().join('-');
    const normalizedExpiry = projectExpiry.split('-').reverse().join('-');

    const presentDate = new Date();
    const startDate = new Date(normalizedStart);
    const endDate = new Date(normalizedEnd);
    const projectEnd = new Date(normalizedExpiry);

    if (!start) {
        return { status: false, msg: `START DATE field cannot be empty` };
    }

    if (!end) {
        return { status: false, msg: `END DATE field cannot be empty` };
    }

    if (startDate < presentDate) {
        const dayEquality = startDate.getDate() === presentDate.getDate();
        const monthEquality = startDate.getMonth() === presentDate.getMonth();
        const yearEquality = startDate.getFullYear() === presentDate.getFullYear();

        if (!(dayEquality && monthEquality && yearEquality)) {
            return { status: false, msg: 'START DATE cannot be set earlier than the present date' };
        }
    }

    if (startDate > endDate) {
        return { status: false, msg: 'END DATE cannot be set earlier than the start date' };
    }

    if (endDate > projectEnd) {
        return { status: false, msg: "END DATE cannot be set later than the current project's EXPIRY DATE" };
    }

    return { status: true, msg: 'ok' };
}

function validateSingleDate(context, date) {
    const normalizedDate = date.split('-').reverse().join('-');
    const presentDate = new Date();
    const inputDate = new Date(normalizedDate);

    if (!date) {
        return { status: false, msg: `DATE field cannot be empty` };
    }

    if (context !== 'Entry' && inputDate < presentDate) {
        const dayEquality = inputDate.getDate() === presentDate.getDate();
        const monthEquality = inputDate.getMonth() === presentDate.getMonth();
        const yearEquality = inputDate.getFullYear() === presentDate.getFullYear();

        if (!(dayEquality && monthEquality && yearEquality)) {
            return { status: false, msg: 'DATE cannot be set earlier than the present date' };
        }
    }

    return { status: true, msg: 'ok' };
}

function validate(context, action, data, currentProject = null, currentBudget = null, isExpense = null) {
    const nameValidation = validateName(context, action, data.name, currentProject);
    if (!nameValidation.status) {
        return { validationError: true, validationMsg: nameValidation.msg };
    }

    if (context === 'Entry') {
        const descriptionValidation = validateDescription(data.description);
        if (!descriptionValidation.status) {
            return { validationError: true, validationMsg: descriptionValidation.msg };
        }
    }

    const amountData = data.initialBalance || data.amount || data.cashAllowance || 0;
    const amountValidation = validateAmount(context, amountData, currentProject, currentBudget, isExpense);
    if (!amountValidation.status) {
        return { validationError: true, validationMsg: amountValidation.msg };
    }

    let dateValidation;
    if (context === 'Budget') {
        dateValidation = validateDates(data.startDate, data.endDate, currentProject.expiryDate);
    } else {
        dateValidation = validateSingleDate(context, data.inputDate || data.expiryDate);
    }
    if (!dateValidation.status) {
        return { validationError: true, validationMsg: dateValidation.msg };
    }

    return { validationError: false, validationMsg: 'ok'};
}

export { validateSingleDate };
export default validate;
