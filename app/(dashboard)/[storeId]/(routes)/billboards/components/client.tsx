"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BillboardColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/date-table"
import { ApiList } from "@/components/ui/api-list"

interface BillboardClientProps {
    data: BillboardColumn[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {
    
    const router = useRouter();
    const params = useParams();
    
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboards (${data.length})`}
                    description="Quản lý trang Billboard cửa hàng của bạn"
                />
                <Button onClick={ () => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tạo mới
                </Button>
            </div>
            <Separator />
            <DataTable 
                searchKey="label"
                columns={columns}
                data={data}
            />
            <Heading 
                title="API"
                description="API cho Billboards"
            />
            <Separator/>
            <ApiList 
                entityName="billboards"
                entityIdName="billboardId"
            />
        </>
    )
}