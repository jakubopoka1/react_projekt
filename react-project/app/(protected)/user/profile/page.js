"use client";

import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { db } from "@/app/lib/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

export default function ProfilePage() {
	const { user } = useAuth();

	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

	const [addrLoading, setAddrLoading] = useState(true);
	const [address, setAddress] = useState({
		street: "",
		city: "",
		zipCode: "",
	});

	useEffect(() => {
		const loadAddress = async () => {
			if (!user?.uid) {
				setAddrLoading(false);
				return;
			}

			setAddrLoading(true);
			setError("");

			try {
				const snap = await getDoc(doc(db, "users", user.uid));

				const a = snap.exists() ? snap.data()?.address : null;
				if (a) {
					setAddress({
						street: a.street || "",
						city: a.city || "",
						zipCode: a.zipCode || "",
					});
				} else {
					setAddress({ street: "", city: "", zipCode: "" });
				}
			} catch (e) {
				setError(e?.message || "Nie udało się pobrać danych adresowych.");
			} finally {
				setAddrLoading(false);
			}
		};

		loadAddress();
	}, [user?.uid]);

	const onSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setMsg("");

		const displayName = e.target.displayName.value;
		const photoURL = e.target.photoURL.value;

		try {
			await updateProfile(user, { displayName, photoURL });

			await setDoc(
				doc(db, "users", user.uid),
				{
					address: {
						street: address.street,
						city: address.city,
						zipCode: address.zipCode,
					},
				},
				{ merge: true }
			);

			setMsg("Profile updated");
		} catch (err) {
			setError(err?.message || "Nie udało się zaktualizować profilu.");
		}
	};

	return (
		<div className='max-w-md'>
			<h1 className='text-2xl font-bold mb-4'>Profile</h1>

			{user?.photoURL && (
				<img
					src={user.photoURL}
					alt='Profile'
					className='w-20 h-20 rounded-full mb-4'
				/>
			)}

			{error && <div className='mb-3 border p-3 rounded'>{error}</div>}
			{msg && <div className='mb-3 border p-3 rounded'>{msg}</div>}

			<form onSubmit={onSubmit} className='flex flex-col gap-3'>
				<input
					name='displayName'
					defaultValue={user?.displayName || ""}
					className='border p-2 rounded'
					placeholder='displayName'
				/>

				<input
					name='email'
					value={user?.email || ""}
					readOnly
					className='border p-2 rounded opacity-70'
				/>

				<input
					name='photoURL'
					defaultValue={user?.photoURL || ""}
					className='border p-2 rounded'
					placeholder='photoURL'
				/>

				<input
					name='street'
					value={address.street}
					onChange={(e) => setAddress({ ...address, street: e.target.value })}
					disabled={addrLoading}
					className='border p-2 rounded'
					placeholder='street'
				/>

				<input
					name='city'
					value={address.city}
					onChange={(e) => setAddress({ ...address, city: e.target.value })}
					disabled={addrLoading}
					className='border p-2 rounded'
					placeholder='city'
				/>

				<input
					name='zipCode'
					value={address.zipCode}
					onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
					disabled={addrLoading}
					className='border p-2 rounded'
					placeholder='zipCode'
				/>

				<button
					className='border p-2 rounded'
					type='submit'
					disabled={addrLoading}>
					{addrLoading ? "Loading..." : "Zapisz"}
				</button>
			</form>
		</div>
	);
}
