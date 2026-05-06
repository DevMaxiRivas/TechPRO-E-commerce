import { LoginForm } from "./components/login-form";

export default function page() {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-10">
                <h1 className="text-center text-3xl">
                    Tech
                    <span className="font-bold text-primary">PRO</span>
                </h1>
                <h2 className="text-center text-2xl/9 font-bold tracking-tight ">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <LoginForm />
                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    Don&apos;t have an account{" "}
                    <br />
                    <a href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
                        Click here to register
                    </a>
                </p>
            </div>
        </div >
    );
}