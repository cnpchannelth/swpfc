import { getStaff } from "@/lib/data-store";
import StaffAdminClient from "./StaffAdminClient";



export default async function AdminStaffPage() {
  const staff = await getStaff();
  return <StaffAdminClient staff={staff} />;
}
