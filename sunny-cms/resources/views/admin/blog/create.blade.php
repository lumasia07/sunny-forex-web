<x-app-layout>
    <x-slot name="title">Write Article</x-slot>
    <div class="glass p-8 rounded-3xl">
        <h2 class="text-2xl font-display font-bold text-white mb-6">Write New Article</h2>
        <form action="{{ route('admin.blog.store') }}" method="POST" class="space-y-4">
            @csrf
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-400 mb-1">Title</label>
                    <input type="text" name="title" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-400 mb-1">Category</label>
                    <input type="text" name="category" placeholder="Tips & Guides" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500">
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-400 mb-1">Read Time (e.g. 5 min read)</label>
                    <input type="text" name="read_time" value="5 min read" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-400 mb-1">Featured Image Path/URL</label>
                    <input type="text" name="image" placeholder="https://images.unsplash.com/..." class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500">
                </div>
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-400 mb-1">Short Excerpt</label>
                <textarea name="excerpt" rows="2" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500"></textarea>
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-400 mb-1">Content (HTML allowed)</label>
                <textarea name="content" rows="10" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500 font-mono text-sm"></textarea>
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-400 mb-1">Status</label>
                <select name="status" class="bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500">
                    <option value="draft" class="bg-dark-900">Draft</option>
                    <option value="published" class="bg-dark-900">Published</option>
                </select>
            </div>
            <div class="flex items-center gap-4 pt-4">
                <button type="submit" class="px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-bold text-sm">Save Post</button>
                <a href="{{ route('admin.blog.index') }}" class="text-sm text-gray-400">Cancel</a>
            </div>
        </form>
    </div>
</x-app-layout>
