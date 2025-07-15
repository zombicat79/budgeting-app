import { useEffect, useRef } from 'react';
import { useNavigate } from "react-router";

function GoBack() {
    const navigate = useNavigate();
    const subheader = useRef(document.getElementById('sub-header'));
    
    useEffect(() => {
        const element = document.getElementById('sub-header');
        subheader.current = element;
    }, [subheader])

    let classes = "fixed left-[2rem] z-10 hover:cursor-pointer";
    subheader.current ? classes += ' top-[16.5rem]' : classes += ' top-[9rem]';
    
    return (
        <button className={classes} onClick={() => navigate(-1)}>
            <svg className="w-full max-w-[3.5rem] iconify iconify--emojione hover:brightness-130" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="32" cy="32" r="30" fill="oklch(52% 0.105 223.128)"></circle><path fill="#ffffff" d="M30.3 16L15 32l15.3 16V37.4H49V27.1H30.3z"></path></g></svg>
        </button>
    )
}

export default GoBack;