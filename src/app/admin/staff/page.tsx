import { getStaff } from "@/lib/data-store";
import StaffAdminClient from "./StaffAdminClient";

export default function AdminStaffPage() {
  const staff = getStaff();
  return <StaffAdminClient staff={staff} />;
}
