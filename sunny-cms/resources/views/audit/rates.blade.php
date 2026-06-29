<x-app-layout>
    <x-slot name="title">Rate Adjustment Logs</x-slot>

    <div class="glass p-8 rounded-3xl">
        <div class="mb-6">
            <a href="{{ route('audit.dashboard') }}" class="text-xs text-brand-400 hover:underline">&larr; Back to Dashboard</a>
            <h2 class="text-2xl font-display font-bold text-white mt-2">Manual Rate Adjustment Audit Trail</h2>
            <p class="text-sm text-gray-400 mt-1">Full immutable history of every manual forex rate change.</p>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm whitespace-nowrap">
                <thead>
                    <tr class="border-b border-white/10 text-gray-400 font-medium">
                        <th class="pb-3 px-2">Time</th>
                        <th class="pb-3 px-2">Currency</th>
                        <th class="pb-3 px-2">Buy Adjustment</th>
                        <th class="pb-3 px-2">Sell Adjustment</th>
                        <th class="pb-3 px-2">Adjusted By</th>
                        <th class="pb-3 px-2">Reason</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5 text-gray-300">
                    @forelse($rateHistories as $history)
                        <tr class="hover:bg-white/[0.01] transition-colors">
                            <td class="py-4 px-2 text-xs text-gray-500 font-mono">{{ $history->changed_at->format('Y-m-d H:i:s') }}</td>
                            <td class="py-4 px-2 flex items-center gap-2">
                                <span class="text-xl">{{ $history->forexRate?->flag_emoji }}</span>
                                <span class="font-bold text-white">{{ $history->forexRate?->currency_code }}</span>
                            </td>
                            <td class="py-4 px-2 font-mono">
                                {{ number_format($history->old_buy, 4) }} &rarr; 
                                <span class="text-white font-bold">{{ number_format($history->new_buy, 4) }}</span>
                            </td>
                            <td class="py-4 px-2 font-mono">
                                {{ number_format($history->old_sell, 4) }} &rarr; 
                                <span class="text-white font-bold">{{ number_format($history->new_sell, 4) }}</span>
                            </td>
                            <td class="py-4 px-2 font-medium text-white">{{ $history->changedByUser?->name ?? 'System' }}</td>
                            <td class="py-4 px-2 text-xs text-gray-400 italic max-w-xs truncate" title="{{ $history->change_reason }}">
                                "{{ $history->change_reason }}"
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="py-6 text-center text-gray-500">No adjustment history logged.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="mt-6 text-white">
            {{ $rateHistories->links() }}
        </div>
    </div>
</x-app-layout>
