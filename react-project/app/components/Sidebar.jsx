import Link from "next/link";

export default function Sidebar() {
	return (
		<aside className='w-64 border-r p-4'>
			<div className='text-xl font-bold mb-6'>React Projekt</div>
			<nav className='flex flex-col gap-3'>
				<Link href='/' className='hover:underline'>
					Home
				</Link>
				<Link href='/user/signin' className='hover:underline'>
					Sign in
				</Link>
				<Link href='/user/register' className='hover:underline'>
					Register
				</Link>
				<Link href='/user/profile' className='hover:underline'>
					Profile
				</Link>
				<Link href='/user/changepassword' className='hover:underline'>
					Change password
				</Link>
				<Link href='/user/signout' className='hover:underline'>
					Sign out
				</Link>
				<Link href='/articles' className='hover:underline'>
					Articles
				</Link>
				<Link href='/calendar' className='hover:underline'>
					Calendar
				</Link>
			</nav>
		</aside>
	);
}
