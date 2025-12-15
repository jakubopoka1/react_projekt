"use client";

import { useState } from "react";
import { updatePassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function ChangePasswordPage() {
	const [msg, setMsg] = useState("");
	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(false);

	const onSubmit = async (e) => {
		e.preventDefault();
		setMsg("");
		setErr("");

		const newPass = e.target.password.value;

		try {
			setLoading(true);
			await updatePassword(auth.currentUser, newPass);
			setMsg("Hasło zostało zmienione.");
			e.target.reset();
		} catch (e2) {
			setErr(e2?.message || "Nie udało się zmienić hasła.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='max-w-md'>
			<div className='card bg-base-100 shadow border border-base-300'>
				<div className='card-body p-6'>
					<h1 className='card-title text-lg'>Change password</h1>

					<p className='text-sm opacity-70'>
						Wprowadź nowe hasło dla swojego konta.
					</p>

					{msg && (
						<div className='alert alert-success mt-3'>
							<span>{msg}</span>
						</div>
					)}

					{err && (
						<div className='alert alert-error mt-3'>
							<span>{err}</span>
						</div>
					)}

					<form onSubmit={onSubmit} className='mt-4 flex flex-col gap-3'>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>New password</span>
							</label>
							<input
								name='password'
								type='password'
								placeholder='New password'
								className='input input-bordered w-full'
								required
							/>
						</div>

						<div className='flex justify-end'>
							<button
								className='btn btn-primary'
								type='submit'
								disabled={loading}>
								{loading ? "Updating..." : "Update password"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
