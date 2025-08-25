function compareObjects(obj1 = {}, obj2 = {}) {
    let changes = [];

    for (const key in obj1) {
        if (obj1[key] !== obj2[key]) {
        changes.push({key, oldValue: obj1[key], newValue: obj2[key]})
        }
    }

    for (const key in obj2) {
        if (!obj1[key]) {
        changes.push({key, oldValue: null, newValue: obj2[key]})
        }
    }

    return changes;
}

export default compareObjects;