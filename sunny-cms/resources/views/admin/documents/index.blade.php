<x-app-layout>
    <x-slot name="title">Compliance & KYC Documents</x-slot>
    
    <div class="space-y-6">
        <!-- Top Stats Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="glass p-5 rounded-2xl border border-white/10 flex items-center justify-between">
                <div>
                    <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Documents</span>
                    <h3 class="text-2xl font-bold font-display text-white mt-1">{{ $totalDocs }}</h3>
                </div>
                <div class="w-11 h-11 rounded-xl bg-brand-800/30 border border-brand-800/40 flex items-center justify-center text-brand-400">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                </div>
            </div>

            <div class="glass p-5 rounded-2xl border border-white/10 flex items-center justify-between">
                <div>
                    <span class="text-xs font-semibold uppercase tracking-wider text-amber-400">AML & Policies</span>
                    <h3 class="text-2xl font-bold font-display text-white mt-1">{{ $amlDocs }}</h3>
                </div>
                <div class="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                </div>
            </div>

            <div class="glass p-5 rounded-2xl border border-white/10 flex items-center justify-between">
                <div>
                    <span class="text-xs font-semibold uppercase tracking-wider text-emerald-400">KYC & Customer</span>
                    <h3 class="text-2xl font-bold font-display text-white mt-1">{{ $kycDocs }}</h3>
                </div>
                <div class="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </div>
            </div>

            <div class="glass p-5 rounded-2xl border border-white/10 flex items-center justify-between">
                <div>
                    <span class="text-xs font-semibold uppercase tracking-wider text-sky-400">Active Public</span>
                    <h3 class="text-2xl font-bold font-display text-white mt-1">{{ $activeDocs }}</h3>
                </div>
                <div class="w-11 h-11 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                </div>
            </div>
        </div>

        <!-- Main Card Container -->
        <div class="glass p-6 lg:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            
            <!-- Header & Action Controls -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 class="text-2xl font-display font-bold text-white tracking-tight">Compliance, KYC & Legal Documents</h2>
                    <p class="text-sm text-gray-400 mt-1">Upload, update, or remove regulatory files (KYC forms, AML policies, terms & licenses).</p>
                </div>
                <div class="flex items-center gap-3">
                    <a href="{{ route('admin.documents.create') }}" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-lg shadow-brand-800/25">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        <span>Upload Document</span>
                    </a>
                </div>
            </div>

            <!-- Category Filter Tabs -->
            <div class="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
                <a href="{{ route('admin.documents.index') }}" 
                   class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all {{ !request('category') ? 'bg-brand-800 text-white' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10' }}">
                    All Categories
                </a>
                @foreach($categories as $cat)
                    <a href="{{ route('admin.documents.index', ['category' => $cat]) }}" 
                       class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all {{ request('category') === $cat ? 'bg-brand-800 text-white' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10' }}">
                        {{ $cat }}
                    </a>
                @endforeach
            </div>

            <!-- Documents Table -->
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead>
                        <tr class="border-b border-white/10 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            <th class="pb-3 px-3">Document Title & Details</th>
                            <th class="pb-3 px-3">Category</th>
                            <th class="pb-3 px-3">File Specs</th>
                            <th class="pb-3 px-3">Status</th>
                            <th class="pb-3 px-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5 text-gray-300">
                        @forelse($documents as $doc)
                            <tr class="hover:bg-white/[0.02] transition-colors group">
                                <!-- Title & Desc -->
                                <td class="py-4 px-3 max-w-sm">
                                    <div class="flex items-start gap-3">
                                        <div class="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <span class="font-bold text-white block group-hover:text-brand-300 transition-colors">{{ $doc->title }}</span>
                                            @if($doc->description)
                                                <p class="text-xs text-gray-400 font-light mt-0.5 line-clamp-1">{{ $doc->description }}</p>
                                            @endif
                                        </div>
                                    </div>
                                </td>

                                <!-- Category Badge -->
                                <td class="py-4 px-3 whitespace-nowrap">
                                    @php
                                        $catColor = match($doc->category) {
                                            'AML & Compliance' => 'bg-amber-500/15 text-amber-300 border-amber-500/30',
                                            'KYC & Customer' => 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
                                            'Legal & Terms' => 'bg-sky-500/15 text-sky-300 border-sky-500/30',
                                            'Corporate & Forms' => 'bg-purple-500/15 text-purple-300 border-purple-500/30',
                                            default => 'bg-white/10 text-gray-300 border-white/15'
                                        };
                                    @endphp
                                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border {{ $catColor }}">
                                        {{ $doc->category }}
                                    </span>
                                </td>

                                <!-- File Specs -->
                                <td class="py-4 px-3 whitespace-nowrap">
                                    <div class="flex items-center gap-2">
                                        <span class="text-xs font-mono uppercase bg-white/10 px-1.5 py-0.5 rounded text-gray-300">{{ $doc->file_type }}</span>
                                        <span class="text-xs text-gray-400">{{ $doc->file_size ?: '—' }}</span>
                                    </div>
                                    <span class="text-[11px] text-gray-500 block truncate max-w-[140px] mt-0.5 font-mono">{{ $doc->file_name }}</span>
                                </td>

                                <!-- Status -->
                                <td class="py-4 px-3 whitespace-nowrap">
                                    @if($doc->is_active)
                                        <span class="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                            <span>Active</span>
                                        </span>
                                    @else
                                        <span class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
                                            <span class="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                                            <span>Inactive</span>
                                        </span>
                                    @endif
                                </td>

                                <!-- Actions -->
                                <td class="py-4 px-3 text-right whitespace-nowrap">
                                    <div class="flex items-center justify-end gap-2">
                                        <!-- View / Download -->
                                        <a href="{{ route('admin.documents.download', $doc) }}" 
                                           target="_blank" 
                                           class="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-all"
                                           title="Download / View Document">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                            </svg>
                                        </a>

                                        <!-- Edit -->
                                        <a href="{{ route('admin.documents.edit', $doc) }}" 
                                           class="p-1.5 rounded-lg bg-white/5 hover:bg-brand-800/30 text-gray-300 hover:text-brand-300 transition-all"
                                           title="Edit Details & Replace File">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                            </svg>
                                        </a>

                                        <!-- Delete -->
                                        <form action="{{ route('admin.documents.destroy', $doc) }}" method="POST" class="inline" onsubmit="return confirm('Are you sure you want to delete this document? This action cannot be undone.')">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-all" title="Delete Document">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                </svg>
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="5" class="py-12 text-center text-gray-500">
                                    <svg class="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                    <p class="text-base font-semibold text-gray-400">No documents found</p>
                                    <p class="text-xs text-gray-500 mt-1">Upload your first compliance or KYC document using the button above.</p>
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>
