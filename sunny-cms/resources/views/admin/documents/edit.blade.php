<x-app-layout>
    <x-slot name="title">Edit Document</x-slot>

    <div class="max-w-3xl mx-auto space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-2xl font-display font-bold text-white tracking-tight">Edit Document</h2>
                <p class="text-sm text-gray-400 mt-1">Update details or upload a replacement version of {{ $document->title }}.</p>
            </div>
            <a href="{{ route('admin.documents.index') }}" class="text-xs text-gray-400 hover:text-white transition-colors">
                &larr; Back to Documents
            </a>
        </div>

        <form action="{{ route('admin.documents.update', $document) }}" method="POST" enctype="multipart/form-data" class="glass p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            @csrf
            @method('PUT')

            <!-- Document Title -->
            <div>
                <label for="title" class="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Document Title <span class="text-rose-500">*</span></label>
                <input type="text" 
                       name="title" 
                       id="title" 
                       value="{{ old('title', $document->title) }}" 
                       required 
                       class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-all" />
                @error('title')
                    <p class="text-xs text-rose-400 mt-1">{{ $message }}</p>
                @enderror
            </div>

            <!-- Category & Sort Order -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="category" class="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Category <span class="text-rose-500">*</span></label>
                    <select name="category" 
                            id="category" 
                            required 
                            class="w-full bg-[#141416] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-all">
                        @foreach($categories as $cat)
                            <option value="{{ $cat }}" {{ old('category', $document->category) === $cat ? 'selected' : '' }}>{{ $cat }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label for="sort_order" class="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Display Sort Order</label>
                    <input type="number" 
                           name="sort_order" 
                           id="sort_order" 
                           value="{{ old('sort_order', $document->sort_order) }}" 
                           class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-all" />
                </div>
            </div>

            <!-- Description -->
            <div>
                <label for="description" class="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Document Summary / Description</label>
                <textarea name="description" 
                          id="description" 
                          rows="3" 
                          class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-all">{{ old('description', $document->description) }}</textarea>
            </div>

            <!-- Current File & Replace Option -->
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Current Active File</label>
                <div class="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 mb-3">
                    <div class="flex items-center gap-3">
                        <span class="text-xs uppercase font-mono px-2 py-1 rounded bg-brand-800/40 text-brand-300 font-bold">{{ $document->file_type }}</span>
                        <div>
                            <p class="text-sm font-semibold text-white font-mono">{{ $document->file_name }}</p>
                            <span class="text-xs text-gray-400">{{ $document->file_size }} · Last modified {{ $document->updated_at->diffForHumans() }}</span>
                        </div>
                    </div>
                    <a href="{{ route('admin.documents.download', $document) }}" target="_blank" class="text-xs font-bold text-brand-400 hover:text-brand-300">Preview &rarr;</a>
                </div>

                <label class="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Upload Replacement File (Optional)</label>
                <div class="border-2 border-dashed border-white/15 rounded-2xl p-5 text-center hover:border-brand-500/50 bg-white/[0.02] transition-colors relative">
                    <input type="file" 
                           name="document_file" 
                           id="document_file" 
                           accept=".pdf,.docx,.doc,.png,.jpg,.jpeg"
                           class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                           onchange="document.getElementById('replace-file-chosen').innerText = this.files[0] ? this.files[0].name + ' (' + (this.files[0].size/1024).toFixed(1) + ' KB)' : 'No replacement file chosen'" />
                    <p class="text-xs font-medium text-gray-300">Click to choose a replacement file (leave empty to keep current file)</p>
                    <p id="replace-file-chosen" class="text-xs font-mono font-bold text-amber-400 mt-2">Keeping current file</p>
                </div>
            </div>

            <!-- Active Status Toggle -->
            <div class="flex items-center gap-3 pt-2">
                <input type="checkbox" 
                       name="is_active" 
                       id="is_active" 
                       value="1" 
                       {{ old('is_active', $document->is_active) ? 'checked' : '' }} 
                       class="w-4 h-4 rounded bg-white/5 border-white/10 text-brand-600 focus:ring-brand-500 focus:ring-offset-gray-900" />
                <label for="is_active" class="text-sm text-gray-300 font-medium">Document is Active (Visible on portal)</label>
            </div>

            <!-- Submit Button -->
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <a href="{{ route('admin.documents.index') }}" class="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white transition-colors">Cancel</a>
                <button type="submit" class="px-6 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white text-xs font-bold shadow-lg shadow-brand-800/25 transition-all">
                    Save Changes
                </button>
            </div>
        </form>
    </div>
</x-app-layout>
