<?php declare(strict_types=1);

namespace App\Controller\Visitor;

use App\Loader\BlogLoader;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BlogController extends AbstractController
{
    public function __construct(
        private readonly BlogLoader $blogLoader
    )
    {
    }

    #[Route('/blog', name: 'visitor.blog.listing')]
    public function work(): Response
    {
        $blogCollections = $this->blogLoader->getBlogCollections();

        return $this->render('visitor/index/blog/index.html.twig', [
            'page' => [
                'blogCollections' => $blogCollections
            ]
        ]);
    }
}