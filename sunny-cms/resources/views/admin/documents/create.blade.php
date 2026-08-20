<x-app-layout>
    <x-slot name="title">Upload Document</x-slot>

    <div class="max-w-3xl mx-auto space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-2xl font-display font-bold text-white tracking-tight">Upload Regulatory / KYC Document</h2>
                <p class="text-sm text-gray-400 mt-1">Add KYC forms, AML policies, guidelines or legal disclosure PDF files.</p>
            </div>
            <a href="{{ route('admin.documents.index') }}" class="text-xs text-gray-400 hover:text-white transition-colors">
                &larr; Back to Documents
            </a>
        </div>

        <form action="{{ route('admin.documents.store') }}" method="POST" enctype="multipart/form-data" class="glass p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            @csrf

            <!-- Document Title -->
            <div>
                <label for="title" class="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Document Title <span class="text-rose-500">*</span></label>
                <input type="text" 
                       name="title" 
                       id="title" 
                       value="{{ old('title') }}" 
                       required 
                       placeholder="e.g. Customer Due Diligence (KYC) Declaration Form"
                       class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all" />
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
                            <option value="{{ $cat }}" {{ old('category') === $cat ? 'selected' : '' }}>{{ $cat }}</option>
                        @endforeach
                    </select>
                    @error('category')
                        <p class="text-xs text-rose-400 mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="sort_order" class="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Display Sort Order</label>
                    <input type="number" 
                           name="sort_order" 
                           id="sort_order" 
                           value="{{ old('sort_order', 0) }}" 
                           class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-all" />
                </div>
            </div>

            <!-- Description -->
            <div>
                <label for="description" class="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Document Summary / Description</label>
                <textarea name="description" 
                          id="description" 
                          rows="3" 
                          placeholder="Brief overview of what this policy, customer form or regulatory guideline covers..."
                          class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-500 transition-all">{{ old('description') }}</textarea>
                @error('description')
                    <p class="text-xs text-rose-400 mt-1">{{ $message }}</p>
                @enderror
            </div>

            <!-- File Upload -->
            <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Upload File (.PDF, .DOCX, .PNG, .JPG) <span class="text-rose-500">*</span></label>
                <div class="border-2 border-dashed border-white/15 rounded-2xl p-6 text-center hover:border-brand-500/50 bg-white/[0.02] transition-colors relative">
                    <input type="file" 
                           name="document_file" 
                           id="document_file" 
                           required 
                           accept=".pdf,.docx,.doc,.png,.jpg,.jpeg"
                           class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                           onchange="document.getElementById('file-chosen').innerText = this.files[0] ? this.files[0].name + ' (' + (this.files[0].size/1024).toFixed(1) + ' KB)' : 'No file chosen'" />
                    <svg class="w-10 h-10 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p class="text-sm font-semibold text-white">Click or drag file to upload</p>
                    <p class="text-xs text-gray-400 mt-1">Supports PDF, DOCX, DOC, PNG, JPG (Max 20MB)</p>
                    <p id="file-chosen" class="text-xs font-mono font-bold text-brand-400 mt-3">No file selected yet</p>
                </div>
                @error('document_file')
                    <p class="text-xs text-rose-400 mt-1">{{ $message }}</p>
                @enderror
            </div>

            <!-- Active Status Toggle -->
            <div class="flex items-center gap-3 pt-2">
                <input type="checkbox" 
                       name="is_active" 
                       id="is_active" 
                       value="1" 
                       checked 
                       class="w-4 h-4 rounded bg-white/5 border-white/10 text-brand-600 focus:ring-brand-500 focus:ring-offset-gray-900" />
                <label for="is_active" class="text-sm text-gray-300 font-medium">Publish document immediately (Active)</label>
            </div>

            <!-- Submit Button -->
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <a href="{{ route('admin.documents.index') }}" class="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white transition-colors">Cancel</a>
                <button type="submit" class="px-6 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white text-xs font-bold shadow-lg shadow-brand-800/25 transition-all">
                    Upload & Save Document
                </button>
            </div>
        </form>
    </div>
</x-app-layout>
