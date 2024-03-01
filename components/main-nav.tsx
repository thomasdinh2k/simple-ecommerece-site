"use client";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();
    const routes = [
        {
            href: `/${params.storeId}/`,
            label: 'Trang tổng quan',
            active: pathname === `/${params.storeId}/`,
        },
        {
            href: `/${params.storeId}/billboards`,
            label: 'Bảng Billboard',
            active: pathname === `/${params.storeId}/billboards`,
        },
        {
            href: `/${params.storeId}/categories`,
            label: 'Danh mục sản phẩm',
            active: pathname === `/${params.storeId}/categories`,
        },
        {
            href: `/${params.storeId}/sizes`,
            label: 'Kích thước',
            active: pathname === `/${params.storeId}/sizes`,
        },
        {
            href: `/${params.storeId}/colors`,
            label: 'Màu sắc',
            active: pathname === `/${params.storeId}/colors`,
        },
        {
            href: `/${params.storeId}/settings`,
            label: 'Cài đặt',
            active: pathname === `/${params.storeId}/settings`,
        }
    ];

    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
        {routes.map( (route) => (
            <Link 
                key={route.href} 
                href={route.href} 
                className={
                    cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    
                    )
                }
            >
                    {route.label}
            </Link>
        ))}
    </nav>  
    );
};