import AddOrEditManualEstate from '@/components/main/estates/AddOrEditManualEstate';
import { serverEntitiesService } from '@/service/entities/serverEntities.service';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

interface Props {
   params: Promise<{ id: string }>;
}

const page: React.FC<Props> = async ({ params }) => {
   const { id } = await params;
   const cookieStore = await cookies();
   const token = cookieStore.get('admin-token')?.value;
   const data = await serverEntitiesService.getEntity(`estates/estate/${id}`, token);
   if (!data) {
      return notFound();
   }
   const [estateTypesData, roomsData, dealTermsData, citiesData, currencyTypesData, districtsData, estateFeaturesData] = await Promise.all([
      serverEntitiesService.getEntity('estate-types', token),
      serverEntitiesService.getEntity('rooms', token),
      serverEntitiesService.getEntity('deal-terms', token),
      serverEntitiesService.getEntity('cities', token),
      serverEntitiesService.getEntity('currency-types', token),
      serverEntitiesService.getEntity('districts', token),
      serverEntitiesService.getEntity('estate-features', token),
   ]);

   if (!estateTypesData || !roomsData || !dealTermsData || !citiesData || !currencyTypesData || !districtsData || !estateFeaturesData) {
      return <div>Error loading data</div>;
   }

   return (
      <AddOrEditManualEstate
         estateTypes={estateTypesData}
         rooms={roomsData}
         dealTerms={dealTermsData}
         cities={citiesData}
         currencyTypes={currencyTypesData}
         districts={districtsData}
         estateFeatures={estateFeaturesData}
         estate={data.data}
      />
   );
};

export default page;
