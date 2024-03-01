"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ColorColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/date-table";
import { ApiList } from "@/components/ui/api-list";

interface ColorsClientProps {
	data: ColorColumn[];
}

export const ColorsClient: React.FC<ColorsClientProps> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Màu hiện tại có: (${data.length})`}
					description="Quản lý trang màu sắc"
				/>
				<Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
					<Plus className="mr-2 h-4 w-4" />
					Tạo mới
				</Button>
			</div>
			<Separator />
			<DataTable searchKey="name" columns={columns} data={data} />
			<Heading title="API" description="API cho Màu sắc" />
			<Separator />
			<ApiList entityName="colors" entityIdName="colorId" />
		</>
	);
};
