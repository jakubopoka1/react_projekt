"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
	const router = useRouter();

	useEffect(() => {
		signOut(auth).finally(() => router.push("/"));
	}, [router]);

	return <div className='p-6'>Wylogowywanie...</div>;
}
