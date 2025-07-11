function capitaliseFirst(string) {
    const firstChar = string.slice(0, 1);
    const rest = string.slice(1);
    return firstChar.toUpperCase() + rest;
}

export { capitaliseFirst };