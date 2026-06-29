<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\AuditLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class BranchController extends Controller
{
    public function index(): View
    {
        $branches = Branch::ordered()->get();
        return view('admin.branches.index', compact('branches'));
    }

    public function create(): View
    {
        return view('admin.branches.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'area' => 'required|string|max:255',
            'address' => 'nullable|string',
            'hours' => 'required|string|max:255',
            'phone' => 'nullable|string|max:255',
            'map_url' => 'nullable|url',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $branch = Branch::create($validated);

        AuditLog::log('created_branch', Branch::class, $branch->id, null, $branch->toArray(), 'Created branch ' . $branch->name);

        return redirect()->route('admin.branches.index')->with('success', 'Branch created successfully.');
    }

    public function edit(Branch $branch): View
    {
        return view('admin.branches.edit', compact('branch'));
    }

    public function update(Request $request, Branch $branch): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'area' => 'required|string|max:255',
            'address' => 'nullable|string',
            'hours' => 'required|string|max:255',
            'phone' => 'nullable|string|max:255',
            'map_url' => 'nullable|url',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $oldValues = $branch->toArray();
        $branch->update($validated);

        AuditLog::log('updated_branch', Branch::class, $branch->id, $oldValues, $branch->toArray(), 'Updated branch ' . $branch->name);

        return redirect()->route('admin.branches.index')->with('success', 'Branch updated successfully.');
    }

    public function destroy(Branch $branch): RedirectResponse
    {
        $oldValues = $branch->toArray();
        $branch->delete();

        AuditLog::log('deleted_branch', Branch::class, $branch->id, $oldValues, null, 'Deleted branch ' . $branch->name);

        return redirect()->route('admin.branches.index')->with('success', 'Branch deleted successfully.');
    }
}
