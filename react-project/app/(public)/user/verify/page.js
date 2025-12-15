"use client";

import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import Link from "next/link";

export default function VerifyEmailPage() {
	const [email, setEmail] = useState("");

	useEffect(() => {
		const stored = localStorage.getItem("pendingVerificationEmail") || "";
		setEmail(stored);
		signOut(auth);
	}, []);

	return (
		<div className='max-w-xl'>
			<div className='card bg-base-100 shadow border border-base-300'>
				<div className='card-body p-6'>
					<h1 className='card-title text-lg'>Email not verified</h1>

					<div className='alert alert-info mt-2'>
						<span>
							Zweryfikuj adres klikając link wysłany na:{" "}
							<b>{email || "Twój email"}</b>
						</span>
					</div>

					<div className='text-sm opacity-70 mt-3'>
						Po weryfikacji wróć i zaloguj się ponownie.
					</div>

					<div className='mt-4 flex justify-end'>
						<Link className='btn btn-primary' href='/user/signin'>
							Przejdź do logowania
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
