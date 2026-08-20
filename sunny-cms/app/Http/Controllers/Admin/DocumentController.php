<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Document;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\View\View;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DocumentController extends Controller
{
    public function index(Request $request): View
    {
        $query = Document::query();

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('file_name', 'like', "%{$search}%");
            });
        }

        $documents = $query->orderBy('sort_order', 'asc')->orderBy('created_at', 'desc')->get();

        // Statistics
        $totalDocs = Document::count();
        $amlDocs = Document::where('category', 'AML & Compliance')->count();
        $kycDocs = Document::where('category', 'KYC & Customer')->count();
        $activeDocs = Document::where('is_active', true)->count();

        $categories = [
            'AML & Compliance',
            'KYC & Customer',
            'Legal & Terms',
            'Corporate & Forms',
            'Audit & Regulatory',
        ];

        return view('admin.documents.index', compact(
            'documents',
            'totalDocs',
            'amlDocs',
            'kycDocs',
            'activeDocs',
            'categories'
        ));
    }

    public function create(): View
    {
        $categories = [
            'AML & Compliance',
            'KYC & Customer',
            'Legal & Terms',
            'Corporate & Forms',
            'Audit & Regulatory',
        ];
        return view('admin.documents.create', compact('categories'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'document_file' => 'required|file|mimes:pdf,docx,doc,png,jpg,jpeg|max:20480', // up to 20MB
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $file = $request->file('document_file');
        $originalName = $file->getClientOriginalName();
        $extension = strtolower($file->getClientOriginalExtension());
        $fileSizeBytes = $file->getSize();
        $formattedSize = Document::formatBytes($fileSizeBytes);

        // Store file in public disk under documents directory
        $storedPath = $file->store('documents', 'public');

        $slug = Str::slug($validated['title']);
        $count = Document::where('slug', 'like', "{$slug}%")->count();
        if ($count > 0) {
            $slug = "{$slug}-" . ($count + 1);
        }

        $document = Document::create([
            'title' => $validated['title'],
            'slug' => $slug,
            'category' => $validated['category'],
            'description' => $validated['description'] ?? null,
            'file_path' => 'storage/' . $storedPath,
            'file_name' => $originalName,
            'file_size' => $formattedSize,
            'file_type' => $extension,
            'is_active' => $request->boolean('is_active', true),
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        AuditLog::log(
            'uploaded_document',
            Document::class,
            $document->id,
            null,
            $document->toArray(),
            "Uploaded document: {$document->title} ({$document->category})"
        );

        return redirect()->route('admin.documents.index')->with('success', "Document '{$document->title}' uploaded successfully.");
    }

    public function edit(Document $document): View
    {
        $categories = [
            'AML & Compliance',
            'KYC & Customer',
            'Legal & Terms',
            'Corporate & Forms',
            'Audit & Regulatory',
        ];
        return view('admin.documents.edit', compact('document', 'categories'));
    }

    public function update(Request $request, Document $document): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'document_file' => 'nullable|file|mimes:pdf,docx,doc,png,jpg,jpeg|max:20480',
            'is_active' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $oldValues = $document->toArray();

        $updateData = [
            'title' => $validated['title'],
            'category' => $validated['category'],
            'description' => $validated['description'] ?? null,
            'is_active' => $request->boolean('is_active', true),
            'sort_order' => $validated['sort_order'] ?? 0,
        ];

        // Handle replacement file upload if present
        if ($request->hasFile('document_file')) {
            $file = $request->file('document_file');
            $originalName = $file->getClientOriginalName();
            $extension = strtolower($file->getClientOriginalExtension());
            $fileSizeBytes = $file->getSize();
            $formattedSize = Document::formatBytes($fileSizeBytes);

            // Delete old file if it resides in storage
            if (str_starts_with($document->file_path, 'storage/')) {
                $oldStoragePath = Str::after($document->file_path, 'storage/');
                if (Storage::disk('public')->exists($oldStoragePath)) {
                    Storage::disk('public')->delete($oldStoragePath);
                }
            }

            $storedPath = $file->store('documents', 'public');
            $updateData['file_path'] = 'storage/' . $storedPath;
            $updateData['file_name'] = $originalName;
            $updateData['file_size'] = $formattedSize;
            $updateData['file_type'] = $extension;
        }

        $document->update($updateData);

        AuditLog::log(
            'updated_document',
            Document::class,
            $document->id,
            $oldValues,
            $document->toArray(),
            "Updated document: {$document->title}"
        );

        return redirect()->route('admin.documents.index')->with('success', "Document '{$document->title}' updated successfully.");
    }

    public function destroy(Document $document): RedirectResponse
    {
        $oldValues = $document->toArray();
        $title = $document->title;

        // Delete physical file from storage if applicable
        if (str_starts_with($document->file_path, 'storage/')) {
            $storagePath = Str::after($document->file_path, 'storage/');
            if (Storage::disk('public')->exists($storagePath)) {
                Storage::disk('public')->delete($storagePath);
            }
        }

        $document->delete();

        AuditLog::log(
            'deleted_document',
            Document::class,
            $document->id,
            $oldValues,
            null,
            "Deleted document: {$title}"
        );

        return redirect()->route('admin.documents.index')->with('success', "Document '{$title}' deleted successfully.");
    }

    public function download(Document $document): StreamedResponse|RedirectResponse
    {
        if (str_starts_with($document->file_path, 'storage/')) {
            $relativePath = Str::after($document->file_path, 'storage/');
            if (Storage::disk('public')->exists($relativePath)) {
                return Storage::disk('public')->download($relativePath, $document->file_name);
            }
        }

        return redirect($document->download_url);
    }
}
