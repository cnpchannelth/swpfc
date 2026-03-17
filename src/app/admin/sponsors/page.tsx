import { getSponsors } from "@/lib/data-store";
import SponsorsAdminClient from "./SponsorsAdminClient";

export default function AdminSponsorsPage() {
  const sponsors = getSponsors();
  return <SponsorsAdminClient sponsors={sponsors} />;
}
