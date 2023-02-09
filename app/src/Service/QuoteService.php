<?php
namespace App\Service;

class QuoteService
{

    //TODO: Add random factor
    public function getRandomQuote(): array
    {
        $quote = [];

        $quote = [
            'author' => 'Trump Donald',
            'text' => 'So anyways I started blasting'
        ];

        return $quote;
    }
}