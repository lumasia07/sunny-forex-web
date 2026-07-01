<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SunnyRemit Live Exchange Rates</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Lexend:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <style>
        body {
            background-color: #050505;
            color: #ffffff;
            font-family: 'Lexend', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            overflow: hidden;
        }
        .fade-container {
            transition: opacity 0.5s ease-in-out;
        }
        .opacity-0 {
            opacity: 0 !important;
        }
        .digital-font {
            font-family: 'Orbitron', monospace;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
        }
        .glow-red {
            text-shadow: 0 0 10px rgba(228, 62, 99, 0.5);
        }
        .glow-green {
            text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
    </style>
</head>
<body class="min-h-screen flex flex-col justify-between p-8">

    <!-- Header -->
    <header class="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
        <div class="flex items-center gap-6">
            <img src="/logo-white.png" alt="SunnyRemit" class="h-10 w-auto object-contain" />
            <div class="h-8 w-px bg-white/20"></div>
            <p class="text-xs font-semibold uppercase tracking-widest text-gray-500">Official Exchange Rate Board</p>
        </div>
        
        <!-- Live status -->
        <div class="flex items-center gap-6">
            <div class="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl text-xs font-semibold text-emerald-400">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>LIVE RATES</span>
            </div>
            <div class="text-right">
                <p id="current-time" class="text-xl font-bold font-mono text-gray-300">00:00:00</p>
                <p class="text-[10px] text-gray-500 uppercase tracking-wider">Nairobi, East Africa</p>
            </div>
        </div>
    </header>

    <!-- Pinned Market Majors -->
    <div class="mb-8">
        <div class="text-[10px] font-bold text-brand-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
            <span>Market Majors (Pinned)</span>
        </div>
        <div class="grid grid-cols-4 gap-6" id="majors-row">
            <!-- USD, EUR, GBP, AED Pinned Row -->
        </div>
    </div>

    <!-- Main Grid: 2 columns for TV ratio layouts -->
    <main id="rates-main" class="flex-grow grid grid-cols-2 gap-8 items-stretch mb-6 fade-container">
        <!-- Col 1 -->
        <div class="space-y-4 flex flex-col justify-between">
            <div class="grid grid-cols-[1.5fr_1fr_1fr] px-6 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">
                <div>Currency</div>
                <div class="text-right">We Buy</div>
                <div class="text-right">We Sell</div>
            </div>
            
            <div class="flex-grow flex flex-col justify-between gap-3" id="rates-col-1">
                <!-- Javascript will render half the rates here -->
            </div>
        </div>

        <!-- Col 2 -->
        <div class="space-y-4 flex flex-col justify-between">
            <div class="grid grid-cols-[1.5fr_1fr_1fr] px-6 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">
                <div>Currency</div>
                <div class="text-right">We Buy</div>
                <div class="text-right">We Sell</div>
            </div>
            
            <div class="flex-grow flex flex-col justify-between gap-3" id="rates-col-2">
                <!-- Javascript will render the other half here -->
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-gray-500">
        <div>Licensed & Regulated by the Central Bank of Kenya</div>
        <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Refreshing automatically in <span id="counter" class="font-mono text-white font-bold">60</span>s</span>
        </div>
    </footer>

    <!-- Kiosk rendering logic -->
    <script>
        // Update live time clock
        function updateClock() {
            const now = new Date();
            document.getElementById('current-time').innerText = now.toLocaleTimeString([], { hour12: false });
        }
        setInterval(updateClock, 1000);
        updateClock();

        // Counter logic for refresh
        let count = 60;
        const counterEl = document.getElementById('counter');
        setInterval(() => {
            count--;
            if (count <= 0) {
                fetchRates();
                count = 60;
            }
            counterEl.innerText = count;
        }, 1000);

        // Carousel variables
        let allRates = [];
        let majorRates = [];
        let cycleRates = [];
        let currentPage = 0;
        let cycleInterval = null;

        // Fetch rates dynamically from internal API
        function fetchRates() {
            fetch('/api/v1/rates')
                .then(res => res.json())
                .then(data => {
                    allRates = data;
                    
                    // Filter majors (USD, EUR, GBP, AED)
                    const majorCodes = ['USD', 'EUR', 'GBP', 'AED'];
                    majorRates = allRates.filter(r => majorCodes.includes(r.currency_code));
                    
                    // The rest will cycle
                    cycleRates = allRates.filter(r => !majorCodes.includes(r.currency_code));
                    
                    // Order cycleRates alphabetically
                    cycleRates.sort((a, b) => a.currency_code.localeCompare(b.currency_code));
                    
                    // Render majors
                    renderMajors();
                    
                    // Render initial cycle page
                    renderCyclePage();
                    
                    // Set up cycling interval if not already running
                    if (!cycleInterval) {
                        cycleInterval = setInterval(nextCyclePage, 10000); // cycle every 10 seconds
                    }
                })
                .catch(err => console.error('Failed to load rates board:', err));
        }

        function renderMajors() {
            const majorsRow = document.getElementById('majors-row');
            majorsRow.innerHTML = '';
            
            majorRates.forEach(rate => {
                const card = document.createElement('div');
                card.className = 'glass-card rounded-2xl p-5 flex items-center justify-between border border-white/5 shadow-lg';
                
                const flagCode = rate.currency_code.substring(0, 2).toLowerCase();
                
                card.innerHTML = `
                    <div class="flex items-center gap-4">
                        <img src="https://flagcdn.com/h40/${flagCode}.png" class="h-8 w-11 rounded-lg object-cover border border-white/10" alt="${rate.currency_code}" />
                        <div>
                            <span class="text-lg font-bold text-white block">${rate.currency_code}</span>
                            <span class="text-[10px] text-gray-500">${rate.currency_name}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-lg font-bold digital-font text-emerald-400 glow-green">${parseFloat(rate.buy_rate).toFixed(2)}</div>
                        <div class="text-lg font-bold digital-font text-rose-500 glow-red">${parseFloat(rate.sell_rate).toFixed(2)}</div>
                    </div>
                `;
                majorsRow.appendChild(card);
            });
        }

        function renderCyclePage() {
            const col1 = document.getElementById('rates-col-1');
            const col2 = document.getElementById('rates-col-2');
            
            col1.innerHTML = '';
            col2.innerHTML = '';
            
            const itemsPerPage = 10;
            const startIndex = currentPage * itemsPerPage;
            const pageItems = cycleRates.slice(startIndex, startIndex + itemsPerPage);
            
            const mid = Math.ceil(pageItems.length / 2);
            
            pageItems.forEach((rate, index) => {
                const targetCol = index < mid ? col1 : col2;
                const row = document.createElement('div');
                row.className = 'glass-card flex-grow rounded-2xl px-6 py-4 grid grid-cols-[1.5fr_1fr_1fr] items-center transition-all duration-500 hover:border-emerald-500/30';
                
                const flagCode = rate.currency_code.substring(0, 2).toLowerCase();
                
                row.innerHTML = `
                    <div class="flex items-center gap-5">
                        <img src="https://flagcdn.com/h40/${flagCode}.png" class="h-8 w-11 rounded-lg object-cover shadow-lg border border-white/10" alt="${rate.currency_code}" />
                        <div>
                            <span class="text-xl font-bold text-white block">${rate.currency_code}</span>
                            <span class="text-xs text-gray-500">${rate.currency_name}</span>
                        </div>
                    </div>
                    <div class="text-right text-2xl font-bold digital-font text-emerald-400 glow-green">${parseFloat(rate.buy_rate).toFixed(2)}</div>
                    <div class="text-right text-2xl font-bold digital-font text-rose-500 glow-red">${parseFloat(rate.sell_rate).toFixed(2)}</div>
                `;
                targetCol.appendChild(row);
            });
        }

        function nextCyclePage() {
            const mainContainer = document.getElementById('rates-main');
            if (!mainContainer) return;
            
            // Fade out
            mainContainer.classList.add('opacity-0');
            
            setTimeout(() => {
                const totalPages = Math.ceil(cycleRates.length / 10);
                if (totalPages > 0) {
                    currentPage = (currentPage + 1) % totalPages;
                } else {
                    currentPage = 0;
                }
                
                renderCyclePage();
                
                // Fade in
                mainContainer.classList.remove('opacity-0');
            }, 500);
        }

        // Initial load
        fetchRates();
    </script>
</body>
</html>
