<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[IsGranted('ROLE_ADMIN')]
#[Route('/admin')]
class AdminController extends AbstractController
{
    #[Route('/', name: 'backend_index')]
    public function index(): Response
    {
        return $this->render('admin/index.html.twig');
    }

    #[Route('/project', name: 'backend_project')]
    public function project(): Response
    {
        return $this->render('admin/project/index.html.twig');
    }

    #[Route('/blog', name: 'backend_blog')]
    public function blog(): Response
    {
        return $this->render('admin/blog/index.html.twig');
    }

    #[Route('/quote', name: 'backend_quote')]
    public function quote(): Response
    {
        return $this->render('admin/quote/index.html.twig');
    }

    #[Route('/category', name: 'backend_category')]
    public function category(): Response
    {
        return $this->render('admin/category/index.html.twig');
    }

    #[Route('/account', name: 'backend_account')]
    public function account(): Response
    {
        return $this->render('admin/account/index.html.twig');
    }
}