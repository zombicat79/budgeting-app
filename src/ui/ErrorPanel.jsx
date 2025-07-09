import useError from "../hooks/useError";

function ErrorPanel({ content, onClosePanel }) {
    return (
        <div className="relative w-full max-w-2xl border border-red-500 py-[1.5rem] px-[2rem] rounded-lg mb-[5rem]" role="alert">
            <p className="absolute top-1 right-2 hover:cursor-pointer" onClick={() => onClosePanel(false)}>x</p>
            <div className="flex justify-start items-center gap-x-4">
                <svg className="w-full max-w-[2.5rem]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path fill-rule="evenodd" clipRule="evenodd" d="M11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10V13ZM13 15.9888C13 15.4365 12.5523 14.9888 12 14.9888C11.4477 14.9888 11 15.4365 11 15.9888V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V15.9888ZM9.37735 4.66136C10.5204 2.60393 13.4793 2.60393 14.6223 4.66136L21.2233 16.5431C22.3341 18.5427 20.8882 21 18.6008 21H5.39885C3.11139 21 1.66549 18.5427 2.77637 16.5431L9.37735 4.66136Z" fill="#fb2c36"></path> </g></svg>
                <p className="text-left">{content}</p>
            </div>
        </div>
    )
}

export default ErrorPanel;