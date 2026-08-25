<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Branch;
use App\Models\Document;
use App\Models\Faq;
use App\Models\ForexRate;
use App\Models\PartnerLogo;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class ApiController extends Controller
{
    public function rates(): JsonResponse
    {
        $rates = ForexRate::active()->get();
        return response()->json($rates);
    }

    public function branches(): JsonResponse
    {
        $branches = Branch::active()->ordered()->get();
        return response()->json($branches);
    }

    public function blog(): JsonResponse
    {
        $posts = BlogPost::published()->orderBy('published_at', 'desc')->get();
        return response()->json($posts);
    }

    public function blogPost(string $slug): JsonResponse
    {
        $post = BlogPost::published()->where('slug', $slug)->firstOrFail();
        return response()->json($post);
    }

    public function faqs(): JsonResponse
    {
        $faqs = Faq::active()->ordered()->get();
        return response()->json($faqs);
    }

    public function documents(): JsonResponse
    {
        $documents = Document::active()->ordered()->get()->map(function ($doc) {
            return [
                'id' => $doc->id,
                'title' => $doc->title,
                'slug' => $doc->slug,
                'category' => $doc->category,
                'description' => $doc->description,
                'file_name' => $doc->file_name,
                'file_size' => $doc->file_size,
                'file_type' => $doc->file_type,
                'download_url' => $doc->download_url,
                'updated_at' => $doc->updated_at,
            ];
        });
        return response()->json($documents);
    }

    public function documentBySlug(string $slug): JsonResponse
    {
        $doc = Document::active()->where('slug', $slug)->firstOrFail();
        return response()->json([
            'id' => $doc->id,
            'title' => $doc->title,
            'slug' => $doc->slug,
            'category' => $doc->category,
            'description' => $doc->description,
            'file_name' => $doc->file_name,
            'file_size' => $doc->file_size,
            'file_type' => $doc->file_type,
            'download_url' => $doc->download_url,
            'updated_at' => $doc->updated_at,
        ]);
    }

    public function partners(): JsonResponse
    {
        $partners = PartnerLogo::active()->ordered()->get();
        return response()->json($partners);
    }

    public function services(): JsonResponse
    {
        $services = Service::active()->ordered()->get();
        return response()->json($services);
    }

    public function seo(string $slug): JsonResponse
    {
        $seo = \App\Models\SeoMeta::where('page_slug', $slug)->first();
        if (!$seo) {
            return response()->json([
                'page_slug' => $slug,
                'title' => 'SunnyRemit — Premier Forex Bureau & Money Remittance Nairobi Kenya',
                'description' => 'Licensed and regulated by the Central Bank of Kenya. Real-time forex exchange and instant remittance across 8 physical branches in Nairobi.',
            ]);
        }
        return response()->json($seo);
    }

    public function kioskRates(): \Illuminate\View\View
    {
        $rates = ForexRate::active()->get();
        return view('display.rates-board', compact('rates'));
    }
}
