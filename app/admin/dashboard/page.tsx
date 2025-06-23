import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import DashboardClient from './pageClient';
import { authors, categories, posts } from '@/lib/database/sampleDatabase';
import { AdminProvider } from '@/lib/admin/admin.context';

export default async function DashboardServer() {
    const token = (await cookies()).get('auth_token_blog')?.value;

    if (!token) redirect('/admin');

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };

        if (payload.email !== process.env.ADMIN_EMAIL) {
            redirect('/admin');
        }

        return (
            <AdminProvider authorsServer={authors} categoriesServer={categories} postsServer={posts}>
                <DashboardClient />
            </AdminProvider>
        );
    } catch {
        redirect('/admin');
    }
}
