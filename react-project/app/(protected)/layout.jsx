"use client";

import { useAuth } from "@/app/lib/AuthContext";
import { useLayoutEffect } from "react";
import { redirect, usePathname } from "next/navigation";

export default function ProtectedLayout({ children }) {
	const { user, loading } = useAuth();
	const returnUrl = usePathname();

	useLayoutEffect(() => {
		if (!loading && !user) {
			redirect(`/user/signin?returnUrl=${encodeURIComponent(returnUrl)}`);
		}
	}, [loading, user, returnUrl]);

	if (loading) return <div className='p-6'>Loading...</div>;

	return <>{children}</>;
}
