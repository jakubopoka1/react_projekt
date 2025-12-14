"use client";

import { useState } from "react";
import { updatePassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function ChangePasswordPage() {
	const [msg, setMsg] = useState("");
	const [err, setErr] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();
		setMsg("");
		setErr("");

		const newPass = e.target["password"].value;

		try {
			await updatePassword(auth.currentUser, newPass);
			setMsg("Hasło zostało zmienione.");
		} catch (e2) {
			setErr(e2?.message || "Nie udało się zmienić hasła.");
		}
	};

	return (
		<div className='max-w-md'>
			<h1 className='text-2xl font-bold mb-4'>Change password</h1>
			{msg && <div className='mb-3 border p-3 rounded'>{msg}</div>}
			{err && <div className='mb-3 border p-3 rounded'>{err}</div>}

			<form onSubmit={onSubmit} className='flex flex-col gap-3'>
				<input
					name='password'
					type='password'
					placeholder='New password'
					className='border p-2 rounded'
					required
				/>
				<button className='border p-2 rounded' type='submit'>
					Update
				</button>
			</form>
		</div>
	);
}
