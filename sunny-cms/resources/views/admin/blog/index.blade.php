<x-app-layout>
    <x-slot name="title">Blog Publisher</x-slot>
    <div class="glass p-8 rounded-3xl">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h2 class="text-2xl font-display font-bold text-white">News & Insights</h2>
                <p class="text-sm text-gray-400">Write, schedule, and publish blog content safely.</p>
            </div>
            <a href="{{ route('admin.blog.create') }}" class="px-4 py-2 rounded-xl bg-brand-800 hover:bg-brand-700 text-white text-xs font-bold transition-all">Write Article</a>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm whitespace-nowrap">
                <thead>
                    <tr class="border-b border-white/10 text-gray-400">
                        <th class="pb-3 px-2">Title</th>
                        <th class="pb-3 px-2">Category</th>
                        <th class="pb-3 px-2">Status</th>
                        <th class="pb-3 px-2 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5 text-gray-300">
                    @foreach($posts as $post)
                        <tr>
                            <td class="py-4 px-2 font-semibold text-white truncate max-w-xs">{{ $post->title }}</td>
                            <td class="py-4 px-2 text-gray-400">{{ $post->category }}</td>
                            <td class="py-4 px-2">
                                <span class="text-xs px-2 py-0.5 rounded {{ $post->status === 'published' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400' }}">
                                    {{ ucfirst($post->status) }}
                                </span>
                            </td>
                            <td class="py-4 px-2 text-right">
                                <a href="{{ route('admin.blog.edit', $post) }}" class="text-xs text-brand-400 hover:text-brand-300 mr-3">Edit</a>
                                <form action="{{ route('admin.blog.destroy', $post) }}" method="POST" class="inline">
                                    @csrf @method('DELETE')
                                    <button type="submit" onclick="return confirm('Are you sure?')" class="text-xs text-rose-500 hover:text-rose-400">Delete</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</x-app-layout>
