<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\AuditLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;

class BlogController extends Controller
{
    public function index(): View
    {
        $posts = BlogPost::orderBy('created_at', 'desc')->get();
        return view('admin.blog.index', compact('posts'));
    }

    public function create(): View
    {
        return view('admin.blog.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'category' => 'required|string|max:255',
            'read_time' => 'required|string|max:255',
            'status' => 'required|in:draft,published',
            'image' => 'nullable|string|max:255',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['author_id'] = auth()->id();
        $validated['published_at'] = $validated['status'] === 'published' ? now() : null;

        $post = BlogPost::create($validated);

        AuditLog::log('created_blog_post', BlogPost::class, $post->id, null, $post->toArray(), 'Created blog post ' . $post->title);

        return redirect()->route('admin.blog.index')->with('success', 'Blog post created successfully.');
    }

    public function edit(BlogPost $blog): View
    {
        $post = $blog;
        return view('admin.blog.edit', compact('post'));
    }

    public function update(Request $request, BlogPost $blog): RedirectResponse
    {
        $post = $blog;
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'category' => 'required|string|max:255',
            'read_time' => 'required|string|max:255',
            'status' => 'required|in:draft,published',
            'image' => 'nullable|string|max:255',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        if ($validated['status'] === 'published' && !$post->published_at) {
            $validated['published_at'] = now();
        }

        $oldValues = $post->toArray();
        $post->update($validated);

        AuditLog::log('updated_blog_post', BlogPost::class, $post->id, $oldValues, $post->toArray(), 'Updated blog post ' . $post->title);

        return redirect()->route('admin.blog.index')->with('success', 'Blog post updated successfully.');
    }

    public function destroy(BlogPost $blog): RedirectResponse
    {
        $post = $blog;
        $oldValues = $post->toArray();
        $post->delete();

        AuditLog::log('deleted_blog_post', BlogPost::class, $post->id, $oldValues, null, 'Deleted blog post ' . $post->title);

        return redirect()->route('admin.blog.index')->with('success', 'Blog post deleted successfully.');
    }
}
