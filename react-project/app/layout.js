import "./globals.css";
import { AuthProvider } from "@/app/lib/AuthContext";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import Footer from "@/app/components/Footer";

export default function RootLayout({ children }) {
	return (
		<html lang='pl'>
			<body className='min-h-screen'>
				<AuthProvider>
					<div className='flex min-h-screen'>
						<Sidebar />
						<div className='flex flex-1 flex-col'>
							<Topbar />
							<main className='flex-1 p-6'>{children}</main>
							<Footer />
						</div>
					</div>
				</AuthProvider>
			</body>
		</html>
	);
}
