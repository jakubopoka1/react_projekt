import Link from "next/link";

export default function Topbar() {
	return (
		<header className='border-b p-4 flex items-center justify-end gap-3'>
			<Link className='underline' href='/user/register'>
				Register
			</Link>
			<Link className='underline' href='/user/signin'>
				Sign in
			</Link>
		</header>
	);
}
