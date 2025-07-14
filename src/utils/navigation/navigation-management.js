function getUrlParams() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.searchParams);

    return params;
}

export { getUrlParams };