"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard, Category } from "@prisma/client";
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
import { useOrigin } from "@/hooks/use-origin";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { BillboardClient } from "../../../billboards/components/client";

const formSchema = z.object({
	name: z.string().min(1),
	billboardId: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface SettingsFormProps {
	initialData: Category | null;
	billboards: Billboard[];
}

export const CategoryForm: React.FC<SettingsFormProps> = ({
	initialData,
	billboards,
}) => {
	const params = useParams();
	const router = useRouter();
	const origin = useOrigin();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const title = initialData ? "Sửa Danh mục" : "Tạo mới Danh mục";
	const description = initialData
		? "Chỉnh Sửa Danh mục này"
		: "Tạo một Danh mục mới";
	const toastMessage = initialData
		? "Đã cập nhật Danh mục"
		: "Danh mục đã được tạo mới.";
	const action = initialData ? "Lưu thay đổi" : "Tạo mới";

	const form = useForm<CategoryFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: "",
			billboardId: "",
		},
	});

	const onSubmit = async (data: CategoryFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/categories/${params.categoryId}`,
					data
				);
			} else {
				await axios.post(`/api/${params.storeId}/categories`, data);
			}
			// await axios.post(`/api/stores/${params.storeId}/categories`, data);
			router.refresh(); //Re-sync server component
			router.push(`/${params.storeId}/categories`);
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
				`/api/${params.storeId}/categories/${params.categoryId}`
			);
			router.refresh();
			router.push(`/${params.storeId}/categories`);
			toast.success("Danh mục này đã được xóa");
		} catch (error) {
			toast.error(
				"Chắc chắn rằng bạn đã xóa bỏ hết sản phẩm của Billboard này trước!"
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
									<FormLabel>Tên danh mục</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Tên danh mục mới ..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="billboardId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Billboard</FormLabel>
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="Chọn Billboard" />
										</SelectTrigger>
										<SelectContent>
											{billboards.map((billboard) => (
												<SelectItem key={billboard.id} value={billboard.id}>
													{billboard.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
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
