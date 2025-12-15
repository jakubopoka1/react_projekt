"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { db } from "@/app/lib/firebase";
import {
	addDoc,
	collection,
	getDocs,
	query,
	where,
	serverTimestamp,
} from "firebase/firestore";

export default function ArticlesPage() {
	const { user } = useAuth();

	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);

	const [title, setTitle] = useState("");
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

	const load = async () => {
		if (!user?.uid) return;

		setLoading(true);
		setError("");

		try {
			const q = query(
				collection(db, "articles"),
				where("user", "==", user.uid)
			);
			const snap = await getDocs(q);
			setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
		} catch (e) {
			setError(e?.message || "Nie udało się pobrać artykułów.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		load();
	}, [user?.uid]);

	const onAdd = async (e) => {
		e.preventDefault();
		setError("");
		setMsg("");

		if (!title.trim()) {
			setError("Podaj tytuł.");
			return;
		}

		try {
			await addDoc(collection(db, "articles"), {
				title: title.trim(),
				user: user.uid,
				createdAt: serverTimestamp(),
			});

			setTitle("");
			setMsg("Dodano artykuł.");
			await load();
		} catch (e) {
			setError(e?.message || "Nie udało się dodać artykułu.");
		}
	};

	if (loading) {
		return (
			<div className='p-6'>
				<span className='loading loading-spinner loading-md'></span>
			</div>
		);
	}

	return (
		<div className='max-w-2xl'>
			<div className='flex items-center justify-between mb-4'>
				<h1 className='text-2xl font-bold'>My articles</h1>
				<div className='badge badge-neutral'>{items.length}</div>
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

			<div className='card bg-base-100 shadow border border-base-300 mb-6'>
				<div className='card-body p-4'>
					<h2 className='card-title text-base'>Add article</h2>

					<form onSubmit={onAdd} className='flex flex-col gap-3 sm:flex-row'>
						<input
							className='input input-bordered w-full'
							placeholder='Title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>

						<button className='btn btn-primary sm:w-32' type='submit'>
							Add
						</button>
					</form>
				</div>
			</div>

			{items.length === 0 ? (
				<div className='card bg-base-100 shadow border border-base-300'>
					<div className='card-body p-4'>
						<div className='text-sm opacity-70'>Brak rekordów.</div>
					</div>
				</div>
			) : (
				<div className='grid gap-3'>
					{items.map((x) => (
						<div
							key={x.id}
							className='card bg-base-100 shadow border border-base-300'>
							<div className='card-body p-4'>
								<div className='flex items-start justify-between gap-3'>
									<div className='min-w-0'>
										<div className='font-semibold truncate'>
											{x.title ?? x.id}
										</div>
										<div className='text-xs opacity-60'>ID: {x.id}</div>
									</div>
									<div className='badge badge-outline'>article</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
