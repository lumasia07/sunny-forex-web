<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SunnyRemit_AuditReport_{{ now()->format('Ymd') }}</title>
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Outfit:wght@600;800&display=swap" rel="stylesheet">
    
    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        display: ['Outfit', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    
    <style>
        body {
            font-family: 'Inter', sans-serif;
            color: #1f2937;
            background-color: #ffffff;
        }
        @media print {
            .no-print {
                display: none;
            }
            body {
                background-color: #ffffff;
            }
        }
    </style>
</head>
<body class="p-8 max-w-5xl mx-auto">

    <!-- Print control banner -->
    <div class="no-print bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl mb-8 flex items-center justify-between">
        <div class="text-xs text-amber-800">
            <strong class="block mb-0.5">Print Preview Mode</strong>
            Press print to export this branded layout to a PDF. Ensure background graphics are enabled.
        </div>
        <button onclick="window.print()" class="bg-[#7A1220] hover:bg-[#5C0D18] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md">
            Print / Save to PDF
        </button>
    </div>

    <!-- Branded PDF Header -->
    <header class="flex items-center justify-between border-b-2 border-[#7A1220] pb-6 mb-8">
        <div>
            <img src="/logo-red.png" alt="SunnyRemit Logo" class="h-10 w-auto object-contain" />
            <p class="text-[10px] text-gray-500 uppercase tracking-widest mt-2 font-semibold">Security Operations & Compliance</p>
        </div>
        <div class="text-right">
            <h2 class="text-xl font-bold font-display text-[#7A1220]">Audit Log Summary</h2>
            <p class="text-xs text-gray-500 mt-0.5">Exported on {{ now()->format('Y-m-d H:i:s') }}</p>
        </div>
    </header>

    <!-- Report parameters summary table -->
    <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8 grid grid-cols-3 gap-6 text-sm">
        <div>
            <span class="text-xs text-gray-400 uppercase tracking-wider block font-semibold">Start Limit</span>
            <span class="font-mono mt-1 block font-bold text-gray-700">{{ $startDate }}</span>
        </div>
        <div>
            <span class="text-xs text-gray-400 uppercase tracking-wider block font-semibold">End Limit</span>
            <span class="font-mono mt-1 block font-bold text-gray-700">{{ $endDate }}</span>
        </div>
        <div>
            <span class="text-xs text-gray-400 uppercase tracking-wider block font-semibold">Filtered Action</span>
            <span class="mt-1 block font-bold text-gray-700 uppercase"><span class="px-2 py-0.5 rounded bg-gray-200 text-xs">{{ $selectedAction }}</span></span>
        </div>
    </div>

    <!-- Logs Table -->
    <table class="w-full text-left text-sm border-collapse">
        <thead>
            <tr class="border-b border-gray-300 text-gray-500 font-bold">
                <th class="py-3 px-2">Timestamp</th>
                <th class="py-3 px-2">User</th>
                <th class="py-3 px-2">Action</th>
                <th class="py-3 px-2">IP Address</th>
                <th class="py-3 px-2">Description</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 text-gray-700 font-light">
            @forelse($logs as $log)
                <tr>
                    <td class="py-4 px-2 font-mono text-xs text-gray-500">{{ $log->created_at->format('Y-m-d H:i:s') }}</td>
                    <td class="py-4 px-2 font-semibold text-gray-900">{{ $log->user?->name ?? 'System' }}</td>
                    <td class="py-4 px-2">
                        <span class="text-xs px-2 py-0.5 rounded bg-[#7A1220]/10 text-[#7A1220] border border-[#7A1220]/20 uppercase font-mono">
                            {{ $log->action }}
                        </span>
                    </td>
                    <td class="py-4 px-2 font-mono text-xs text-gray-500">{{ $log->ip_address }}</td>
                    <td class="py-4 px-2 text-xs leading-relaxed max-w-sm text-gray-600">{{ $log->description }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" class="py-12 text-center text-gray-400">No logs found matching specified criteria.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <!-- Signature Block / Seal -->
    <div class="mt-16 pt-8 border-t border-gray-200 grid grid-cols-2 gap-12 text-sm text-gray-500">
        <div>
            <p class="font-bold text-gray-700">Authorized Signature</p>
            <div class="h-16 border-b border-gray-200 mb-2"></div>
            <p class="text-xs">SunnyRemit Executive Compliance Officer</p>
        </div>
        <div class="text-right flex flex-col items-end">
            <p class="font-bold text-gray-700">Official Seal</p>
            <div class="w-20 h-20 rounded-full border-4 border-dashed border-[#7A1220]/20 flex items-center justify-center text-[10px] uppercase font-bold text-[#7A1220]/30 mt-2 font-display select-none">
                Verified Log
            </div>
        </div>
    </div>

    <!-- Auto print prompt -->
    <script>
        window.onload = function() {
            setTimeout(function() {
                window.print();
            }, 500);
        };
    </script>
</body>
</html>
