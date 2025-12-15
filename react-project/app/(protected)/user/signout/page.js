"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
	const router = useRouter();

	const onSubmit = (e) => {
		e.preventDefault();
		signOut(auth);
		router.push("/");
	};

	return (
		<form onSubmit={onSubmit} className='p-6'>
			<button className='border p-2 rounded' type='submit'>
				Wyloguj
			</button>
		</form>
	);
}
