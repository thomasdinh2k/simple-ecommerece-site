"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";
import { Size } from "@prisma/client";

const formSchema = z.object({
	name: z.string().min(1),
	value: z.string().min(1),
});

type SizeFormValues = z.infer<typeof formSchema>;

interface SettingsFormProps {
	initialData: Size | null;
}

export const SizeForm: React.FC<SettingsFormProps> = ({ initialData }) => {
	const params = useParams();
	const router = useRouter();
	const origin = useOrigin();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const title = initialData
		? "Sửa Trang Kích Thước"
		: "Tạo mới Trang Kích Thước";
	const description = initialData
		? "Chỉnh Sửa Trang Kích Thước này"
		: "Tạo một Trang Kích Thước mới";
	const toastMessage = initialData
		? "Đã cập nhật Trang Kích Thước"
		: "Trang Kích Thước đã được tạo mới.";
	const action = initialData ? "Lưu thay đổi" : "Tạo mới";

	const form = useForm<SizeFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: "",
			value: "",
		},
	});

	const onSubmit = async (data: SizeFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/sizes/${params.sizeId}`,
					data
				);
			} else {
				await axios.post(`/api/${params.storeId}/sizes`, data);
			}
			// await axios.post(`/api/stores/${params.storeId}/sizes`, data);
			router.refresh(); //Re-sync server component
			router.push(`/${params.storeId}/sizes`);
			toast.success(toastMessage);
		} catch (error) {
			toast.error("Đã có lỗi gì đó xảy ra");
		} finally {
			setLoading(false);
		}
	};

	async function onDelete() {
		try {
			setLoading(true);
			await axios.delete(
				`/api/${params.storeId}/sizes/${params.sizeId}`
			);
			router.refresh();
			router.push(`/${params.storeId}/sizes`);
			toast.success("Đã bỏ kích thước");
		} catch (error) {
			toast.error(
				""
			);
		} finally {
			setLoading(false);
			setOpen(false);
		}
	}

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
			<div className="flex items-center justify-between">
				<Heading title={title} description={description} />

				{initialData && (
					<Button
						disabled={loading}
						variant="destructive"
						size="icon"
						onClick={() => setOpen(true)}>
						<Trash className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full">
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Kích thước</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Tên trang kích thước là ..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					
				</form>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full">
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="value"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Mã Kích thước</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="XL..L...M...SM..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={loading} className="ml-auto" type="submit">
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
};
