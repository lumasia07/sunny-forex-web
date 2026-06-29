<x-app-layout>
    <x-slot name="title">Edit Branch</x-slot>
    <div class="glass p-8 rounded-3xl max-w-2xl">
        <h2 class="text-2xl font-display font-bold text-white mb-6">Modify Branch Info</h2>
        <form action="{{ route('admin.branches.update', $branch) }}" method="POST" class="space-y-4">
            @csrf @method('PUT')
            <div>
                <label class="block text-sm font-semibold text-gray-400 mb-1">Branch Name</label>
                <input type="text" name="name" value="{{ $branch->name }}" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500">
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-400 mb-1">Area / Neighborhood</label>
                <input type="text" name="area" value="{{ $branch->area }}" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500">
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-400 mb-1">Address Detail</label>
                <textarea name="address" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500">{{ $branch->address }}</textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-400 mb-1">Hours</label>
                    <input type="text" name="hours" value="{{ $branch->hours }}" required class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-400 mb-1">Phone</label>
                    <input type="text" name="phone" value="{{ $branch->phone }}" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500">
                </div>
            </div>
            <div>
                <label class="block text-sm font-semibold text-gray-400 mb-1">Google Maps Link</label>
                <input type="url" name="map_url" value="{{ $branch->map_url }}" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-brand-500">
            </div>
            <div class="flex items-center gap-6">
                <div>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="is_active" value="1" {{ $branch->is_active ? 'checked' : '' }} class="rounded border-white/10 bg-white/5 text-brand-800">
                        <span class="text-sm font-semibold text-gray-300">Is Active</span>
                    </label>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-400 mb-1">Sort Order</label>
                    <input type="number" name="sort_order" value="{{ $branch->sort_order }}" class="w-24 bg-white/5 border border-white/10 rounded-xl p-2 text-white outline-none focus:border-brand-500">
                </div>
            </div>
            <div class="flex items-center gap-4 pt-4">
                <button type="submit" class="px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-bold text-sm">Save Changes</button>
                <a href="{{ route('admin.branches.index') }}" class="text-sm text-gray-400">Cancel</a>
            </div>
        </form>
    </div>
</x-app-layout>
