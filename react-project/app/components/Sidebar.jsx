"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/lib/AuthContext";

function Item({ href, children }) {
	const pathname = usePathname();
	const active = pathname === href;
	return (
		<li>
			<Link className={active ? "active" : ""} href={href}>
				{children}
			</Link>
		</li>
	);
}

export default function Sidebar() {
	const { user } = useAuth();

	return (
		<aside className='w-64 min-h-screen bg-base-100 border-r border-base-300'>
			<div className='p-4 text-2xl font-bold'>React Projekt</div>

			<ul className='menu px-4 gap-1'>
				<Item href='/'>Home</Item>

				{user && (
					<>
						<Item href='/calendar'>Calendar</Item>
						<Item href='/articles'>Articles</Item>
					</>
				)}

				<li className='menu-title mt-4'>User</li>

				{!user && (
					<>
						<Item href='/user/signin'>Sign in</Item>
						<Item href='/user/register'>Register</Item>
					</>
				)}

				{user && (
					<>
						<Item href='/user/profile'>Profile</Item>
						<Item href='/user/changepassword'>Change password</Item>
						<Item href='/user/signout'>Sign out</Item>
					</>
				)}
			</ul>
		</aside>
	);
}
