import { useContext } from 'react';
import { Loader, LoaderContext } from './../contexts/LoaderContext';
import { Dialog, DialogContext } from '../contexts/DialogContext';
import { Outlet, useLocation } from 'react-router';

import Header from './Header';
import Footer from './Footer';
import GoBack from '../ui/GoBack';

function MainLayout() {
    const location = useLocation();
    const { isLoading } = useContext(LoaderContext);
    const { dialogShown, dialogContent } = useContext(DialogContext);

    return (
        <>
            {isLoading && <Loader />}
            {dialogShown && <Dialog>{dialogContent}</Dialog>}
            <Header />
            {location.pathname !== "/" && <GoBack />}
            <main className="titillium-web-regular min-h-[70vh] px-[3rem] py-[10rem] flex flex-col justify-center">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default MainLayout;