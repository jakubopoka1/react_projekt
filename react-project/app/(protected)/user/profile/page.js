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
		<div className='max-w-2xl'>
			<div className='flex items-center justify-between mb-4'>
				<h1 className='text-2xl font-bold'>Profile</h1>
				{user?.email && <div className='badge badge-neutral'>{user.email}</div>}
			</div>

			{error && (
				<div className='alert alert-error mb-4'>
					<span>{error}</span>
				</div>
			)}

			{msg && (
				<div className='alert alert-success mb-4'>
					<span>{msg}</span>
				</div>
			)}

			<div className='card bg-base-100 shadow border border-base-300'>
				<div className='card-body p-6 gap-5'>
					<div className='flex items-center gap-4'>
						<div className='avatar'>
							<div className='w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
								<img
									src={
										user?.photoURL || "https://placehold.co/128x128?text=USER"
									}
									alt='Profile'
								/>
							</div>
						</div>

						<div className='min-w-0'>
							<div className='font-semibold text-lg truncate'>
								{user?.displayName || "No display name"}
							</div>
							<div className='text-sm opacity-70 truncate'>{user?.uid}</div>
						</div>
					</div>

					<form onSubmit={onSubmit} className='grid gap-3'>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Display name</span>
							</label>
							<input
								name='displayName'
								defaultValue={user?.displayName || ""}
								className='input input-bordered w-full'
								placeholder='displayName'
							/>
						</div>

						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Email</span>
							</label>
							<input
								name='email'
								value={user?.email || ""}
								readOnly
								className='input input-bordered w-full opacity-70'
							/>
						</div>

						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Photo URL</span>
							</label>
							<input
								name='photoURL'
								defaultValue={user?.photoURL || ""}
								className='input input-bordered w-full'
								placeholder='photoURL'
							/>
						</div>

						<div className='divider my-1'>Address</div>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Street</span>
								</label>
								<input
									name='street'
									value={address.street}
									onChange={(e) =>
										setAddress({ ...address, street: e.target.value })
									}
									disabled={addrLoading}
									className='input input-bordered w-full'
									placeholder='street'
								/>
							</div>

							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>City</span>
								</label>
								<input
									name='city'
									value={address.city}
									onChange={(e) =>
										setAddress({ ...address, city: e.target.value })
									}
									disabled={addrLoading}
									className='input input-bordered w-full'
									placeholder='city'
								/>
							</div>

							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Zip code</span>
								</label>
								<input
									name='zipCode'
									value={address.zipCode}
									onChange={(e) =>
										setAddress({ ...address, zipCode: e.target.value })
									}
									disabled={addrLoading}
									className='input input-bordered w-full'
									placeholder='zipCode'
								/>
							</div>
						</div>

						<div className='flex items-center justify-between mt-2'>
							{addrLoading ? (
								<div className='flex items-center gap-2 text-sm opacity-70'>
									<span className='loading loading-spinner loading-sm'></span>
									Loading address...
								</div>
							) : (
								<div className='text-sm opacity-60'>Ready</div>
							)}

							<button
								className='btn btn-primary'
								type='submit'
								disabled={addrLoading}>
								{addrLoading ? "Loading..." : "Zapisz"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
