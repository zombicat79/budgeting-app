import zombieCatLogo from '/logos/zombiecat-trans-logo.png';

function Footer() {
    const getCurrentYear = () => new Date().getFullYear();

    return (
        <footer className="flex justify-center items-center bg-cyan-700 text-white titillium-web-regular p-[2rem]">
            <div className="flex flex-col items-center">
                <p>Zombie Money Tracker {getCurrentYear()} - © All rights reserved</p>
                <div className="flex flex-col">
                    <p>This demo web app has been designed and developed by</p>
                    <h2 className="russo-one-regular text-[2rem]">
                        ZombieCat
                        <span className="inline-block align-middle ml-2"><img className="w-full max-w-[5rem]" src={zombieCatLogo} alt="Zombiecat logo" /></span>
                    </h2>
                </div>
            </div>
        </footer>
    )
}

export default Footer;