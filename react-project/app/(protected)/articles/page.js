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
	orderBy,
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

	if (loading) return <div className='p-6'>Loading...</div>;

	return (
		<div className='max-w-xl'>
			<h1 className='text-2xl font-bold mb-4'>My articles</h1>

			{error && <div className='mb-3 border p-3 rounded'>{error}</div>}
			{msg && <div className='mb-3 border p-3 rounded'>{msg}</div>}

			<form onSubmit={onAdd} className='flex gap-2 mb-6'>
				<input
					className='border p-2 rounded flex-1'
					placeholder='title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<button className='border p-2 rounded' type='submit'>
					Add
				</button>
			</form>

			{items.length === 0 ? (
				<p>Brak rekordów.</p>
			) : (
				<ul className='list-disc pl-6'>
					{items.map((x) => (
						<li key={x.id}>
							<b>{x.title ?? x.id}</b>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
