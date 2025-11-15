import { createContext } from "react";

export type AdminContextType = {
	isAdmin: boolean;
	setIsAdmin: (value: boolean) => void;
};

export const AdminContext = createContext<AdminContextType>({
	isAdmin: false,
	setIsAdmin: () => {},
});

export default AdminContext;
