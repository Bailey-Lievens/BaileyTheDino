<?php

namespace App\Controller\Visitor;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class WorkController extends AbstractController
{
    #[Route('/work', name: 'visitor.work.listing')]
    public function work(): Response
    {
        return $this->render('visitor/index/work/index.html.twig');
    }
}