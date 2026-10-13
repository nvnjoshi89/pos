import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function UserManagementPage() {
  return (
    <div>
      <Breadcrumb className="ml-4 mt-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>User Management</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="ring-0">
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <Button size={"default"} className="bg-blue-400 hover:bg-blue-500">
            <PlusIcon className="mr-2 size-2" />
            Create User
          </Button>
        </CardHeader>
      </Card>
    </div>
  );
}
