<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Orbit') }}</title>

        <!-- Apply the persisted theme before first paint to avoid a flash of the wrong theme. -->
        <script>
            (function () {
                try {
                    var stored = localStorage.getItem('theme');
                    var mode = (stored === 'light' || stored === 'dark' || stored === 'system') ? stored : 'dark';
                    var resolved = mode === 'system'
                        ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
                        : mode;
                    document.documentElement.setAttribute('data-theme', resolved);
                } catch (e) {}
            })();
        </script>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
