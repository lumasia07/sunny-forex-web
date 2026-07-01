<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>SunnyRemit Portal Access</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

        <!-- Tailwind Play CDN -->
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            brand: {
                                800: '#7A1220',
                                500: '#E43E63',
                            }
                        },
                        fontFamily: {
                            sans: ['Lexend', 'sans-serif'],
                            display: ['Lexend', 'sans-serif'],
                        }
                    }
                }
            }
        </script>

        <style>
            body {
                background: linear-gradient(135deg, #0e0e0e 0%, #1c1012 100%);
                color: #f3f4f6;
                font-family: 'Lexend', sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-rendering: optimizeLegibility;
            }
            .glass {
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
        </style>
    </head>
    <body class="font-sans antialiased min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-md">
            <!-- Logo / Brand -->
            <div class="text-center mb-8 flex flex-col items-center">
                <img src="/logo-white.png" alt="SunnyRemit" class="h-9 w-auto object-contain mb-3" />
                <p class="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Content & Rate Management System</p>
            </div>

            <!-- Card Box -->
            <div class="glass p-8 rounded-3xl shadow-2xl">
                {{ $slot }}
            </div>
        </div>
    </body>
</html>
