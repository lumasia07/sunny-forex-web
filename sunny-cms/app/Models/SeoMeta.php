<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoMeta extends Model
{
    protected $table = 'seo_meta';

    protected $fillable = [
        'page_slug',
        'title',
        'description',
        'og_image',
        'canonical_url',
        'json_ld_schema',
    ];

    protected $casts = [
        'json_ld_schema' => 'array',
    ];
}
