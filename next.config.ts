import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '/**',
            },
        ],
        dangerouslyAllowSVG: true, // habilita SVGs remotos (cuidado!)
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // recomendado para mitigar riscos
    },
};

export default nextConfig;
