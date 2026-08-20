<x-app-layout>
    <x-slot name="title">Manual Forex Rate Board Engine</x-slot>

    <!-- Header Section -->
    <div class="glass p-8 rounded-3xl mb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <span class="text-xs font-bold text-brand-500 uppercase tracking-widest block mb-1">Operational Module</span>
                <h2 class="text-2xl font-display font-bold text-white">Manual Forex Rate & Board Engine</h2>
                <p class="text-sm text-gray-400 mt-1">Authorized staff can adjust rates below. Saved rates push instantly to calculators and branch displays.</p>
            </div>
            
            <div class="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-xl text-xs font-medium text-emerald-400">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>API Gateway Active</span>
            </div>
        </div>
    </div>

    <!-- Add Currency Section -->
    <div class="glass p-6 rounded-3xl mb-8" x-data="{ showAdd: false }">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 class="text-lg font-display font-bold text-white flex items-center gap-2">
                <span>Active Currency Pairs</span>
                <span class="text-xs px-2 py-0.5 rounded bg-brand-800/30 text-brand-400 font-mono">{{ $rates->total() }} Pairs</span>
            </h3>
            
            <div class="flex items-center gap-3">
                <!-- Search bar form -->
                <form action="{{ route('admin.rates.index') }}" method="GET" class="flex items-center gap-2">
                    <div class="relative">
                        <input 
                            type="text" 
                            name="search" 
                            value="{{ request('search') }}" 
                            placeholder="Search currency..." 
                            class="bg-white/5 border border-white/10 rounded-xl pl-3 pr-8 py-2 text-white placeholder-gray-500 outline-none focus:border-brand-500 text-xs w-48 transition-all"
                        >
                        @if(request('search'))
                            <a href="{{ route('admin.rates.index') }}" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-white" title="Clear search">&times;</a>
                        @endif
                    </div>
                    <button type="submit" class="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-medium transition-all">
                        Search
                    </button>
                </form>

                <button @click="showAdd = !showAdd" class="px-4 py-2 rounded-xl bg-brand-800 hover:bg-brand-700 text-white text-xs font-bold transition-all flex items-center gap-1.5">
                    <span x-show="!showAdd">+ Add Currency</span>
                    <span x-show="showAdd">Hide Form</span>
                </button>
            </div>
        </div>

        <!-- Add currency form container -->
        <div x-show="showAdd" x-collapse class="mt-6 border-t border-white/5 pt-6" style="display: none;">
            <form action="{{ route('admin.rates.store') }}" method="POST" class="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                @csrf
                <div>
                    <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Currency Code</label>
                    <input type="text" name="currency_code" placeholder="e.g. CNY" required maxlength="3" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-600 outline-none focus:border-brand-500 text-sm uppercase">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Currency Name</label>
                    <input type="text" name="currency_name" placeholder="e.g. Chinese Yuan" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-600 outline-none focus:border-brand-500 text-sm">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Buy Rate (KES)</label>
                    <input type="number" name="buy_rate" step="0.0001" placeholder="0.00" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-600 outline-none focus:border-brand-500 text-sm font-mono">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Sell Rate (KES)</label>
                    <input type="number" name="sell_rate" step="0.0001" placeholder="0.00" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-gray-600 outline-none focus:border-brand-500 text-sm font-mono">
                </div>
                <input type="hidden" name="change_pct" value="0.00">
                <div>
                    <button type="submit" class="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-600/10">
                        Create Currency
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Active Rates Table -->
    <div class="glass p-8 rounded-3xl mb-8">
        <form action="{{ route('admin.rates.update') }}" method="POST" class="space-y-6">
            @csrf

            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                        <tr class="border-b border-white/10 text-gray-400 font-medium">
                            <th class="pb-3 px-2">Currency</th>
                            <th class="pb-3 px-2">Current Buy</th>
                            <th class="pb-3 px-2">Current Sell</th>
                            <th class="pb-3 px-2">New Buy Rate</th>
                            <th class="pb-3 px-2">New Sell Rate</th>
                            <th class="pb-3 px-2 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                        @forelse($rates as $rate)
                            @php
                                $flagMap = [
                                    'USD' => 'us', 'GBP' => 'gb', 'EUR' => 'eu', 'AED' => 'ae', 'SAR' => 'sa',
                                    'CAD' => 'ca', 'AUD' => 'au', 'CHF' => 'ch', 'CNY' => 'cn', 'INR' => 'in',
                                    'JPY' => 'jp', 'ZAR' => 'za', 'UGX' => 'ug', 'TZS' => 'tz', 'RWF' => 'rw',
                                    'QAR' => 'qa', 'KWD' => 'kw', 'BHD' => 'bh', 'OMR' => 'om', 'SEK' => 'se',
                                    'NOK' => 'no', 'DKK' => 'dk', 'SGD' => 'sg', 'HKD' => 'hk', 'MYR' => 'my',
                                    'THB' => 'th', 'ETB' => 'et', 'SOS' => 'so', 'ZMW' => 'zm', 'NGN' => 'ng',
                                    'GHS' => 'gh', 'EGP' => 'eg', 'TRY' => 'tr', 'NZD' => 'nz', 'KES' => 'ke'
                                ];
                                $code = strtoupper(trim($rate->currency_code));
                                $flagCode = $flagMap[$code] ?? strtolower(substr($code, 0, 2));
                            @endphp
                            <tr class="hover:bg-white/[0.01] transition-colors group">
                                <td class="py-4 px-2 flex items-center gap-3">
                                    <!-- Flag loader -->
                                    <img src="https://flagcdn.com/h40/{{ $flagCode }}.png" onerror="this.onerror=null;this.src='https://flagcdn.com/h40/un.png';" class="h-6 w-9 rounded object-cover shadow border border-white/10" alt="{{ $rate->currency_code }}" />
                                    <div>
                                        <span class="font-bold text-white block">{{ $rate->currency_code }}</span>
                                        <span class="text-xs text-gray-400">{{ $rate->currency_name }}</span>
                                    </div>
                                </td>
                                <td class="py-4 px-2 font-mono text-gray-400">{{ number_format($rate->buy_rate, 4) }}</td>
                                <td class="py-4 px-2 font-mono text-gray-400">{{ number_format($rate->sell_rate, 4) }}</td>
                                <td class="py-4 px-2">
                                    <input 
                                        type="number" 
                                        name="rates[{{ $rate->id }}][buy_rate]" 
                                        step="0.0001" 
                                        value="{{ $rate->buy_rate }}" 
                                        class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono w-36 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-sm"
                                    >
                                </td>
                                <td class="py-4 px-2">
                                    <input 
                                        type="number" 
                                        name="rates[{{ $rate->id }}][sell_rate]" 
                                        step="0.0001" 
                                        value="{{ $rate->sell_rate }}" 
                                        class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono w-36 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-sm"
                                    >
                                </td>
                                <td class="py-4 px-2 text-right">
                                    <button 
                                        type="submit" 
                                        form="delete-rate-{{ $rate->id }}" 
                                        class="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-all inline-flex items-center justify-center group-hover:border group-hover:border-white/10" 
                                        title="Delete {{ $rate->currency_code }}"
                                        onclick="return confirm('Are you sure you want to delete {{ $rate->currency_code }} ({{ $rate->currency_name }})? This will remove it from all live calculators and display boards.')"
                                    >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="6" class="py-8 text-center text-gray-500">
                                    No currency pairs found. Click "+ Add Currency" above to create one.
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            <!-- Pagination links -->
            <div class="mt-6">
                {{ $rates->links() }}
            </div>

            <!-- Optional Audit Trail Log Field -->
            <div class="border-t border-white/10 pt-6">
                <div class="max-w-xl">
                    <label for="change_reason" class="block text-sm font-semibold text-white mb-2">
                        Reason for Adjustment <span class="text-xs text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <textarea 
                        name="change_reason" 
                        id="change_reason" 
                        rows="2" 
                        placeholder="e.g. Adjusted to align with central market rates after afternoon session volatility."
                        class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-sm"
                    ></textarea>
                    <p class="text-xs text-gray-500 mt-1.5">Optional reason for adjustment recorded in the CEO's executive audit log.</p>
                </div>
            </div>

            <div class="flex items-center gap-4 pt-2">
                <button 
                    type="submit" 
                    class="px-6 py-3 rounded-2xl bg-brand-800 hover:bg-brand-700 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-brand-800/25 hover:shadow-brand-800/35 hover:-translate-y-0.5"
                >
                    Publish Rates Instantly
                </button>
                <a href="{{ route('admin.dashboard') }}" class="text-sm font-semibold text-gray-400 hover:text-white transition-all">Cancel</a>
            </div>
        </form>

        <!-- Hidden delete forms outside the rates update form to prevent nested form issues -->
        @foreach($rates as $rate)
            <form id="delete-rate-{{ $rate->id }}" action="{{ route('admin.rates.destroy', $rate) }}" method="POST" class="hidden">
                @csrf
                @method('DELETE')
            </form>
        @endforeach
    </div>
</x-app-layout>
