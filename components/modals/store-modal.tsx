"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {
    const storeModal = useStoreModal();

    return (
        <Modal
            title= "Tạo cửa hàng mới"
            description="Tạo cửa hàng mới để bắt đầu quản lý"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Future Create Store Form
        </Modal>
    )
}