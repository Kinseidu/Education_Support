import React from "react";
import { Button } from "@/components/ui/button";
import useAdmin from "@/hooks/use-admin";

const AdminDashboard: React.FC = () => {
	const { setIsAdmin } = useAdmin();

	return (
		<div className="min-h-screen p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-4">Admin Dashboard (placeholder)</h1>
				<p className="text-muted-foreground mb-6">
					This is a development placeholder for the admin dashboard. Replace with real admin widgets and controls.
				</p>
				<div className="flex gap-4">
					<Button onClick={() => alert("Replace with program creation flow")}>Create Program</Button>
					<Button variant="destructive" onClick={() => { setIsAdmin(false); window.location.href = "/"; }}>
						Sign out (dev)
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
