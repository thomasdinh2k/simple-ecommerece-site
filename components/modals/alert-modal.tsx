"use client";

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	loading,
}) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<Modal
			title="Bạn chắc chứ?"
			description="Không thể phục hồi shop nếu đã xóa"
			isOpen={isOpen}
			onClose={onClose}
        >
			<div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Hủy
                </Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                    Xóa
                </Button>
                
            </div>
		</Modal>
	);
};
