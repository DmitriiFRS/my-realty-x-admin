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

   console.log('estateTypesData:', estateTypesData);
   console.log('roomsData:', roomsData);
   console.log('dealTermsData:', dealTermsData);
   console.log('citiesData:', citiesData);
   console.log('currencyTypesData:', currencyTypesData);
   console.log('districtsData:', districtsData);

   if (!estateTypesData || !roomsData || !dealTermsData || !citiesData || !currencyTypesData || !districtsData) {
      return <div>Error loading data</div>;
   }

   return <AddOrEditManualEstate />;
};

export default ManualPage;
