import AddOrEditManualEstate from '@/components/main/estates/AddOrEditManualEstate';
import { entitiesService } from '@/service/entities/entities.service';

const ManualPage = async () => {
   // const estateTypesData = await entitiesService.getEntity('estate-types');

   const [estateTypesData, roomsData, dealTermsData, citiesData, currencyTypesData, districtsData] = await Promise.all([
      entitiesService.getEntity('estate-types'),
      entitiesService.getEntity('rooms'),
      entitiesService.getEntity('deal-terms'),
      entitiesService.getEntity('cities'),
      entitiesService.getEntity('currency-types'),
      entitiesService.getEntity('districts'),
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
         districts={districtsData}
      />
   );
};

export default ManualPage;
