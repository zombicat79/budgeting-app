import { createContext, useState, useEffect } from 'react';
import { scrollBlock, scrollUnblock } from '../utils/layout/scroll-management';

const DialogContext = createContext();

function Dialog({ children }) {
    useEffect(() => {
        scrollBlock('body');
        return () => scrollUnblock('body');
    })

    return (
        <div>
            <div className="absolute h-full w-full z-100 flex justify-center items-center bg-gray-600 opacity-75">
            </div>
            <dialog>
                {children}
            </dialog>
        </div>
    )
}

function DialogProvider({ children}) {
    const [dialogShown, setDialogShown] = useState(false);
    const [dialogContent, setDialogContent] = useState(null);

    return (
        <DialogContext.Provider value={{ dialogShown, setDialogShown, dialogContent, setDialogContent }}>
            {children}
        </DialogContext.Provider>
    )
}

export { Dialog, DialogContext, DialogProvider };