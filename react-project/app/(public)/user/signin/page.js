import { Suspense } from "react";
import SignInClient from "./SignInClient";

export default function SignInPage() {
	return (
		<Suspense
			fallback={
				<div className='p-6'>
					<span className='loading loading-spinner loading-md'></span>
				</div>
			}>
			<SignInClient />
		</Suspense>
	);
}
