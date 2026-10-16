import type { ReactNode } from "react";

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    children: ReactNode;
    footerText: string;
    footerLinkText: string;
    navgaiteFn: () => void;
}

function AuthLayout({ children, title, subtitle, footerText, footerLinkText, navgaiteFn }: AuthLayoutProps) {

    return (
        <main className="flex min-h-screen w-screen items-center justify-center bg-gray-50 p-4 font-sans">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-gray-200">

                <div className="text-center mb-8">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4F5F7] text-[#D64E51] mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
                    <p className="text-gray-500 text-sm mt-1.5">{subtitle}</p>
                </div>
                {children}
                <div className="text-center mt-6">
                    <p className="text-gray-500 text-xs">
                        {footerText}{""}
                        <span
                            className="text-[#D64E51] font-medium cursor-pointer hover:underline"
                            onClick={() => navgaiteFn()}
                        >
                            {footerLinkText}
                        </span>
                    </p>
                </div>

            </div>
        </main>
    )
}
export default AuthLayout;