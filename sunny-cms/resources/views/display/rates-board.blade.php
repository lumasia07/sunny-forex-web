<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <title>SunnyRemit Live Exchange Rates Board</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800;900&family=Lexend:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            background-color: #060709;
            color: #ffffff;
            font-family: 'Lexend', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            overflow: hidden;
            height: 100vh;
            width: 100vw;
        }
        .digital-font {
            font-family: 'Orbitron', monospace;
            letter-spacing: 0.05em;
        }
        .glass-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.015) 100%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(12px);
        }
        .glow-red {
            text-shadow: 0 0 20px rgba(244, 63, 94, 0.7);
        }
        .glow-green {
            text-shadow: 0 0 20px rgba(16, 185, 129, 0.7);
        }
        
        /* Smooth, subtle transition */
        .fade-container {
            transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
        }
        .fade-out {
            opacity: 0.2 !important;
            transform: scale(0.995);
        }

        /* Seamless Scrolling Marquee with edge fade mask */
        .welcome-marquee-container {
            overflow: hidden;
            white-space: nowrap;
            width: 100%;
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%);
            mask-image: linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%);
        }
        .welcome-marquee-content {
            display: inline-block;
            white-space: nowrap;
            animation: marquee 32s linear infinite;
        }
        @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
    </style>
