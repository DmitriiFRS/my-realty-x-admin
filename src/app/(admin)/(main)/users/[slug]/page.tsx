import UserItemsList from '@/components/main/users/UserItemsList';
import { commonService } from '@/service/common.service';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

interface Props {
   params: Promise<{ slug: string }>;
}

const page: React.FC<Props> = async ({ params }) => {
   const { slug } = await params;
   const cookieStore = await cookies();
   const token = cookieStore.get('admin-token')?.value;
   const { data } = await commonService.getData(`users/role/${slug}`, token);
   if (!data || data.length === 0) return notFound();

   return <UserItemsList slug={slug} />;
};

export default page;
