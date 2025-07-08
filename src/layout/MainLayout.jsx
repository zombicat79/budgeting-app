import { useContext } from 'react';
import { Loader, LoaderContext } from './../contexts/LoaderContext';
import { Outlet, useLocation } from 'react-router';

import Header from './Header';
import Footer from './Footer';
import GoBack from '../ui/GoBack';

function MainLayout() {
    const location = useLocation();
    const { isLoading } = useContext(LoaderContext);

    return (
        <>
            {isLoading && <Loader />}
            <Header />
            {location.pathname !== "/" && <GoBack />}
            <main className="titillium-web-regular h-full place-content-center px-[3rem] pt-[8rem] pb-[2rem]">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default MainLayout;