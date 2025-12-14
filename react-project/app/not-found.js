import Link from "next/link";

export default function NotFound() {
	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-2'>404 - Nie ma takiej strony</h1>
			<p className='mb-4'>Ścieżka nie istnieje.</p>
			<Link className='underline' href='/'>
				Wróć do strony głównej
			</Link>
		</div>
	);
}
