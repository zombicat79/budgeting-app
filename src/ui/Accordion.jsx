import { useState } from 'react';

function Accordion({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleAccordion() {
        setIsOpen((curr) => !curr);
    }

    let headerClasses = 'flex relative justify-between py-[1rem] px-[2rem] rounded-xl bg-teal-600 text-white';
    let contentClasses = 'border-0 border-t-0 rounded-xl rounded-t-none py-[1rem] px-[2rem] max-h-0 text-left hidden';
    if (isOpen) {
        headerClasses += ' rounded-b-none';
        contentClasses += ' max-h-max border-1 block!';
    }

    return (
        <article className="md:max-w-7xl m-auto">
            <header className={headerClasses}>
                <h3>{title.toUpperCase()}</h3>
                <p className="absolute top-[50%] -translate-y-[55%] right-6 text-[3rem] hover:cursor-pointer" onClick={toggleAccordion}>+</p>
            </header>
            <main className={contentClasses}>
                {children}
            </main>
        </article>
    )
}

export default Accordion;