import ItemsList from '@/components/main/estates/ItemsList';
import { estateStatuses } from '@/data/estates.data.ts/estates';

import { notFound } from 'next/navigation';

export function generateStaticParams() {
   return estateStatuses.map((status) => ({
      status: status.slug,
   }));
}

interface Props {
   params: Promise<{ status: string }>;
}

const page: React.FC<Props> = async ({ params }) => {
   const { status } = await params;
   if (!estateStatuses.find((s) => s.slug === status)) {
      return notFound();
   }
   return <ItemsList status={status} />;
};

export default page;
