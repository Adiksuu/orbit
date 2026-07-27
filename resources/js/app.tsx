import '../css/app.scss';
import '../css/global.css';
import './bootstrap';

import { ModalContainer } from '@/Components/Organisms/Modal';
import { AlertProvider } from '@/context/AlertContext';
import { ModalProvider } from '@/context/ModalContext';
import { ShortcutProvider } from '@/context/ShortcutContext';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <App {...props}>
                {({ Component, props: pageProps, key }) => (
                    <ModalProvider>
                        <AlertProvider>
                            <ShortcutProvider>
                                <ModalContainer />
                                <Component {...pageProps} key={key} />
                            </ShortcutProvider>
                        </AlertProvider>
                    </ModalProvider>
                )}
            </App>,
        );
    },
    progress: {
        color: '#4B5563',
    },
}).then((r) => console.log('Inertia app initialized', r));
