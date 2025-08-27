import ItemsList from '@/components/main/estates/ItemsList';
import { estateStatuses } from '@/data/estates.data.ts/estates';
import { entitiesService } from '@/service/entities/entities.service';
import { IEstatesResponse } from '@/types/estates.type';
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

   const data: IEstatesResponse = await entitiesService.getEntity(`estates/${status}`);
   if (!data) return <div>Not Found</div>;
   return <ItemsList data={data} />;
};

export default page;
