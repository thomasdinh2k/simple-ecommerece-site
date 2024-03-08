"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BillboardColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
	data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id);
		toast.success(
			<div>
				Đường dẫn của <span style={{ fontStyle: "italic" }}>Billboard </span>{" "}
				<strong>{id}</strong> đã được đưa vào clipboard
			</div>
		);
	};

	async function onConfirm() {
		try {
			setLoading(true);
			await axios.delete(
				`/api/${params.storeId}/billboards/${data.id}`
			);
			toast.success("Billboard đã được xóa");
			router.refresh();
		} catch (error) {
			toast.error(
				"Chắc chắn rằng bạn đã xóa bỏ hết phân loại của Billboard này trước!"
			);
		} finally {
			setLoading(false);
			setOpen(false);
		}
	}

	const router = useRouter();
	const params = useParams();

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onConfirm}
				loading={loading}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Hành động</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Hành động</DropdownMenuLabel>

					<DropdownMenuItem
						onClick={() =>
							router.push(`
	                    /${params.storeId}/billboards/${data.id}
	                `)
						}>
						<Edit className="mr-2 h-4 w-4" />
						Chỉnh sửa
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => onCopy(data.id)}>
						<Copy className="mr-2 h-4 w-4" />
						Sao chép ID
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Trash className="mr-2 h-4 w-4" onClick={() => setOpen(true)} />Xóa
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
