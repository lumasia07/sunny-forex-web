<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SeoMeta;
use App\Models\AuditLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class SeoController extends Controller
{
    public function index(): View
    {
        $seos = SeoMeta::all();
        return view('admin.seo.index', compact('seos'));
    }

    public function edit(SeoMeta $seo): View
    {
        return view('admin.seo.edit', compact('seo'));
    }

    public function update(Request $request, SeoMeta $seo): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'canonical_url' => 'nullable|url',
            'og_image' => 'nullable|url',
            'json_ld_schema' => 'nullable|string',
        ]);

        if ($validated['json_ld_schema']) {
            $json = json_decode($validated['json_ld_schema'], true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                return back()->withErrors(['json_ld_schema' => 'Invalid JSON format.'])->withInput();
            }
            $validated['json_ld_schema'] = $json;
        } else {
            $validated['json_ld_schema'] = null;
        }

        $oldValues = $seo->toArray();
        $seo->update($validated);

        AuditLog::log('updated_seo_meta', SeoMeta::class, $seo->id, $oldValues, $seo->toArray(), 'Updated SEO metadata for page: ' . $seo->page_slug);

        return redirect()->route('admin.seo.index')->with('success', 'SEO metadata updated successfully.');
    }
}
