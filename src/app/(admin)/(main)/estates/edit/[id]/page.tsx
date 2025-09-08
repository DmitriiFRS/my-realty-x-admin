import AddOrEditManualEstate from '@/components/main/estates/AddOrEditManualEstate';
import { entitiesService } from '@/service/entities/entities.service';
import { notFound } from 'next/navigation';

interface Props {
   params: Promise<{ id: string }>;
}

const page: React.FC<Props> = async ({ params }) => {
   const { id } = await params;
   const data = await entitiesService.getEntity(`estates/estate/${id}`);
   if (!data) {
      return notFound();
   }
   const [estateTypesData, roomsData, dealTermsData, citiesData, currencyTypesData, districtsData, estateFeaturesData] = await Promise.all([
      entitiesService.getEntity('estate-types'),
      entitiesService.getEntity('rooms'),
      entitiesService.getEntity('deal-terms'),
      entitiesService.getEntity('cities'),
      entitiesService.getEntity('currency-types'),
      entitiesService.getEntity('districts'),
      entitiesService.getEntity('estate-features'),
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
