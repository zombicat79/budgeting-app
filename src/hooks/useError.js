import { useState } from 'react';

function useError() {
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");

    function handleError(nextStatus, errorMsg) {
        setError(nextStatus);
        if (errorMsg) {
            setMsg(errorMsg);
        }
    }

    return { error, msg, handleError }
}

export default useError;