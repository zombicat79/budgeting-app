import { createContext, useState, useEffect } from 'react';
import { scrollBlock, scrollUnblock } from '../utils/layout/scroll-management';

const LoaderContext = createContext();

function Loader({ children }) {
    useEffect(() => {
        scrollBlock('body');
        return () => scrollUnblock('body');
    })

    return (
        <div className="absolute h-full w-full z-100 flex justify-center items-center bg-gray-600 opacity-75">
            {children}
            <svg className="w-full max-w-3xs animate-spin" fill="#000000" viewBox="-0.5 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m23.314 8.518v-7.832l-2.84 2.84c-2.172-2.176-5.175-3.522-8.493-3.522-6.627 0-12 5.373-12 12s5.373 12 12 12c4.424 0 8.289-2.394 10.37-5.958l.031-.057-2.662-1.536c-1.57 2.695-4.447 4.478-7.739 4.478-4.93 0-8.927-3.997-8.927-8.927s3.997-8.927 8.927-8.927c2.469 0 4.704 1.002 6.32 2.622l-2.82 2.82h7.834z"></path></g></svg>
        </div>
    )
}

function LoaderProvider({ children}) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoaderContext.Provider>
    )
}

export { Loader, LoaderContext, LoaderProvider };