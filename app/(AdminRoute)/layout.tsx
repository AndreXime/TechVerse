import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'TechVerse | Admin',
    description: 'Seu portal de tecnologia com um toque retrofuturista.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return children;
}
