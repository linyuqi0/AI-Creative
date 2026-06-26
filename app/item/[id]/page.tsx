import { creativeItems } from "@/data/mock";
import ItemDetailClient from "./ItemDetailClient";

export function generateStaticParams() {
  return creativeItems.map((item) => ({
    id: item.id,
  }));
}

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  return <ItemDetailClient id={params.id} />;
}
