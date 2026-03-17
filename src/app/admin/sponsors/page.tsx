import { getSponsors } from "@/lib/data-store";
import SponsorsAdminClient from "./SponsorsAdminClient";



export default async function AdminSponsorsPage() {
  const sponsors = await getSponsors();
  return <SponsorsAdminClient sponsors={sponsors} />;
}