</head>
<body class="h-screen w-screen flex flex-col justify-between p-4 lg:p-6 select-none overflow-hidden">

    <!-- Top Header -->
    <header class="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
        <div class="flex items-center gap-4">
            <img src="/logo-white.png" alt="SunnyRemit" class="h-9 w-auto object-contain" />
            <div class="h-7 w-px bg-white/20"></div>
            <div>
                <h1 class="text-sm font-extrabold uppercase tracking-[0.2em] text-white">Official Exchange Rate Board</h1>
            </div>
        </div>
        
        <!-- Live status -->
        <div class="flex items-center gap-5">
            <div class="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-400">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>LIVE RATES</span>
            </div>

            <div class="text-right pl-2">
                <p id="current-time" class="text-xl font-bold digital-font text-gray-200">00:00:00</p>
                <p class="text-[10px] text-gray-400 uppercase tracking-widest">Nairobi (EAT)</p>
            </div>
        </div>
    </header>

    <!-- Main Full-Width Rates Table -->
    <main class="flex-1 min-h-0 flex flex-col my-2 overflow-hidden">
        
        <!-- Table Column Headers (Prominent Top Banner) -->
        <div class="glass-card rounded-xl px-6 lg:px-8 py-2.5 grid grid-cols-[2.2fr_1.2fr_1.2fr_1fr] items-center text-xs font-extrabold uppercase tracking-widest shrink-0 mb-2 border border-white/10 bg-white/[0.04]">
            <div class="text-gray-300 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>CURRENCY & COUNTRY</span>
            </div>
            <div class="text-right text-emerald-400 font-black text-xs sm:text-sm tracking-wider glow-green">
                WE BUY (KES)
            </div>
            <div class="text-right text-rose-400 font-black text-xs sm:text-sm tracking-wider glow-red">
                WE SELL (KES)
            </div>
            <div class="text-right text-gray-300 font-bold text-xs tracking-wider">
                24H TREND
            </div>
        </div>

        <!-- Full-Width Dynamic Rows Container (Strictly Fits Viewport Height without Overlap) -->
        <div id="rates-container" class="flex-1 min-h-0 flex flex-col justify-between gap-2 overflow-hidden fade-container">
            <!-- Rendered by JavaScript -->
        </div>

    </main>

    <!-- Bottom Seamless Marquee (No CBK or Competitive Rates Text) -->
    <footer class="pt-2 shrink-0 z-20 overflow-hidden">
        <div class="welcome-marquee-container py-1.5">
            <div class="welcome-marquee-content text-base sm:text-lg font-extrabold text-white uppercase tracking-wider flex items-center gap-12">
                <span>WELCOME TO SUNNYREMIT — WE WILL SERVE YOU SHORTLY! PLEASE HAVE YOUR IDENTIFICATION DOCUMENT (NATIONAL ID, PASSPORT, OR ALIEN CARD) READY.</span>
                <span class="text-amber-400 text-xl font-bold">•</span>
                <span>ZERO HIDDEN FEES ACROSS ALL 7 NAIROBI BRANCHES — KILIMANI, LAVINGTON, WESTLANDS, GIGIRI, RUNDA!</span>
                <span class="text-amber-400 text-xl font-bold">•</span>
                <span>LOCK TODAY'S EXCHANGE RATES ONLINE GUARANTEED FOR UP TO 4 HOURS.</span>
            </div>
        </div>
    </footer>

    <!-- Kiosk rendering & Auto-Cycle Logic -->
    <script>
        // 15 Curated Currencies Fallback
        var defaultRates = [
            { currency_code: 'USD', currency_name: 'US Dollar', buy_rate: '128.80', sell_rate: '130.40', change_pct: '0.35' },
            { currency_code: 'GBP', currency_name: 'British Pound Sterling', buy_rate: '164.90', sell_rate: '167.10', change_pct: '0.22' },
            { currency_code: 'EUR', currency_name: 'Euro', buy_rate: '140.50', sell_rate: '142.30', change_pct: '-0.15' },
            { currency_code: 'AED', currency_name: 'UAE Dirham', buy_rate: '35.10', sell_rate: '36.10', change_pct: '0.08' },
            { currency_code: 'SAR', currency_name: 'Saudi Riyal', buy_rate: '34.35', sell_rate: '35.25', change_pct: '0.05' },
            { currency_code: 'CAD', currency_name: 'Canadian Dollar', buy_rate: '93.90', sell_rate: '95.80', change_pct: '0.18' },
            { currency_code: 'AUD', currency_name: 'Australian Dollar', buy_rate: '84.50', sell_rate: '86.40', change_pct: '0.29' },
            { currency_code: 'CHF', currency_name: 'Swiss Franc', buy_rate: '145.50', sell_rate: '147.80', change_pct: '-0.04' },
            { currency_code: 'CNY', currency_name: 'Chinese Yuan', buy_rate: '17.75', sell_rate: '18.35', change_pct: '0.04' },
            { currency_code: 'INR', currency_name: 'Indian Rupee', buy_rate: '1.51', sell_rate: '1.63', change_pct: '0.12' },
            { currency_code: 'JPY', currency_name: 'Japanese Yen (100 JPY)', buy_rate: '83.00', sell_rate: '85.50', change_pct: '-0.10' },
            { currency_code: 'ZAR', currency_name: 'South African Rand', buy_rate: '6.88', sell_rate: '7.35', change_pct: '-0.18' },
            { currency_code: 'UGX', currency_name: 'Ugandan Shilling', buy_rate: '0.034', sell_rate: '0.037', change_pct: '0.00' },
            { currency_code: 'TZS', currency_name: 'Tanzanian Shilling', buy_rate: '0.048', sell_rate: '0.052', change_pct: '0.02' },
            { currency_code: 'RWF', currency_name: 'Rwandan Franc', buy_rate: '0.093', sell_rate: '0.099', change_pct: '-0.01' }
        ];

        var allRates = defaultRates;
        var currentPage = 0;
        var itemsPerPage = 5;
        var cycleInterval = null;

        // Clock
        function updateClock() {
            var now = new Date();
            var el = document.getElementById('current-time');
            if (el) {
                el.innerText = now.toLocaleTimeString([], { hour12: false });
            }
        }
        setInterval(updateClock, 1000);
        updateClock();

        // 60-second auto refresh in background
        setInterval(function() {
            fetchRates();
        }, 60000);

        function getFlagCode(currencyCode) {
            var mapping = {
                'USD': 'us', 'GBP': 'gb', 'EUR': 'eu', 'AED': 'ae', 'SAR': 'sa',
                'CAD': 'ca', 'AUD': 'au', 'CHF': 'ch', 'CNY': 'cn', 'INR': 'in',
                'JPY': 'jp', 'ZAR': 'za', 'UGX': 'ug', 'TZS': 'tz', 'RWF': 'rw'
            };
            return mapping[currencyCode] || (currencyCode ? currencyCode.substring(0, 2).toLowerCase() : 'us');
        }

        // Render clean, non-overlapping rows without "Sunny Buy / Sell" text
        function renderCurrentPage() {
            var container = document.getElementById('rates-container');
            if (!container || !allRates || allRates.length === 0) return;
            
            container.innerHTML = '';
            
            var totalPages = Math.ceil(allRates.length / itemsPerPage) || 1;
            var startIndex = currentPage * itemsPerPage;
            var pageItems = allRates.slice(startIndex, startIndex + itemsPerPage);

            pageItems.forEach(function(rate) {
                var row = document.createElement('div');
                row.className = 'glass-card flex-1 min-h-0 rounded-2xl px-6 lg:px-8 grid grid-cols-[2.2fr_1.2fr_1.2fr_1fr] items-center transition-all duration-300 hover:border-emerald-500/40 hover:bg-white/[0.06] shadow-md';
                
                var flagCode = getFlagCode(rate.currency_code);
                var buyVal = parseFloat(rate.buy_rate || 0).toFixed(2);
                var sellVal = parseFloat(rate.sell_rate || 0).toFixed(2);
                var changeVal = parseFloat(rate.change_pct || 0);
                var isPositive = changeVal >= 0;
                var trendClass = isPositive ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/15 text-rose-300 border-rose-500/30';
                var trendSign = isPositive ? '▲ +' : '▼ ';

                row.innerHTML = 
                    '<div class="flex items-center gap-4">' +
                        '<div class="w-11 h-7.5 rounded-lg overflow-hidden border border-white/20 shadow-md shrink-0 bg-black/40">' +
                            '<img src="https://flagcdn.com/h40/' + flagCode + '.png" class="w-full h-full object-cover" alt="' + rate.currency_code + '" />' +
                        '</div>' +
                        '<div class="min-w-0">' +
                            '<div class="flex items-center gap-2.5">' +
                                '<span class="text-xl lg:text-2xl font-black text-white tracking-wide digital-font">' + rate.currency_code + '</span>' +
                                '<span class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-gray-300">KES</span>' +
                            '</div>' +
                            '<span class="text-xs text-gray-400 font-light block truncate mt-0.5">' + (rate.currency_name || '') + '</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="text-right flex items-center justify-end">' +
                        '<span class="text-2xl lg:text-3xl font-black digital-font text-emerald-400 glow-green">' + buyVal + '</span>' +
                    '</div>' +
                    '<div class="text-right flex items-center justify-end">' +
                        '<span class="text-2xl lg:text-3xl font-black digital-font text-rose-400 glow-red">' + sellVal + '</span>' +
                    '</div>' +
                    '<div class="text-right flex items-center justify-end">' +
                        '<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold digital-font border ' + trendClass + '">' +
                            '<span>' + trendSign + Math.abs(changeVal).toFixed(2) + '%</span>' +
                        '</div>' +
                    '</div>';

                container.appendChild(row);
            });
        }

        // Smooth transition without pitch black flash
        function nextCyclePage() {
            var container = document.getElementById('rates-container');
            if (!container || !allRates || allRates.length === 0) return;
            
            container.classList.add('fade-out');
            
            setTimeout(function() {
                var totalPages = Math.ceil(allRates.length / itemsPerPage) || 1;
                currentPage = (currentPage + 1) % totalPages;
                
                renderCurrentPage();
                
                container.classList.remove('fade-out');
            }, 250);
        }

        function fetchRates() {
            fetch('/api/v1/rates?_t=' + Date.now())
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    if (data && data.length > 0) {
                        allRates = data;
                    }
                    renderCurrentPage();
                })
                .catch(function(err) {
                    console.warn('Using default rates seeder:', err);
                    renderCurrentPage();
                });
        }

        // Start
        renderCurrentPage();
        cycleInterval = setInterval(nextCyclePage, 6000);
        fetchRates();
    </script>
</body>
</html>
