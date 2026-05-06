import RegisterForm from "./components/register-form";

const Page = () => {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-10">
                <h1 className="text-center text-3xl">
                    Tech
                    <span className="font-bold text-primary">PRO</span>
                </h1>
                <h2 className="text-center text-2xl/9 font-bold tracking-tight ">Register your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <RegisterForm />
            </div>
        </div >
    );
}

export default Page;