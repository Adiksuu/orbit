import '../css/app.scss';
import '../css/global.css';
import './bootstrap';

import { AlertProvider } from '@/context/AlertContext';
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
                    <AlertProvider>
                        <Component {...pageProps} key={key} />
                    </AlertProvider>
                )}
            </App>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
