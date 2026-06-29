<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Branch;
use App\Models\Faq;
use App\Models\ForexRate;
use App\Models\PartnerLogo;
use App\Models\SeoMeta;
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

    public function seo(string $page): JsonResponse
    {
        $seo = SeoMeta::where('page_slug', $page)->first();
        if (!$seo) {
            return response()->json([
                'page_slug' => $page,
                'title' => 'SunnyRemit',
                'description' => 'SunnyRemit Currency Exchange',
                'json_ld_schema' => null
            ]);
        }
        return response()->json($seo);
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

    public function kioskRates(): \Illuminate\View\View
    {
        $rates = ForexRate::active()->get();
        return view('display.rates-board', compact('rates'));
    }
}
