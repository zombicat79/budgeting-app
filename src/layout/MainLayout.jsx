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
            <main className="titillium-web-regular h-screen px-[3rem] py-[10rem]">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default MainLayout;