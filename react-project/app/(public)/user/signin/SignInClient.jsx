"use client";

import { useState } from "react";
import {
	signInWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
	signOut,
} from "firebase/auth";
import { useSearchParams, useRouter } from "next/navigation";
import { auth } from "@/app/lib/firebase";

export default function SignInClient() {
	const params = useSearchParams();
	const router = useRouter();
	const returnUrl = params.get("returnUrl");
	const [error, setError] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
		setError("");

		const email = e.target["email"].value;
		const password = e.target["password"].value;

		setPersistence(auth, browserSessionPersistence)
			.then(() => signInWithEmailAndPassword(auth, email, password))
			.then((cred) => {
				const u = cred.user;

				if (!u.emailVerified) {
					localStorage.setItem("pendingVerificationEmail", u.email || "");
					return signOut(auth).finally(() => router.push("/user/verify"));
				}

				router.push(returnUrl || "/");
			})
			.catch((err) => {
				setError(err?.message || "Nie udało się zalogować.");
			});
	};

	return (
		<div className='max-w-md mx-auto'>
			<h1 className='text-2xl font-bold mb-4'>Sign in</h1>

			{error && <div className='mb-4 border p-3 rounded'>{error}</div>}

			<form onSubmit={onSubmit} className='flex flex-col gap-3'>
				<input
					name='email'
					type='email'
					placeholder='Email'
					className='border p-2 rounded'
					required
				/>
				<input
					name='password'
					type='password'
					placeholder='Password'
					className='border p-2 rounded'
					required
				/>
				<button className='border p-2 rounded' type='submit'>
					Login
				</button>
			</form>
		</div>
	);
}
