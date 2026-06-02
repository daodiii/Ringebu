import { CatalogueDrawer } from "@/components/catalogue/CatalogueDrawer";
import { PAGE_COPY } from "@/components/catalogue/items";
import { CtaCloseout } from "@/components/home/CtaCloseout";

export default function BehandlingerPage() {
  const { title, lead, items } = PAGE_COPY.behandlinger;
  return (
    <>
      <CatalogueDrawer title={title} lead={lead} items={items} />
      <CtaCloseout />
    </>
  );
}
