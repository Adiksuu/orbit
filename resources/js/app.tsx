import '../css/app.scss';
import '../css/global.css';
import './bootstrap';

import { ModalContainer } from '@/Components/Organisms/Modal';
import OnboardingModal from '@/Components/Organisms/OnboardingModal/OnboardingModal';
import { AlertProvider } from '@/context/AlertContext';
import { ModalProvider } from '@/context/ModalContext';
import { ShortcutProvider } from '@/context/ShortcutContext';
import { PageProps } from '@/types';
import type { ResolvedComponent } from '@inertiajs/react';
import { createInertiaApp, router, usePage } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const AUTH_PAGES = ['Auth/Login', 'Auth/Register'];

function OnboardingGate() {
    const { component, props } = usePage<PageProps>();
    const user = props.auth.user;

    if (
        !user ||
        AUTH_PAGES.includes(component) ||
        user.has_completed_onboarding
    ) {
        return null;
    }

    const handleClose = () => {
        router.post(route('onboarding.complete'), {}, { preserveScroll: true });
    };

    return <OnboardingModal onClose={handleClose} />;
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent<{ default: ResolvedComponent }>(
            `./Pages/${name}.tsx`,
            import.meta.glob<{ default: ResolvedComponent }>(
                './Pages/**/*.tsx',
            ),
        ).then((module) => module.default),
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
                                <OnboardingGate />
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
