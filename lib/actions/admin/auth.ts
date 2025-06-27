'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export async function LoginAdmin(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1d' });

        (await cookies()).set({
            name: 'auth_token_blog',
            value: token,
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        redirect('/admin/dashboard');
    }

    redirect('/admin?error=1');
}

export async function LogoutAdmin() {
    (await cookies()).delete('auth_token_blog');
    redirect('/');
}

export async function verifyAuth() {
    try {
        const token = (await cookies()).get('auth_token_blog')?.value;

        if (!token) return false;

        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };

        if (payload.email !== process.env.ADMIN_EMAIL) {
            return false;
        }

        return true;
    } catch {
        return false;
    }
}
