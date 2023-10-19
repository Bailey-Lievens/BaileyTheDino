<?php declare(strict_types=1);

namespace App\Controller\Visitor;

use App\Loader\WorkLoader;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class WorkController extends AbstractController
{
    public function __construct(
        private readonly WorkLoader $workLoader
    )
    {
    }

    #[Route('/work', name: 'visitor.work.listing')]
    public function work(): Response
    {
        $workCollections = $this->workLoader->getWorkCollections();

        return $this->render('visitor/index/work/index.html.twig', [
            'page' => [
                'workCollections' => $workCollections
            ]
        ]);
    }
}