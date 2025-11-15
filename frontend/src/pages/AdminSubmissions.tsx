import React from "react";
import { Button } from "@/components/ui/button";
import useAdmin from "@/hooks/use-admin";

const AdminSubmissions: React.FC = () => {
	const { setIsAdmin } = useAdmin();

	return (
		<div className="min-h-screen p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-4">Admin Submissions (placeholder)</h1>
				<p className="text-muted-foreground mb-6">This page is a placeholder for contact/submission management.</p>
				<div className="flex gap-4">
					<Button onClick={() => alert("Replace with submissions list")}>View Submissions</Button>
					<Button variant="destructive" onClick={() => { setIsAdmin(false); window.location.href = "/"; }}>
						Sign out (dev)
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AdminSubmissions;
