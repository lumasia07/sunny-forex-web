<x-app-layout>
    <x-slot name="title">Add FAQ</x-slot>
    <div class="glass p-8 rounded-3xl max-w-2xl">
        <h2 class="text-2xl font-display font-bold text-white mb-6">Create FAQ</h2>
        <form action="{{ route('admin.faqs.store') }}" method="POST" class="space-y-4">
            @csrf
            <div>
                <label class="block text-sm font-semibold text-gray-400 mb-1">Question</label>
                <input type="text" name="question" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500">
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-400 mb-1">Category</label>
                <input type="text" name="category" value="General" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500">
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-400 mb-1">Answer</label>
                <textarea name="answer" rows="4" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-400 mb-1">Sort Order</label>
                    <input type="number" name="sort_order" value="0" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500">
                </div>
                <div class="flex items-end pb-3">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="is_active" value="1" checked class="rounded border-white/10 bg-white/5 text-brand-800">
                        <span class="text-sm font-semibold text-gray-300">Is Active</span>
                    </label>
                </div>
            </div>
            <div class="flex items-center gap-4 pt-4">
                <button type="submit" class="px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-bold text-sm">Save FAQ</button>
                <a href="{{ route('admin.faqs.index') }}" class="text-sm text-gray-400">Cancel</a>
            </div>
        </form>
    </div>
</x-app-layout>
