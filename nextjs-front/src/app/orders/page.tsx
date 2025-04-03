"use client"
import { UsersTable } from "@/components/users-table";
import { users } from "@/app/data/users";


export default function Page() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">User Management</h1>
      <UsersTable users={users} />
    </div>
  )
}

