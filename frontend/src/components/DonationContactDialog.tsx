import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { api } from "@/lib/api";

type Mode = "donation" | "partnership" | "volunteer";

type Props = {
	open: boolean;
	onOpenChange: (value: boolean) => void;
	mode?: Mode;
	title?: string;
	description?: string;
};

export function DonationContactDialog({ open, onOpenChange, mode = "donation", title, description }: Props) {
	const [contactInfo, setContactInfo] = useState<{
		founderPhone?: string;
		whatsappNumber?: string;
		founderEmail?: string;
		bankName?: string;
		accountName?: string;
		accountNumber?: string;
	} | null>(null);

	useEffect(() => {
		let mounted = true;
		if (open) {
			window.scrollTo({ top: 0, behavior: "smooth" });
			(async () => {
				try {
					const resp = await api.contactInfo.get();
					if (mounted) setContactInfo(resp.data);
				} catch (err) {
					// ignore - contact info optional
				}
			})();
		}
		return () => {
			mounted = false;
		};
	}, [open]);

	const sanitizePhone = (v?: string) => (v ? v.replace(/[^0-9+]/g, "") : "");

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<div className="fixed inset-0 bg-black/50 z-40" aria-hidden />
			<DialogContent className="z-50 max-w-xl mx-auto rounded-lg p-6 animate-in fade-in slide-in-from-bottom-2">
				<DialogHeader>
					<div className="flex items-start justify-between">
						<div>
							<DialogTitle>{title ?? (mode === "donation" ? "Make a Donation" : mode === "partnership" ? "Partner With Us" : "Volunteer With Us")}</DialogTitle>
							{description && <DialogDescription>{description}</DialogDescription>}
						</div>
						<button
							aria-label="Close"
							onClick={() => onOpenChange(false)}
							className="ml-4 p-2 rounded hover:bg-muted/50"
						>
							<X className="h-5 w-5" />
						</button>
					</div>
				</DialogHeader>

				<div className="mt-4 space-y-6">
					<div>
						<h3 className="text-sm font-medium">Contact Founder</h3>
						<div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2">
							{contactInfo?.founderPhone && (
								<a
									className="inline-flex items-center justify-center px-4 py-2 rounded border hover:bg-muted"
									href={`tel:${sanitizePhone(contactInfo.founderPhone)}`}
								>
									Call Founder
								</a>
							)}

							{contactInfo?.whatsappNumber && (
								<a
									className="inline-flex items-center justify-center px-4 py-2 rounded border hover:bg-muted"
									href={`https://wa.me/${sanitizePhone(contactInfo.whatsappNumber).replace(/^\+/, "")}`}
									target="_blank"
									rel="noreferrer"
								>
									WhatsApp Founder
								</a>
							)}

							{contactInfo?.founderEmail && (
								<a
									className="inline-flex items-center justify-center px-4 py-2 rounded border hover:bg-muted"
									href={`mailto:${contactInfo.founderEmail}`}
								>
									Email Founder
								</a>
							)}
						</div>
					</div>

					{mode === "donation" && (
						<div>
							<h3 className="text-sm font-medium">Bank Details</h3>
							<div className="mt-3 text-sm space-y-1">
								<div>
									<span className="font-semibold">Bank:</span> {contactInfo?.bankName ?? "Your Bank Name"}
								</div>
								<div>
									<span className="font-semibold">Account Name:</span> {contactInfo?.accountName ?? "EduSupport Foundation"}
								</div>
								<div>
									<span className="font-semibold">Account Number:</span> {contactInfo?.accountNumber ?? "1234567890"}
								</div>
							</div>
						</div>
					)}

					<div className="text-right">
						<Button onClick={() => onOpenChange(false)}>Close</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default DonationContactDialog;
