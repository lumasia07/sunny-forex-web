<x-app-layout>
    <x-slot name="title">SunnyRemit CMS Overview</x-slot>

    <!-- Header Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="glass p-6 rounded-2xl flex flex-col justify-between">
            <span class="text-sm font-medium text-gray-400">Total Currency Pairs</span>
            <div class="flex items-baseline justify-between mt-4">
                <span class="text-3xl font-display font-bold text-white">{{ $ratesCount }}</span>
                <span class="text-xs text-brand-400 font-medium">KES Base</span>
            </div>
        </div>
        <div class="glass p-6 rounded-2xl flex flex-col justify-between">
            <span class="text-sm font-medium text-gray-400">Active Branches</span>
            <div class="flex items-baseline justify-between mt-4">
                <span class="text-3xl font-display font-bold text-white">{{ $branchesCount }}</span>
                <span class="text-xs text-emerald-400 font-medium">Nairobi</span>
            </div>
        </div>
        <div class="glass p-6 rounded-2xl flex flex-col justify-between">
            <span class="text-sm font-medium text-gray-400">Blog Posts</span>
            <div class="flex items-baseline justify-between mt-4">
                <span class="text-3xl font-display font-bold text-white">{{ $blogsCount }}</span>
                <span class="text-xs text-brand-400 font-medium">Published</span>
            </div>
        </div>
        <div class="glass p-6 rounded-2xl flex flex-col justify-between">
            <span class="text-sm font-medium text-gray-400">Faq Items</span>
            <div class="flex items-baseline justify-between mt-4">
                <span class="text-3xl font-display font-bold text-white">{{ $faqsCount }}</span>
                <span class="text-xs text-gray-400 font-medium">Live</span>
            </div>
        </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Quick actions -->
        <div class="glass p-6 rounded-2xl lg:col-span-1">
            <h3 class="text-lg font-display font-bold text-white mb-6">CMS Content Panels</h3>
            <div class="flex flex-col gap-4">
                <a href="{{ route('admin.rates.index') }}" class="glass p-4 rounded-xl flex items-center justify-between hover:bg-brand-800/10 hover:border-brand-800/30 transition-all group">
                    <div>
                        <h4 class="text-sm font-semibold text-white">Forex Rate Engine</h4>
                        <p class="text-xs text-gray-400 mt-1">Manual live KES rates adjustment</p>
                    </div>
                    <span class="text-gray-500 group-hover:text-brand-400 transition-all">&rarr;</span>
                </a>
                <a href="{{ route('admin.branches.index') }}" class="glass p-4 rounded-xl flex items-center justify-between hover:bg-brand-800/10 hover:border-brand-800/30 transition-all group">
                    <div>
                        <h4 class="text-sm font-semibold text-white">Branch Management</h4>
                        <p class="text-xs text-gray-400 mt-1">Configure hours, maps and contacts</p>
                    </div>
                    <span class="text-gray-500 group-hover:text-brand-400 transition-all">&rarr;</span>
                </a>
                <a href="{{ route('admin.blog.index') }}" class="glass p-4 rounded-xl flex items-center justify-between hover:bg-brand-800/10 hover:border-brand-800/30 transition-all group">
                    <div>
                        <h4 class="text-sm font-semibold text-white">Blog Publisher</h4>
                        <p class="text-xs text-gray-400 mt-1">Write news and market insights</p>
                    </div>
                    <span class="text-gray-500 group-hover:text-brand-400 transition-all">&rarr;</span>
                </a>
                <a href="{{ route('admin.faqs.index') }}" class="glass p-4 rounded-xl flex items-center justify-between hover:bg-brand-800/10 hover:border-brand-800/30 transition-all group">
                    <div>
                        <h4 class="text-sm font-semibold text-white">FAQs Hub</h4>
                        <p class="text-xs text-gray-400 mt-1">Update FAQ list and sorting</p>
                    </div>
                    <span class="text-gray-500 group-hover:text-brand-400 transition-all">&rarr;</span>
                </a>
                <a href="{{ route('admin.documents.index') }}" class="glass p-4 rounded-xl flex items-center justify-between hover:bg-brand-800/10 hover:border-brand-800/30 transition-all group">
                    <div>
                        <h4 class="text-sm font-semibold text-white">Compliance & KYC Documents</h4>
                        <p class="text-xs text-gray-400 mt-1">Upload and manage KYC forms, AML and regulatory policies</p>
                    </div>
                    <span class="text-gray-500 group-hover:text-brand-400 transition-all">&rarr;</span>
                </a>
            </div>
        </div>

        <!-- Recent Audit Activity Logs -->
        <div class="glass p-6 rounded-2xl lg:col-span-2">
            <h3 class="text-lg font-display font-bold text-white mb-6">Recent IT / Audit Activity</h3>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead>
                        <tr class="border-b border-white/10 text-gray-400">
                            <th class="pb-3 font-medium">User</th>
                            <th class="pb-3 font-medium">Action</th>
                            <th class="pb-3 font-medium">IP Address</th>
                            <th class="pb-3 font-medium text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                        @forelse($recentLogs as $log)
                            <tr>
                                <td class="py-3.5 font-medium text-white">{{ $log->user?->name ?? 'System' }}</td>
                                <td class="py-3.5 text-gray-300">
                                    <span class="text-xs px-2 py-0.5 rounded bg-brand-800/20 text-brand-400 border border-brand-800/40">
                                        {{ $log->action }}
                                    </span>
                                    <span class="text-xs text-gray-400 ml-1.5">{{ Str::limit($log->description, 50) }}</span>
                                </td>
                                <td class="py-3.5 text-gray-400 font-mono text-xs">{{ $log->ip_address }}</td>
                                <td class="py-3.5 text-gray-500 text-right text-xs">{{ $log->created_at->diffForHumans() }}</td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="4" class="py-6 text-center text-gray-500">No activity logs recorded.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>
