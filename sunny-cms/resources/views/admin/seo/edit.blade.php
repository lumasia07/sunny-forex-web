<x-app-layout>
    <x-slot name="title">Configure SEO - {{ ucfirst($seo->page_slug) }}</x-slot>
    <div class="glass p-8 rounded-3xl max-w-3xl">
        <h2 class="text-2xl font-display font-bold text-white mb-6">SEO Schema & Meta Settings: {{ ucfirst($seo->page_slug) }}</h2>
        <form action="{{ route('admin.seo.update', $seo) }}" method="POST" class="space-y-4">
            @csrf @method('PUT')
            <div>
                <label class="block text-sm font-semibold text-gray-400 mb-1">Meta Title</label>
                <input type="text" name="title" value="{{ $seo->title }}" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500">
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-400 mb-1">Meta Description</label>
                <textarea name="description" rows="3" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500">{{ $seo->description }}</textarea>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-400 mb-1">Canonical URL</label>
                    <input type="url" name="canonical_url" value="{{ $seo->canonical_url }}" placeholder="https://sunnyremit.co.ke/" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-400 mb-1">OG Share Image URL</label>
                    <input type="url" name="og_image" value="{{ $seo->og_image }}" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500">
                </div>
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-400 mb-1">JSON-LD Structured Schema Markup (JSON format)</label>
                <textarea name="json_ld_schema" rows="8" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white font-mono text-xs outline-none focus:border-brand-500">{{ json_encode($seo->json_ld_schema, JSON_PRETTY_PRINT) }}</textarea>
                <p class="text-xs text-gray-500 mt-1">Structured JSON schema loaded on headers for Google Financial & Local Search robots.</p>
            </div>
            <div class="flex items-center gap-4 pt-4">
                <button type="submit" class="px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-bold text-sm">Save SEO & Schema</button>
                <a href="{{ route('admin.seo.index') }}" class="text-sm text-gray-400">Cancel</a>
            </div>
        </form>
    </div>
</x-app-layout>
