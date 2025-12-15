"use client";

import { useState } from "react";
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signOut,
} from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useAuth } from "@/app/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
	const { user } = useAuth();
	const router = useRouter();
	const [registerError, setRegisterError] = useState("");

	if (user) return null;

	const onSubmit = async (e) => {
		e.preventDefault();
		setRegisterError("");

		const email = e.target.email.value.trim();
		const password = e.target.password.value;
		const password2 = e.target.password2.value;

		if (password !== password2) {
			setRegisterError("Hasła muszą być identyczne.");
			return;
		}

		try {
			await createUserWithEmailAndPassword(auth, email, password);
			await sendEmailVerification(auth.currentUser);

			localStorage.setItem("pendingVerificationEmail", email);

			await signOut(auth);

			router.push("/user/verify");
		} catch (err) {
			setRegisterError(err?.message || "Błąd rejestracji.");
		}
	};

	return (
		<div className='max-w-md mx-auto'>
			<h1 className='text-2xl font-bold mb-4'>Register</h1>

			{registerError && (
				<div className='mb-3 border p-3 rounded'>{registerError}</div>
			)}

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
					placeholder='Hasło'
					className='border p-2 rounded'
					required
				/>
				<input
					name='password2'
					type='password'
					placeholder='Powtórz hasło'
					className='border p-2 rounded'
					required
				/>
				<button className='border p-2 rounded' type='submit'>
					Utwórz konto
				</button>
			</form>
		</div>
	);
}
