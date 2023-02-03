<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    #[Route('/', name: 'frontend_index')]
    public function index(): Response
    {
        return $this->render('pages/index.html.twig');
    }

    #[Route('/about', name: 'frontend_about')]
    public function about(): Response
    {
        return $this->render('pages/about.html.twig');
    }

    #[Route('/projects', name: 'frontend_projects')]
    public function projects(): Response
    {
        return $this->render('pages/projects.html.twig');
    }

    #[Route('/blogs', name: 'frontend_blogs')]
    public function blogs(): Response
    {
        return $this->render('pages/blogs.html.twig');
    }
}