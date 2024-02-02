<?php declare(strict_types=1);

namespace App\Controller\Visitor;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MainController extends AbstractController
{
    #[Route('/', name: 'visitor.index')]
    public function index(): Response
    {
        return $this->render('visitor/index/index.html.twig');
    }
}