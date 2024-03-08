"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
	id: string;
	name: string;
	price: string;
	size: string;
	category: string;
	color: string;
	isFeatured: boolean;
	isArchived: boolean;
	createAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
	{
		accessorKey: "name",
		header: "Tên",
	},
	{
		accessorKey: "isArchived",
		header: "Được Lưu trữ"
	},
	{
		accessorKey: "isFeatured",
		header: "Được ưu tiên"
	},
	{
		accessorKey: "price",
		header: "Giá"
	},
	{
		accessorKey: "size",
		header: "Kích cỡ"
	},
	{
		accessorKey: "color",
		header: "Màu",
		cell: ({row}) => (
			<div className="flex items-center gap-x-2">
				{row.original.color}
				<div className="h-6 w-6 rounded-full border"
					style={{ backgroundColor: row.original.color }}
				/>
			</div>
		)
	},
	{
		accessorKey: "category",
		header: "Phân loại"
	},

	{
		accessorKey: "createAt",
		header: "Ngày tạo",
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
