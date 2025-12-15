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
	const [loading, setLoading] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		setError("");

		const email = e.target.email.value;
		const password = e.target.password.value;

		setLoading(true);

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
			})
			.finally(() => setLoading(false));
	};

	return (
		<div className='max-w-md mx-auto'>
			<div className='card bg-base-100 shadow border border-base-300'>
				<div className='card-body p-6'>
					<h1 className='card-title text-lg'>Sign in</h1>
					<p className='text-sm opacity-70'>
						Zaloguj się, aby uzyskać dostęp do chronionych stron.
					</p>

					{error && (
						<div className='alert alert-error mt-3'>
							<span>{error}</span>
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
								<span className='label-text'>Password</span>
							</label>
							<input
								name='password'
								type='password'
								placeholder='Password'
								className='input input-bordered w-full'
								required
								disabled={loading}
							/>
						</div>

						<button
							className='btn btn-primary mt-2'
							type='submit'
							disabled={loading}>
							{loading ? (
								<>
									<span className='loading loading-spinner loading-sm'></span>
									Logging in...
								</>
							) : (
								"Login"
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
