"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/date-table";
import { ApiList } from "@/components/ui/api-list";

interface BillboardClientProps {
	data: ProductColumn[];
}

export const ProductClient: React.FC<BillboardClientProps> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Sản phẩm (${data.length})`}
					description="Quản lý trang Sản phẩm"
				/>
				<Button
					onClick={() => router.push(`/${params.storeId}/products/new`)}>
					<Plus className="mr-2 h-4 w-4" />
					Tạo mới
				</Button>
			</div>
			<Separator />
			<DataTable searchKey="name" columns={columns} data={data} />
			<Heading title="API" description="API cho Sản phẩm" />
			<Separator />
			<ApiList entityName="Products" entityIdName="productId" />
		</>
	);
};
