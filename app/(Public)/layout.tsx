import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'TechVerse',
    description: 'Seu portal de tecnologia com um toque retrofuturista.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen container flex flex-col justify-between mx-auto px-4 sm:px-6 md:px-8 py-8">
            {children}
        </div>
    );
}
