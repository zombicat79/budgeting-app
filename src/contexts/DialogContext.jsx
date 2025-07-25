import { createContext, useState, useEffect } from 'react';
import { scrollBlock, scrollUnblock } from '../utils/layout/scroll-management';

const DialogContext = createContext();

function Dialog({ children }) {
    useEffect(() => {
        scrollBlock('body');
        return () => scrollUnblock('body');
    })

    return (
        <>
            <div className="absolute h-full w-full z-100 flex justify-center items-center bg-gray-600 opacity-75">
            </div>
            <dialog className="block absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-200 bg-white max-w-[40rem] p-[3rem]">
                {children}
            </dialog>
        </>
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