"use client";
import { useAuth } from "@/app/lib/AuthContext";

export default function ProfilePage() {
	const { user } = useAuth();
	return (
		<div>
			<h1 className='text-2xl font-bold mb-2'>Profile</h1>
			<p>
				Zalogowany jako: <b>{user?.email}</b>
			</p>
		</div>
	);
}
