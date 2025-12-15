import "./globals.css";
import { AuthProvider } from "@/app/lib/AuthContext";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/Footer";

export default function RootLayout({ children }) {
	return (
		<html lang='pl' data-theme='dark'>
			<body className='min-h-screen bg-base-200 text-base-content'>
				<AuthProvider>
					<div className='flex min-h-screen'>
						<Sidebar />
						<div className='flex flex-1 flex-col'>
							<main className='flex-1 p-6'>{children}</main>
							<Footer />
						</div>
					</div>
				</AuthProvider>
			</body>
		</html>
	);
}
