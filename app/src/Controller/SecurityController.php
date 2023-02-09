<?php

namespace App\Controller;

use App\Service\ImageService;
use App\Service\QuoteService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    public function __construct(
        private QuoteService $quoteService,
        private ImageService $imageService
    ){}

    #[Route(path: '/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        $pageData = [
            'error' => $authenticationUtils->getLastAuthenticationError(),
            'quote' => $this->quoteService->getRandomQuote(),
            'image' => $this->imageService->getRandomImage()
        ];

        return $this->render('admin/login.html.twig', $pageData);
    }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
