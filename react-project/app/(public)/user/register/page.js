"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
	const router = useRouter();
	const [error, setError] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
		setError("");

		const email = e.target["email"].value;
		const password = e.target["password"].value;

		createUserWithEmailAndPassword(auth, email, password)
			.then(() => router.push("/user/signin"))
			.catch((err) => setError(err?.message || "Rejestracja nieudana."));
	};

	return (
		<div className='max-w-md mx-auto'>
			<h1 className='text-2xl font-bold mb-4'>Register</h1>

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
					placeholder='Password (min 6)'
					className='border p-2 rounded'
					required
				/>
				<button className='border p-2 rounded' type='submit'>
					Create account
				</button>
			</form>
		</div>
	);
}
