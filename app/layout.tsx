import type { Metadata } from 'next';
import './globals.css';
import { Inter, Chakra_Petch } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });
const chakraPetch = Chakra_Petch({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
    title: 'TechVerse | Modern Retro',
    description: 'Seu portal de tecnologia com um toque retrofuturista.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR" className={`${inter} ${chakraPetch}`}>
            <body className="antialiased min-h-screen">
                <div className="h-screen container flex flex-col justify-between mx-auto px-4 sm:px-6 md:px-8 py-8">
                    {children}
                </div>
            </body>
        </html>
    );
}
