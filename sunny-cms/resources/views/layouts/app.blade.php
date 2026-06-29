<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ $title ?? 'SunnyRemit Admin' }}</title>

        <!-- Fonts: Outfit and Inter -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">

        <!-- Tailwind Play CDN -->
        <script src="https://cdn.tailwindcss.com"></script>
        
        <!-- Alpine.js for Dropdowns & State Management -->
        <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
        
        <!-- Configure Tailwind Custom Theme to match SunnyRemit brand -->
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            brand: {
                                50: '#FDF2F4',
                                100: '#FCE7EB',
                                200: '#FBCCD5',
                                300: '#F7A3B3',
                                400: '#F26D87',
                                500: '#E43E63',
                                600: '#CA2249',
                                700: '#A71738',
                                800: '#7A1220', // Brand Dark Red
                                900: '#64101E',
                                950: '#38050D',
                            },
                            dark: {
                                900: '#0E0E0E', // Brand Dark Black
                                950: '#070707',
                            }
                        },
                        fontFamily: {
                            sans: ['Inter', 'sans-serif'],
                            display: ['Outfit', 'sans-serif'],
                        }
                    }
                }
            }
        </script>

        <!-- Custom premium styling -->
        <style>
            /* Default: Dark mode CSS styles */
            body {
                background: linear-gradient(135deg, #0e0e0e 0%, #170d0f 100%) !important;
                color: #f3f4f6 !important;
                font-family: 'Inter', sans-serif;
            }
            .glass {
                background: rgba(255, 255, 255, 0.02) !important;
                border: 1px solid rgba(255, 255, 255, 0.04) !important;
                color: #f3f4f6;
            }
            aside {
                background-color: #0E0E0E !important;
                border-right-color: rgba(255, 255, 255, 0.05) !important;
            }
            header {
                border-bottom-color: rgba(255, 255, 255, 0.05) !important;
            }
            .transition-all {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            /* Light mode overrides when body has class 'light' */
            body.light {
                background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
                color: #1e293b !important;
            }
            body.light h2, body.light h3, body.light h4, body.light th {
                color: #0f172a !important;
            }
            body.light .text-white {
                color: #0f172a !important;
            }
            body.light .text-gray-400 {
                color: #475569 !important;
            }
            body.light .text-gray-300 {
                color: #334155 !important;
            }
            body.light .text-gray-500 {
                color: #64748b !important;
            }
            body.light .glass {
                background: #ffffff !important;
                border: 1px solid #e2e8f0 !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03) !important;
                color: #1e293b !important;
            }
            body.light aside {
                background-color: #ffffff !important;
                border-right: 1px solid #e2e8f0 !important;
            }
            body.light aside a:not(.bg-brand-800) {
                color: #475569 !important;
            }
            body.light aside a:not(.bg-brand-800):hover {
                background-color: #f1f5f9 !important;
                color: #0f172a !important;
            }
            body.light header {
                background-color: rgba(255, 255, 255, 0.7) !important;
                border-bottom: 1px solid #e2e8f0 !important;
            }
            body.light input, body.light textarea, body.light select {
                background-color: #f8fafc !important;
                border-color: #cbd5e1 !important;
                color: #0f172a !important;
            }
            body.light input::placeholder, body.light textarea::placeholder {
                color: #94a3b8 !important;
            }
            body.light tr:hover {
                background-color: #f8fafc !important;
            }
            body.light .border-white\/10, body.light .border-white\/5 {
                border-color: #e2e8f0 !important;
            }
            body.light .divide-white\/5 > * {
                border-color: #e2e8f0 !important;
            }
            body.light img[src="/logo-white.png"] {
                content: url('/logo-red.png');
            }
            body.light img[src="/symbol-white.png"] {
                content: url('/symbol-red.png');
            }
        </style>
    </head>
    <body class="font-sans antialiased min-h-screen flex" 
          x-data="{ 
             darkMode: localStorage.getItem('theme') !== 'light',
             sidebarCollapsed: false,
             mobileSidebarOpen: false,
             toggleTheme() {
                 this.darkMode = !this.darkMode;
                 localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
             }
          }"
          :class="darkMode ? '' : 'light'">

        <!-- Mobile Drawer Backdrop -->
        <div x-show="mobileSidebarOpen" 
             x-transition:opacity
             @click="mobileSidebarOpen = false"
             class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
             style="display: none;"></div>

        <!-- Sidebar layout container -->
        <aside class="h-screen fixed left-0 top-0 bg-dark-900 border-r border-white/5 flex flex-col justify-between py-6 px-4 z-40 transition-all duration-300"
               :class="[
                   sidebarCollapsed ? 'w-20' : 'w-64',
                   mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
               ]">
            
            <div class="flex flex-col h-full justify-between">
                <div>
                    <!-- Brand logo header -->
                    <div class="mb-8 flex items-center justify-between" :class="sidebarCollapsed ? 'px-1' : 'px-3'">
                        <a href="{{ route('dashboard') }}" class="flex items-center">
                            <!-- Full logo -->
                            <img src="/logo-white.png" alt="SunnyRemit" class="h-6 w-auto object-contain" x-show="!sidebarCollapsed" />
                            <!-- Symbol icon only -->
                            <img src="/symbol-white.png" alt="SunnyRemit" class="h-7 w-auto object-contain mx-auto" x-show="sidebarCollapsed" style="display: none;" />
                        </a>
                        
                        <!-- Collapse trigger button (desktop only) -->
                        <button @click="sidebarCollapsed = !sidebarCollapsed" class="hidden md:flex text-gray-500 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all">
                            <svg class="w-5 h-5 transition-transform" :class="sidebarCollapsed ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- Navigation menu links grouped with beautiful icons -->
                    <nav class="space-y-1">
                        <div class="px-3 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest" x-show="!sidebarCollapsed">
                            Navigation
                        </div>

                        @php
                            $adminRoutes = [
                                ['route' => 'admin.dashboard', 'label' => 'Overview', 'icon' => 'M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'],
                                ['route' => 'admin.rates.index', 'label' => 'Forex Rate Engine', 'icon' => 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'],
                                ['route' => 'admin.branches.index', 'label' => 'Branches', 'icon' => 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'],
                                ['route' => 'admin.blog.index', 'label' => 'Blog', 'icon' => 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'],
                                ['route' => 'admin.faqs.index', 'label' => 'FAQs', 'icon' => 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'],
                                ['route' => 'admin.seo.index', 'label' => 'SEO', 'icon' => 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'],
                            ];

                            $auditRoutes = [
                                ['route' => 'audit.dashboard', 'label' => 'Audit Overview', 'icon' => 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'],
                                ['route' => 'audit.rates', 'label' => 'Rate History', 'icon' => 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'],
                                ['route' => 'audit.activity', 'label' => 'Activity Logs', 'icon' => 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'],
                                ['route' => 'audit.report', 'label' => 'Export Reports', 'icon' => 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'],
                            ];
                        @endphp

                        @if(auth()->user()->hasRole('admin', 'editor'))
                            @foreach($adminRoutes as $nav)
                                <a href="{{ route($nav['route']) }}" 
                                   class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group {{ request()->routeIs($nav['route']) ? 'bg-brand-800 text-white shadow-lg shadow-brand-800/10' : 'text-gray-400 hover:text-white hover:bg-white/5' }}"
                                   :class="sidebarCollapsed ? 'justify-center px-0' : 'px-3'"
                                   title="{{ $nav['label'] }}">
                                    
                                    <svg class="w-5 h-5 flex-shrink-0 transition-colors {{ request()->routeIs($nav['route']) ? 'text-white' : 'text-gray-500 group-hover:text-white' }}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="{{ $nav['icon'] }}"></path>
                                    </svg>
                                    <span x-show="!sidebarCollapsed">{{ $nav['label'] }}</span>
                                </a>
                            @endforeach
                        @endif

                        @if(auth()->user()->hasRole('ceo', 'auditor'))
                            @foreach($auditRoutes as $nav)
                                <a href="{{ route($nav['route']) }}" 
                                   class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group {{ request()->routeIs($nav['route']) ? 'bg-brand-800 text-white shadow-lg shadow-brand-800/10' : 'text-gray-400 hover:text-white hover:bg-white/5' }}"
                                   :class="sidebarCollapsed ? 'justify-center px-0' : 'px-3'"
                                   title="{{ $nav['label'] }}">
                                    
                                    <svg class="w-5 h-5 flex-shrink-0 transition-colors {{ request()->routeIs($nav['route']) ? 'text-white' : 'text-gray-500 group-hover:text-white' }}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="{{ $nav['icon'] }}"></path>
                                    </svg>
                                    <span x-show="!sidebarCollapsed">{{ $nav['label'] }}</span>
                                </a>
                            @endforeach
                        @endif
                    </nav>
                </div>

                <!-- Footer details inside sidebar -->
                <div class="border-t border-white/5 pt-4" :class="sidebarCollapsed ? 'px-0 text-center' : 'px-3'">
                    <span class="text-[9px] uppercase font-mono tracking-widest text-gray-600 block" x-show="!sidebarCollapsed">Logged In As</span>
                    <span class="text-xs font-semibold text-white block mt-0.5 truncate" x-show="!sidebarCollapsed">{{ auth()->user()->name }}</span>
                    <!-- Condensed initial indicator when collapsed -->
                    <span class="inline-block w-8 h-8 rounded-full bg-white/5 text-gray-400 font-bold text-xs leading-8 uppercase mx-auto" x-show="sidebarCollapsed" style="display: none;">
                        {{ substr(auth()->user()->name, 0, 1) }}
                    </span>
                </div>
            </div>
        </aside>

        <!-- Right Side Content Area -->
        <div class="flex-1 min-h-screen flex flex-col justify-between transition-all duration-300"
             :class="sidebarCollapsed ? 'md:pl-20' : 'md:pl-64'">
            
            <!-- Top bar header -->
            <header class="h-16 border-b border-white/5 flex items-center justify-between px-6 md:px-8 bg-dark-950/20 backdrop-blur-xl">
                <div class="flex items-center gap-4">
                    <!-- Mobile Sidebar Toggle Hamburger -->
                    <button @click="mobileSidebarOpen = !mobileSidebarOpen" class="md:hidden text-gray-400 hover:text-white focus:outline-none">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    
                    <span class="text-xs text-gray-500 uppercase tracking-widest font-mono">{{ auth()->user()->role }} Workspace</span>
                </div>

                <!-- User Dropdown, Theme Toggle & Profile Actions -->
                <div class="flex items-center gap-4">
                    <!-- Light / Dark Mode Toggle Button -->
                    <button @click="toggleTheme()" class="text-gray-400 hover:text-white p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all focus:outline-none" :title="darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
                        <!-- Sun Icon (visible in Dark Mode) -->
                        <svg x-show="darkMode" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.364 17.636l-.707.707M17.364 17.636l.707-.707M6.364 6.364l.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <!-- Moon Icon (visible in Light Mode) -->
                        <svg x-show="!darkMode" class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display: none;">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                        </svg>
                    </button>

                    <!-- Avatar Dropdown Container -->
                    <div class="relative" x-data="{ open: false }">
                        <button @click="open = !open" @click.outside="open = false" class="flex items-center gap-2.5 focus:outline-none group">
                            <!-- Initials Avatar -->
                            <div class="w-9 h-9 rounded-full bg-brand-800/80 border border-brand-500/30 flex items-center justify-center text-white font-bold text-sm tracking-wide shadow-md shadow-brand-800/10 group-hover:border-brand-500 transition-all font-display uppercase">
                                {{ substr(auth()->user()->name, 0, 2) }}
                            </div>
                            <svg class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        
                        <!-- Dropdown Menu -->
                        <div x-show="open" 
                             x-transition:enter="transition ease-out duration-100"
                             x-transition:enter-start="transform opacity-0 scale-95"
                             x-transition:enter-end="transform opacity-100 scale-100"
                             x-transition:leave="transition ease-in duration-75"
                             x-transition:leave-start="transform opacity-100 scale-100"
                             x-transition:leave-end="transform opacity-0 scale-95"
                             class="absolute right-0 mt-3 w-56 rounded-2xl glass p-2 shadow-2xl border border-white/10 z-50 text-left"
                             style="display: none;">
                            
                            <div class="px-4 py-3 border-b border-white/5 mb-1.5">
                                <p class="text-xs font-semibold text-gray-400">Signed in as</p>
                                <p class="text-sm font-bold text-white truncate mt-0.5">{{ auth()->user()->name }}</p>
                                <p class="text-[10px] font-mono text-brand-400 mt-0.5 uppercase tracking-wider">{{ auth()->user()->role }}</p>
                            </div>

                            <a href="{{ route('profile.edit') }}" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-all">
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                My Profile
                            </a>
                            
                            <div class="h-px bg-white/5 my-1.5"></div>
                            
                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <button type="submit" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all text-left">
                                    <svg class="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                    Log out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Main Content Container -->
            <main class="flex-grow px-6 md:px-8 py-8 overflow-y-auto">
                <!-- Toast Notifications -->
                @if(session('success'))
                    <div class="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center justify-between">
                        <span>{{ session('success') }}</span>
                    </div>
                @endif

                @if($errors->any())
                    <div class="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                        <ul class="list-disc list-inside">
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                {{ $slot }}
            </main>

            <!-- Sticky footer -->
            <footer class="border-t border-white/5 py-6 text-center text-xs text-gray-600">
                &copy; {{ date('Y') }} SunnyRemit. Phase 1 CMS. All Rights Reserved.
            </footer>
        </div>
    </body>
</html>
