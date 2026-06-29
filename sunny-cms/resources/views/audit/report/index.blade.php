<x-app-layout>
    <x-slot name="title">Audit Exporter & Report Builder</x-slot>

    <div class="glass p-8 rounded-3xl max-w-3xl mb-8">
        <div class="mb-8">
            <a href="{{ route('audit.dashboard') }}" class="text-xs text-brand-400 hover:underline">&larr; Back to Dashboard</a>
            <h2 class="text-2xl font-display font-bold text-white mt-2">Executive Audit Exporter</h2>
            <p class="text-sm text-gray-400 mt-1">Configure date parameters and actions below to generate a branded PDF report carrying the official seal.</p>
        </div>

        <form action="{{ route('audit.report.print') }}" method="GET" target="_blank" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Start Date</label>
                    <input 
                        type="date" 
                        name="start_date" 
                        class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-brand-500 text-sm font-mono"
                    >
                </div>
                <div>
                    <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">End Date</label>
                    <input 
                        type="date" 
                        name="end_date" 
                        value="{{ now()->toDateString() }}"
                        class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-brand-500 text-sm font-mono"
                    >
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Filter Action Type</label>
                <select name="action_type" class="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-brand-500 text-sm">
                    <option value="all" class="bg-dark-900">All Actions</option>
                    @foreach($actions as $action)
                        <option value="{{ $action }}" class="bg-dark-900">{{ $action }}</option>
                    @endforeach
                </select>
            </div>

            <div class="bg-brand-800/10 border border-brand-800/20 p-4 rounded-2xl text-xs text-gray-400 leading-relaxed">
                <strong class="text-white block mb-1">💡 Export Guidance:</strong>
                Clicking generate will open the report layout in a new tab and automatically prompt your browser's PDF options. Choose "Save as PDF" and select "Background graphics" in the options for optimal formatting.
            </div>

            <div class="flex items-center gap-4">
                <button 
                    type="submit" 
                    class="px-6 py-3 rounded-2xl bg-brand-800 hover:bg-brand-700 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-brand-800/25 flex items-center gap-2"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Generate PDF Report
                </button>
                <a href="{{ route('audit.dashboard') }}" class="text-sm font-semibold text-gray-400">Cancel</a>
            </div>
        </form>
    </div>
</x-app-layout>
