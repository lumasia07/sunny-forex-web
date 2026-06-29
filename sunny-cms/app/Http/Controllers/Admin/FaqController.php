<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\AuditLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class FaqController extends Controller
{
    public function index(): View
    {
        $faqs = Faq::ordered()->get();
        return view('admin.faqs.index', compact('faqs'));
    }

    public function create(): View
    {
        return view('admin.faqs.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
            'category' => 'required|string|max:255',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $faq = Faq::create($validated);

        AuditLog::log('created_faq', Faq::class, $faq->id, null, $faq->toArray(), 'Created FAQ');

        return redirect()->route('admin.faqs.index')->with('success', 'FAQ created successfully.');
    }

    public function edit(Faq $faq): View
    {
        return view('admin.faqs.edit', compact('faq'));
    }

    public function update(Request $request, Faq $faq): RedirectResponse
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
            'category' => 'required|string|max:255',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $oldValues = $faq->toArray();
        $faq->update($validated);

        AuditLog::log('updated_faq', Faq::class, $faq->id, $oldValues, $faq->toArray(), 'Updated FAQ');

        return redirect()->route('admin.faqs.index')->with('success', 'FAQ updated successfully.');
    }

    public function destroy(Faq $faq): RedirectResponse
    {
        $oldValues = $faq->toArray();
        $faq->delete();

        AuditLog::log('deleted_faq', Faq::class, $faq->id, $oldValues, null, 'Deleted FAQ');

        return redirect()->route('admin.faqs.index')->with('success', 'FAQ deleted successfully.');
    }
}
