<?php
namespace App\Service;

class ImageService
{

    //TODO: Add random factor
    public function getRandomImage(): array
    {
        $image = [];

        $image = [
            'link' => 'https://images.unsplash.com/photo-1513608827986-eb374a75fa5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
            'alt' => 'Big tower'
        ];

        return $image;
    }
}