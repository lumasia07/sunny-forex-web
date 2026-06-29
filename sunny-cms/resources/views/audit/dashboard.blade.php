<x-app-layout>
    <x-slot name="title">CEO Executive Audit Dashboard</x-slot>

    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <span class="text-xs font-bold text-brand-500 uppercase tracking-widest block mb-1">Executive Administration</span>
            <h2 class="text-2xl font-display font-bold text-white">CEO Executive Audit Dashboard</h2>
            <p class="text-sm text-gray-400 mt-1">Real-time oversight of top-layer operations, marketing publishing, and manual forex rate change history.</p>
        </div>
        
        <div class="flex items-center gap-3">
            <a href="{{ route('audit.report') }}" class="px-4 py-2 rounded-xl bg-brand-800 hover:bg-brand-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-brand-800/20">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Export Reports
            </a>
            <div class="flex items-center gap-2 bg-brand-800/20 border border-brand-800/40 px-3.5 py-1.5 rounded-xl text-xs font-medium text-brand-400">
                <span>Audit Level: Level 3 (CEO)</span>
            </div>
        </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="glass p-6 rounded-2xl">
            <span class="text-xs font-medium text-gray-400 uppercase tracking-wider block">Total System Log Actions</span>
            <span class="text-3xl font-display font-bold text-white block mt-2">{{ $totalLogsCount }}</span>
            <p class="text-xs text-gray-500 mt-1.5">Includes all creation, modification, and deletion logs.</p>
        </div>
        <div class="glass p-6 rounded-2xl">
            <span class="text-xs font-medium text-gray-400 uppercase tracking-wider block">Manual Forex Rate Changes</span>
            <span class="text-3xl font-display font-bold text-white block mt-2">{{ $rateUpdatesCount }}</span>
            <p class="text-xs text-gray-500 mt-1.5">Total manual currency board updates logged to audit trail.</p>
        </div>
        <div class="glass p-6 rounded-2xl">
            <span class="text-xs font-medium text-gray-400 uppercase tracking-wider block">Active CMS Staff Users</span>
            <span class="text-3xl font-display font-bold text-white block mt-2">{{ $staffCount }}</span>
            <p class="text-xs text-gray-500 mt-1.5">Count of administrators and editors with write credentials.</p>
        </div>
    </div>

    <!-- Grid: History & Log timeline -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Rate Change History Audit Trail -->
        <div class="glass p-6 rounded-2xl">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-base font-display font-bold text-white">Manual Rate Adjustment Trail</h3>
                <a href="{{ route('audit.rates') }}" class="text-xs font-medium text-brand-400 hover:underline">View All &rarr;</a>
            </div>
            
            <div class="flow-root">
                <ul role="list" class="-mb-8">
                    @forelse($recentRateChanges as $history)
                        <li>
                            <div class="relative pb-8">
                                @if(!$loop->last)
                                    <span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-white/5" aria-hidden="true"></span>
                                @endif
                                <div class="relative flex space-x-3">
                                    <div>
                                        <span class="h-8 w-8 rounded-full bg-brand-800/20 text-brand-400 border border-brand-800/40 flex items-center justify-center text-xs font-mono">
                                            {{ $history->forexRate?->currency_code }}
                                        </span>
                                    </div>
                                    <div class="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                                        <div>
                                            <p class="text-xs text-gray-400">
                                                Adjusted by <span class="font-medium text-white">{{ $history->changedByUser?->name ?? 'System' }}</span>
                                            </p>
                                            <p class="text-xs text-gray-300 mt-1">
                                                Buy: <span class="font-mono text-white">{{ number_format($history->old_buy, 2) }} &rarr; {{ number_format($history->new_buy, 2) }}</span> | 
                                                Sell: <span class="font-mono text-white">{{ number_format($history->old_sell, 2) }} &rarr; {{ number_format($history->new_sell, 2) }}</span>
                                            </p>
                                            @if($history->change_reason)
                                                <p class="text-xs text-gray-500 italic mt-1">"{{ $history->change_reason }}"</p>
                                            @endif
                                        </div>
                                        <div class="text-right text-xs whitespace-nowrap text-gray-500">
                                            <time datetime="{{ $history->changed_at }}">{{ $history->changed_at->diffForHumans() }}</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    @empty
                        <li class="py-4 text-center text-xs text-gray-500">No manual rate updates recorded.</li>
                    @endforelse
                </ul>
            </div>
        </div>

        <!-- System Logs Activity -->
        <div class="glass p-6 rounded-2xl">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-base font-display font-bold text-white">Security & Action Logs</h3>
                <a href="{{ route('audit.activity') }}" class="text-xs font-medium text-brand-400 hover:underline">View All &rarr;</a>
            </div>

            <div class="flow-root">
                <ul role="list" class="-mb-8">
                    @forelse($recentLogs as $log)
                        <li>
                            <div class="relative pb-8">
                                @if(!$loop->last)
                                    <span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-white/5" aria-hidden="true"></span>
                                @endif
                                <div class="relative flex space-x-3">
                                    <div>
                                        <span class="h-8 w-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-xs text-gray-400">
                                            A
                                        </span>
                                    </div>
                                    <div class="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                                        <div>
                                            <p class="text-xs text-gray-300">
                                                <span class="font-semibold text-white">{{ $log->user?->name ?? 'System' }}</span>
                                                <span class="px-1.5 py-0.5 rounded bg-white/5 text-gray-400 text-[10px] uppercase font-mono ml-1.5">{{ $log->action }}</span>
                                            </p>
                                            <p class="text-xs text-gray-400 mt-1">{{ $log->description }}</p>
                                            <p class="text-[10px] text-gray-500 font-mono mt-0.5">IP: {{ $log->ip_address }}</p>
                                        </div>
                                        <div class="text-right text-xs whitespace-nowrap text-gray-500">
                                            <time>{{ $log->created_at->diffForHumans() }}</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    @empty
                        <li class="py-4 text-center text-xs text-gray-500">No security logs recorded.</li>
                    @endforelse
                </ul>
            </div>
        </div>
    </div>
</x-app-layout>
