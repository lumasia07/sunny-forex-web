<x-app-layout>
    <x-slot name="title">Technical SEO Manager</x-slot>
    <div class="glass p-8 rounded-3xl">
        <h2 class="text-2xl font-display font-bold text-white mb-6">Technical & On-Page SEO</h2>
        <p class="text-sm text-gray-400 mb-6">Inject structured JSON-LD schemas and canonical links per landing page to scale organic transfer rankings.</p>
        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm whitespace-nowrap">
                <thead>
                    <tr class="border-b border-white/10 text-gray-400">
                        <th class="pb-3 px-2">Page Slug</th>
                        <th class="pb-3 px-2">Meta Title</th>
                        <th class="pb-3 px-2">Schema Type</th>
                        <th class="pb-3 px-2 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5 text-gray-300">
                    @foreach($seos as $seo)
                        <tr>
                            <td class="py-4 px-2 font-mono text-xs uppercase text-brand-400">{{ $seo->page_slug }}</td>
                            <td class="py-4 px-2 text-white font-medium truncate max-w-xs">{{ $seo->title }}</td>
                            <td class="py-4 px-2 text-xs text-gray-400 font-mono">{{ $seo->json_ld_schema['@type'] ?? 'N/A' }}</td>
                            <td class="py-4 px-2 text-right">
                                <a href="{{ route('admin.seo.edit', $seo) }}" class="text-xs text-brand-400 hover:text-brand-300">Configure SEO & Schema</a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</x-app-layout>
