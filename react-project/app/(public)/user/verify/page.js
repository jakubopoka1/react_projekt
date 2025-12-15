"use client";

import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function VerifyEmailPage() {
	const [email, setEmail] = useState("");

	useEffect(() => {
		const stored = localStorage.getItem("pendingVerificationEmail") || "";
		setEmail(stored);

		signOut(auth);
	}, []);

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-2'>Email not verified</h1>
			<p>
				Zweryfikuj adres klikając link wysłany na:{" "}
				<b>{email || "Twój email"}</b>
			</p>
		</div>
	);
}
