"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Create a form Schema
const formSchema = z.object({
	name: z.string().min(1).max(50),
});

export const StoreModal = () => {
	const storeModal = useStoreModal();

	const [loading, setLoading] = useState(false);

	// 1. Define a Form
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	// 2. Define a submit handler
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true);

			// Attempt to create new store
			const response = await axios.post('/api/stores', values);

			console.log(response.data)
			toast.success("Tạo thành công!");
		} catch (error) {
			// Handle Error
			toast.error("Đã xảy ra lỗi, vui lòng liên hệ IT");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			title="Tạo cửa hàng mới"
			description="Tạo cửa hàng mới để bắt đầu quản lý"
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}>
			{/* Create Form */}
			<div>
				<div className="space-y-4 py-2 pb-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tên cửa hàng</FormLabel>
										<FormControl>
											<Input
												placeholder="Nhập tên cửa hàng..."
												disabled={loading}
												{...field}>
											</Input>
										</FormControl>
										<FormDescription>Nhập tối đa 50 ký tự...</FormDescription>
                                        <FormMessage/>
									</FormItem>
								)}
							/>
							<div className="pt-6 space-x-2 flex items-center justify-end w-full">
								<Button variant="outline" onClick={storeModal.onClose} disabled={loading}>
									Cancel
								</Button>
								<Button type="submit" disabled={loading}>Continue</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	);
};
