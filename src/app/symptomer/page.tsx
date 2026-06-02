import { CatalogueDrawer } from "@/components/catalogue/CatalogueDrawer";
import { PAGE_COPY } from "@/components/catalogue/items";
import { CtaCloseout } from "@/components/home/CtaCloseout";

export default function SymptomerPage() {
  const { title, lead, items } = PAGE_COPY.symptomer;
  return (
    <>
      <CatalogueDrawer title={title} lead={lead} items={items} />
      <CtaCloseout />
    </>
  );
}
