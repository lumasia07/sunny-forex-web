<x-app-layout>
    <x-slot name="title">System Security Action Logs</x-slot>

    <div class="glass p-8 rounded-3xl">
        <div class="mb-6">
            <a href="{{ route('audit.dashboard') }}" class="text-xs text-brand-400 hover:underline">&larr; Back to Dashboard</a>
            <h2 class="text-2xl font-display font-bold text-white mt-2">Security & Activity Log</h2>
            <p class="text-sm text-gray-400 mt-1">Full system logging of actions performed inside the CMS admin panels.</p>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm whitespace-nowrap">
                <thead>
                    <tr class="border-b border-white/10 text-gray-400 font-medium">
                        <th class="pb-3 px-2">Time</th>
                        <th class="pb-3 px-2">User</th>
                        <th class="pb-3 px-2">Action</th>
                        <th class="pb-3 px-2">Model Type</th>
                        <th class="pb-3 px-2">IP Address</th>
                        <th class="pb-3 px-2">Description</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5 text-gray-300">
                    @forelse($logs as $log)
                        <tr class="hover:bg-white/[0.01] transition-colors">
                            <td class="py-4 px-2 text-xs text-gray-500 font-mono">{{ $log->created_at->format('Y-m-d H:i:s') }}</td>
                            <td class="py-4 px-2 font-medium text-white">{{ $log->user?->name ?? 'System' }}</td>
                            <td class="py-4 px-2">
                                <span class="text-xs px-2 py-0.5 rounded bg-brand-800/20 text-brand-400 border border-brand-800/40">
                                    {{ $log->action }}
                                </span>
                            </td>
                            <td class="py-4 px-2 text-xs text-gray-400 font-mono">{{ class_basename($log->model_type) }}</td>
                            <td class="py-4 px-2 text-xs text-gray-400 font-mono">{{ $log->ip_address }}</td>
                            <td class="py-4 px-2 text-xs text-gray-300" title="{{ $log->description }}">
                                {{ Str::limit($log->description, 80) }}
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="py-6 text-center text-gray-500">No logs captured.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="mt-6 text-white">
            {{ $logs->links() }}
        </div>
    </div>
</x-app-layout>
