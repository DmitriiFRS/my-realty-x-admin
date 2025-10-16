import AddOrEditManualEstate from '@/components/main/estates/AddOrEditManualEstate';
import { serverEntitiesService } from '@/service/entities/serverEntities.service';
import { cookies } from 'next/headers';

const ManualPage = async () => {
   // const estateTypesData = await entitiesService.getEntity('estate-types');
   const cookieStore = await cookies();
   const token = cookieStore.get('admin-token')?.value;

   const [estateTypesData, roomsData, dealTermsData, citiesData, currencyTypesData, districtsData, estateFeaturesData] = await Promise.all([
      serverEntitiesService.getEntity('estate-types', token),
      serverEntitiesService.getEntity('rooms', token),
      serverEntitiesService.getEntity('deal-terms', token),
      serverEntitiesService.getEntity('cities', token),
      serverEntitiesService.getEntity('currency-types', token),
      serverEntitiesService.getEntity('districts', token),
      serverEntitiesService.getEntity('estate-features', token),
   ]);

   if (!estateTypesData || !roomsData || !dealTermsData || !citiesData || !currencyTypesData || !districtsData) {
      return <div>Error loading data</div>;
   }

   return (
      <AddOrEditManualEstate
         estateTypes={estateTypesData}
         rooms={roomsData}
         dealTerms={dealTermsData}
         cities={citiesData}
         currencyTypes={currencyTypesData}
         estateFeatures={estateFeaturesData}
         districts={districtsData}
      />
   );
};

export default ManualPage;
