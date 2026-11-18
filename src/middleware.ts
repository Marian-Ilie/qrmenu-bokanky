import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // Lista de limbi suportate
    locales: ['ro', 'en'],
    // Limba implicită dacă nu este detectată alta
    defaultLocale: 'ro'
});

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};