import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // Lista de limbi suportate
    locales: ['ro', 'en'],
    // Limba implicită dacă nu este detectată alta
    defaultLocale: 'ro'
});

export const config = {
    // Aplică middleware-ul pe toate rutele, ignorând fișierele statice, API-urile și Vercel internals
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};