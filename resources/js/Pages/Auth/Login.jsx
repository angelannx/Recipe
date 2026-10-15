import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in - SavoryStudio" />

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-extrabold text-slate-900">Welcome Back!</h2>
                <p className="text-xs text-slate-500 mt-1">Please enter your credentials to access your recipes.</p>
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-xs font-bold text-slate-700" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-xl border-slate-200 focus:border-orange-500 focus:ring-orange-500 text-sm"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" className="text-xs font-bold text-slate-700" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-xl border-slate-200 focus:border-orange-500 focus:ring-orange-500 text-sm"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                        />
                        <span className="ms-2 text-xs text-slate-600 font-medium">Remember me</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-xs text-slate-500 hover:text-orange-600 font-medium rounded-md focus:outline-none"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                <div className="pt-2">
                    <button
                        disabled={processing}
                        className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition transform active:scale-95 disabled:opacity-50"
                    >
                        Log in
                    </button>
                </div>

                <div className="text-center pt-3 border-t border-slate-100 mt-4">
                    <p className="text-xs text-slate-500">
                        Don't have an account?{' '}
                        <Link href={route('register')} className="text-orange-600 font-bold hover:underline">
                            Create account
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}