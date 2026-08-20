<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <title>SunnyRemit Live Exchange Rates Board</title>
    
    <!-- Professional Financial & Institutional Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            border-radius: 0 !important; /* Force strictly sharp corners */
        }
        body {
            background-color: #080A0F;
            color: #ffffff;
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            overflow: hidden;
            height: 100vh;
            width: 100vw;
        }
        .financial-mono {
            font-family: 'IBM Plex Mono', monospace;
            font-feature-settings: 'tnum' on, 'zero' on;
            letter-spacing: 0.02em;
        }
        .table-frame {
            background-color: #0E121A;
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 12px 36px 0 rgba(0, 0, 0, 0.7);
        }
        .table-row {
            border-bottom: 1px solid rgba(255, 255, 255, 0.07);
            background-color: rgba(255, 255, 255, 0.015);
        }
        .table-row:nth-child(even) {
            background-color: rgba(255, 255, 255, 0.035);
        }
        .table-row:last-child {
            border-bottom: none;
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
<body class="h-screen w-screen flex flex-col justify-between p-3 lg:p-5 select-none overflow-hidden">

    <!-- Top Formal Header -->
    <header class="flex items-center justify-between border-b-2 border-white/20 pb-2.5 shrink-0">
        <div class="flex items-center gap-4">
            <img src="/logo-white.png" alt="SunnyRemit" class="h-8 lg:h-9 w-auto object-contain" />
            <div class="h-6 lg:h-7 w-px bg-white/25"></div>
            <div>
                <h1 class="text-xs lg:text-sm font-black uppercase tracking-[0.25em] text-white">Official Exchange Rate Board</h1>
            </div>
        </div>
        
        <!-- Live status & Nairobi Clock -->
        <div class="flex items-center gap-6">
            <div class="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/40 px-3 py-1 text-xs font-bold text-emerald-400 tracking-wider">
                <span class="w-2 h-2 bg-emerald-400 animate-pulse"></span>
                <span>LIVE MARKET RATES</span>
            </div>

            <div class="text-right pl-2">
                <p id="current-time" class="text-xl lg:text-2xl font-bold financial-mono text-white tracking-wide">00:00:00</p>
                <p class="text-[9px] lg:text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Nairobi (EAT)</p>
            </div>
        </div>
    </header>

    <!-- Main Formal Dual-Column Split Ledger Table (Option C: All Currencies Visible Simultaneously) -->
    <main class="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 my-2.5 overflow-hidden">
        
        <!-- Left Column Table Frame -->
        <div class="table-frame flex flex-col min-h-0 overflow-hidden">
            <!-- Left Header -->
            <div class="bg-[#141924] border-b-2 border-white/20 px-4 lg:px-6 py-2.5 grid grid-cols-[1.5fr_1fr_1fr] items-center text-[11px] lg:text-xs font-black uppercase tracking-[0.15em] shrink-0 text-gray-300">
                <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-amber-400 inline-block"></span>
                    <span>CURRENCY</span>
                </div>
                <div class="text-right text-emerald-400 font-extrabold tracking-wider pr-2">
                    WE BUY (KES)
                </div>
                <div class="text-right text-rose-400 font-extrabold tracking-wider pr-2">
                    WE SELL (KES)
                </div>
            </div>

            <!-- Left Rows Container -->
            <div id="left-rates-container" class="flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
                <!-- Rendered by JavaScript -->
            </div>
        </div>

        <!-- Right Column Table Frame -->
        <div class="table-frame flex flex-col min-h-0 overflow-hidden">
            <!-- Right Header -->
            <div class="bg-[#141924] border-b-2 border-white/20 px-4 lg:px-6 py-2.5 grid grid-cols-[1.5fr_1fr_1fr] items-center text-[11px] lg:text-xs font-black uppercase tracking-[0.15em] shrink-0 text-gray-300">
                <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-amber-400 inline-block"></span>
                    <span>CURRENCY</span>
                </div>
                <div class="text-right text-emerald-400 font-extrabold tracking-wider pr-2">
                    WE BUY (KES)
                </div>
                <div class="text-right text-rose-400 font-extrabold tracking-wider pr-2">
                    WE SELL (KES)
                </div>
            </div>

            <!-- Right Rows Container -->
            <div id="right-rates-container" class="flex-1 min-h-0 flex flex-col justify-between overflow-hidden">
                <!-- Rendered by JavaScript -->
            </div>
        </div>

    </main>

    <!-- Bottom Formal Marquee (Sharp Corners, Clean White Text) -->
    <footer class="pt-1.5 shrink-0 z-20 border-t border-white/15 overflow-hidden">
        <div class="welcome-marquee-container py-1">
            <div class="welcome-marquee-content text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-12">
                <span>WELCOME TO SUNNYREMIT — WE WILL SERVE YOU SHORTLY! PLEASE HAVE YOUR IDENTIFICATION DOCUMENT (NATIONAL ID, PASSPORT, OR ALIEN CARD) READY.</span>
                <span class="text-amber-400 text-base font-black">•</span>
                <span>ZERO HIDDEN FEES ACROSS ALL 7 NAIROBI BRANCHES — KILIMANI, LAVINGTON, WESTLANDS, GIGIRI, RUNDA!</span>
                <span class="text-amber-400 text-base font-black">•</span>
                <span>LOCK TODAY'S EXCHANGE RATES ONLINE GUARANTEED FOR UP TO 4 HOURS.</span>
            </div>
        </div>
    </footer>

    <!-- Dual-Column Split Rendering Logic -->
    <script>
        // Curated Currencies Default
        var defaultRates = [
            { currency_code: 'USD', currency_name: 'US Dollar', buy_rate: '128.80', sell_rate: '130.40' },
            { currency_code: 'GBP', currency_name: 'British Pound Sterling', buy_rate: '164.90', sell_rate: '167.10' },
            { currency_code: 'EUR', currency_name: 'Euro', buy_rate: '140.50', sell_rate: '142.30' },
            { currency_code: 'AED', currency_name: 'UAE Dirham', buy_rate: '35.10', sell_rate: '36.10' },
            { currency_code: 'SAR', currency_name: 'Saudi Riyal', buy_rate: '34.35', sell_rate: '35.25' },
            { currency_code: 'CAD', currency_name: 'Canadian Dollar', buy_rate: '93.90', sell_rate: '95.80' },
            { currency_code: 'AUD', currency_name: 'Australian Dollar', buy_rate: '84.50', sell_rate: '86.40' },
            { currency_code: 'CHF', currency_name: 'Swiss Franc', buy_rate: '145.50', sell_rate: '147.80' },
            { currency_code: 'CNY', currency_name: 'Chinese Yuan', buy_rate: '17.75', sell_rate: '18.35' },
            { currency_code: 'INR', currency_name: 'Indian Rupee', buy_rate: '1.51', sell_rate: '1.63' },
            { currency_code: 'JPY', currency_name: 'Japanese Yen (100 JPY)', buy_rate: '83.00', sell_rate: '85.50' },
            { currency_code: 'ZAR', currency_name: 'South African Rand', buy_rate: '6.88', sell_rate: '7.35' },
            { currency_code: 'UGX', currency_name: 'Ugandan Shilling', buy_rate: '0.034', sell_rate: '0.037' },
            { currency_code: 'TZS', currency_name: 'Tanzanian Shilling', buy_rate: '0.048', sell_rate: '0.052' },
            { currency_code: 'RWF', currency_name: 'Rwandan Franc', buy_rate: '0.093', sell_rate: '0.099' }
        ];

        var allRates = defaultRates;

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
            if (!currencyCode) return 'un';
            var code = currencyCode.toUpperCase().trim();
            var specialMapping = {
                'USD': 'us', 'GBP': 'gb', 'EUR': 'eu', 'AED': 'ae', 'SAR': 'sa',
                'CAD': 'ca', 'AUD': 'au', 'CHF': 'ch', 'CNY': 'cn', 'INR': 'in',
                'JPY': 'jp', 'ZAR': 'za', 'UGX': 'ug', 'TZS': 'tz', 'RWF': 'rw',
                'QAR': 'qa', 'KWD': 'kw', 'BHD': 'bh', 'OMR': 'om', 'SEK': 'se',
                'NOK': 'no', 'DKK': 'dk', 'SGD': 'sg', 'HKD': 'hk', 'MYR': 'my',
                'THB': 'th', 'ETB': 'et', 'SOS': 'so', 'ZMW': 'zm', 'NGN': 'ng',
                'GHS': 'gh', 'EGP': 'eg', 'TRY': 'tr', 'NZD': 'nz', 'KES': 'ke',
                'BRL': 'br', 'MXN': 'mx', 'IDR': 'id', 'PHP': 'ph', 'PKR': 'pk'
            };
            // Automatic ISO 4217 standard: first 2 characters always match the 2-letter ISO country code
            return specialMapping[code] || code.substring(0, 2).toLowerCase();
        }

        function createRateRow(rate) {
            var row = document.createElement('div');
            row.className = 'table-row flex-1 min-h-0 px-4 lg:px-6 grid grid-cols-[1.5fr_1fr_1fr] items-center transition-colors duration-150 hover:bg-white/[0.06]';
            
            var flagCode = getFlagCode(rate.currency_code);
            var buyVal = parseFloat(rate.buy_rate || 0).toFixed(2);
            var sellVal = parseFloat(rate.sell_rate || 0).toFixed(2);

            row.innerHTML = 
                '<div class="flex items-center gap-3.5 min-w-0 pr-2">' +
                    '<div class="w-10 h-6.5 lg:w-11 lg:h-7 border border-white/20 shadow shrink-0 bg-black/60 overflow-hidden flex items-center justify-center">' +
                        '<img src="https://flagcdn.com/h40/' + flagCode + '.png" onerror="this.onerror=null;this.src=\'https://flagcdn.com/h40/un.png\';" class="w-full h-full object-cover" alt="' + rate.currency_code + '" />' +
                    '</div>' +
                    '<div class="min-w-0">' +
                        '<div class="flex items-center gap-2">' +
                            '<span class="text-lg lg:text-xl font-black text-white tracking-wide font-sans">' + rate.currency_code + '</span>' +
                            '<span class="text-[9px] uppercase font-bold px-1 py-0.2 border border-white/20 bg-white/5 text-gray-300">KES</span>' +
                        '</div>' +
                        '<span class="text-[11px] text-gray-400 font-medium block truncate tracking-normal">' + (rate.currency_name || '') + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="text-right flex items-center justify-end pr-2">' +
                    '<span class="text-xl lg:text-2xl xl:text-3xl font-bold financial-mono text-emerald-400">' + buyVal + '</span>' +
                '</div>' +
                '<div class="text-right flex items-center justify-end pr-2">' +
                    '<span class="text-xl lg:text-2xl xl:text-3xl font-bold financial-mono text-rose-400">' + sellVal + '</span>' +
                '</div>';

            return row;
        }

        // Render dual-column split board showing all currencies simultaneously
        function renderSplitBoard() {
            var leftContainer = document.getElementById('left-rates-container');
            var rightContainer = document.getElementById('right-rates-container');
            if (!leftContainer || !rightContainer || !allRates || allRates.length === 0) return;
            
            leftContainer.innerHTML = '';
            rightContainer.innerHTML = '';

            var midIndex = Math.ceil(allRates.length / 2);
            var leftItems = allRates.slice(0, midIndex);
            var rightItems = allRates.slice(midIndex);

            leftItems.forEach(function(rate) {
                leftContainer.appendChild(createRateRow(rate));
            });

            rightItems.forEach(function(rate) {
                rightContainer.appendChild(createRateRow(rate));
            });
        }

        function fetchRates() {
            fetch('/api/v1/rates?_t=' + Date.now())
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    if (data && data.length > 0) {
                        allRates = data;
                    }
                    renderSplitBoard();
                })
                .catch(function(err) {
                    console.warn('Using default rates seeder:', err);
                    renderSplitBoard();
                });
        }

        // Initialize Split Board
        renderSplitBoard();
        fetchRates();
    </script>
</body>
</html>
