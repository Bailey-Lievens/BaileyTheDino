<?php

namespace App\Controller\Visitor;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BlogController extends AbstractController
{
    #[Route('/blog', name: 'visitor.blog.listing')]
    public function work(): Response
    {
        return $this->render('visitor/index/blog/index.html.twig');
    }
}