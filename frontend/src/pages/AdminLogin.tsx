import React from "react";
import { Button } from "@/components/ui/button";
import useAdmin from "@/hooks/use-admin";

const AdminLogin: React.FC = () => {
	const { setIsAdmin } = useAdmin();

	const handleQuickLogin = () => {
		// This is a lightweight placeholder login used to unblock the UI during development.
		// Replace with real auth flow later.
		setIsAdmin(true);
		window.location.href = "/admin-dashboard";
	};

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="max-w-md w-full p-6 border rounded">
				<h2 className="text-2xl font-bold mb-4">Admin login (dev placeholder)</h2>
				<p className="text-sm text-muted-foreground mb-4">
					This is a temporary login page so the app can mount during development. Implement proper authentication when ready.
				</p>
				<Button onClick={handleQuickLogin}>Sign in (dev)</Button>
			</div>
		</div>
	);
};

export default AdminLogin;
