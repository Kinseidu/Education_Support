import React from "react";
import { Button } from "@/components/ui/button";
import useAdmin from "@/hooks/use-admin";

const AdminNews: React.FC = () => {
	const { setIsAdmin } = useAdmin();

	return (
		<div className="min-h-screen p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-4">Admin News (placeholder)</h1>
				<p className="text-muted-foreground mb-6">This page is a placeholder for news management.</p>
				<div className="flex gap-4">
					<Button onClick={() => alert("Replace with news creation flow")}>Create News</Button>
					<Button variant="destructive" onClick={() => { setIsAdmin(false); window.location.href = "/"; }}>
						Sign out (dev)
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AdminNews;
