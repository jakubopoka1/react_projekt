"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
	const router = useRouter();

	const onSubmit = async (e) => {
		e.preventDefault();
		await signOut(auth);
		router.push("/");
	};

	return (
		<div className='max-w-md'>
			<div className='card bg-base-100 shadow border border-base-300'>
				<div className='card-body p-6'>
					<h1 className='card-title text-lg'>Wylogowanie</h1>

					<p className='text-sm opacity-70'>
						Czy na pewno chcesz się wylogować?
					</p>

					<form onSubmit={onSubmit} className='mt-4 flex justify-end gap-2'>
						<button
							type='button'
							className='btn btn-ghost'
							onClick={() => router.back()}>
							Anuluj
						</button>

						<button type='submit' className='btn btn-error'>
							Wyloguj
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
