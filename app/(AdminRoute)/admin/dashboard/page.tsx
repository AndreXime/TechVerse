import { redirect } from 'next/navigation';
import DashboardClient from './pageClient';
import { AdminProvider } from '@/components/admin/AdminProvider';
import { getAdminData } from '@/lib/services/admin';
import { verifyAuth } from '@/lib/actions/admin/auth';

export default async function DashboardServer() {
    try {
        if (!(await verifyAuth())) {
            redirect('/admin');
        }

        const { authors, categories, posts } = await getAdminData();

        return (
            <AdminProvider
                authorsServer={authors}
                categoriesServer={categories}
                postsServer={posts}>
                <DashboardClient />
            </AdminProvider>
        );
    } catch {
        redirect('/admin');
    }
}
