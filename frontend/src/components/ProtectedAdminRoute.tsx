import React from "react";
import { Navigate } from "react-router-dom";
import useAdmin from "@/hooks/use-admin";

const ProtectedAdminRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
	const { isAdmin } = useAdmin();

	if (!isAdmin) {
		return <Navigate to="/admin-login" replace />;
	}

	return children;
};

export default ProtectedAdminRoute;
