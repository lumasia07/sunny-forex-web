<x-app-layout>
    <x-slot name="title">Branches Management</x-slot>
    <div class="glass p-8 rounded-3xl">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h2 class="text-2xl font-display font-bold text-white">Nairobi Branches</h2>
                <p class="text-sm text-gray-400">Manage operational hours, phone numbers, and maps URL.</p>
            </div>
            <a href="{{ route('admin.branches.create') }}" class="px-4 py-2 rounded-xl bg-brand-800 hover:bg-brand-700 text-white text-xs font-bold transition-all">Add New Branch</a>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm whitespace-nowrap">
                <thead>
                    <tr class="border-b border-white/10 text-gray-400">
                        <th class="pb-3 px-2">Name</th>
                        <th class="pb-3 px-2">Area</th>
                        <th class="pb-3 px-2">Hours</th>
                        <th class="pb-3 px-2">Status</th>
                        <th class="pb-3 px-2 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5 text-gray-300">
                    @foreach($branches as $branch)
                        <tr>
                            <td class="py-4 px-2 font-semibold text-white">{{ $branch->name }}</td>
                            <td class="py-4 px-2 text-gray-400">{{ $branch->area }}</td>
                            <td class="py-4 px-2 text-xs font-mono">{{ $branch->hours }}</td>
                            <td class="py-4 px-2">
                                <span class="text-xs px-2 py-0.5 rounded {{ $branch->is_active ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-gray-400' }}">
                                    {{ $branch->is_active ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td class="py-4 px-2 text-right">
                                <a href="{{ route('admin.branches.edit', $branch) }}" class="text-xs text-brand-400 hover:text-brand-300 mr-3">Edit</a>
                                <form action="{{ route('admin.branches.destroy', $branch) }}" method="POST" class="inline">
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
