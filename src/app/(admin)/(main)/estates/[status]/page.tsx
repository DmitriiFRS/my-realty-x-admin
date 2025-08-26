import EstateList from '@/components/main/estates/EstateList';
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
   console.log('Status:', status);
   if (!estateStatuses.find((s) => s.slug === status)) {
      return notFound();
   }
   return <EstateList />;
};

export default page;
