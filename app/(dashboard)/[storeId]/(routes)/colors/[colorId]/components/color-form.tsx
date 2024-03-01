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
import { Color } from "@prisma/client";

const formSchema = z.object({
	name: z.string().min(1),
	value: z.string().min(4).regex(/^#/, {message: "Chỉ chấp nhận mã màu, ví dụ: #FFFFFF"}),
});

type ColorFormValues = z.infer<typeof formSchema>;

interface SettingsFormProps {
	initialData: Color | null;
}

export const ColorForm: React.FC<SettingsFormProps> = ({ initialData }) => {
	const params = useParams();
	const router = useRouter();
	const origin = useOrigin();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const title = initialData
		? "Sửa Màu"
		: "Tạo mới Màu";
	const description = initialData
		? "Chỉnh Sửa Trang Màu sắc này"
		: "Tạo Màu mới để dùng xuyên suốt trang sản phẩm";
	const toastMessage = initialData
		? "Đã cập nhật Trang Màu sắc"
		: "Trang Màu sắc đã được tạo mới.";
	const action = initialData ? "Lưu thay đổi" : "Tạo mới";

	const form = useForm<ColorFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: "",
			value: "",
		},
	});

	const onSubmit = async (data: ColorFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/colors/${params.colorId}`,
					data
				);
			} else {
				await axios.post(`/api/${params.storeId}/colors`, data);
			}
			// await axios.post(`/api/stores/${params.storeId}/sizes`, data);
			router.refresh(); //Re-sync server component
			router.push(`/${params.storeId}/colors`);
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
			await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
			router.refresh();
			router.push(`/${params.storeId}/colors`);
			toast.success("Đã bỏ Màu này");
		} catch (error) {
			toast.error("");
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
									<FormLabel>Màu sắc mới</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="VD: Màu đỏ, vàng, xanh..."
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
									<FormLabel>Mã Màu sắc</FormLabel>
									<FormControl>
									{/* flex items-center gap-x-4 */}
										<div className="flex items-center gap-x-4">
											<Input
												disabled={loading}
												placeholder="#FFFFFF"
												{...field}
											/>
											<div className="border p-4 rounded-full" style={{ backgroundColor: field.value }}/>
										</div>
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
