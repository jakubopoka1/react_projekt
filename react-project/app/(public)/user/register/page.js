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
	const [loading, setLoading] = useState(false);

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
			setLoading(true);

			await createUserWithEmailAndPassword(auth, email, password);
			await sendEmailVerification(auth.currentUser);

			localStorage.setItem("pendingVerificationEmail", email);

			await signOut(auth);

			router.push("/user/verify");
		} catch (err) {
			setRegisterError(err?.message || "Błąd rejestracji.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='max-w-md mx-auto'>
			<div className='card bg-base-100 shadow border border-base-300'>
				<div className='card-body p-6'>
					<h1 className='card-title text-lg'>Register</h1>
					<p className='text-sm opacity-70'>
						Utwórz konto, a następnie potwierdź e-mail.
					</p>

					{registerError && (
						<div className='alert alert-error mt-3'>
							<span>{registerError}</span>
						</div>
					)}

					<form onSubmit={onSubmit} className='mt-4 flex flex-col gap-3'>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Email</span>
							</label>
							<input
								name='email'
								type='email'
								placeholder='Email'
								className='input input-bordered w-full'
								required
								disabled={loading}
							/>
						</div>

						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Hasło</span>
							</label>
							<input
								name='password'
								type='password'
								placeholder='Hasło'
								className='input input-bordered w-full'
								required
								disabled={loading}
							/>
						</div>

						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Powtórz hasło</span>
							</label>
							<input
								name='password2'
								type='password'
								placeholder='Powtórz hasło'
								className='input input-bordered w-full'
								required
								disabled={loading}
							/>
						</div>

						<button
							className='btn btn-primary mt-2'
							type='submit'
							disabled={loading}>
							{loading ? "Tworzenie..." : "Utwórz konto"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
