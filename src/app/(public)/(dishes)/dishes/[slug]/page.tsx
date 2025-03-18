import dishApiRequest from '@/app/(public)/(dishes)/apiRequests/dish';
import DishDetail from '@/app/(public)/(dishes)/dishes/[slug]/dish-detail';
import { getIdFromSlugUrl } from '@/lib/utils';

export default async function DishPage(props: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const params = await props.params;

  const { slug } = params;

  const id = getIdFromSlugUrl(slug);
  const data = await dishApiRequest.getDish(id);
  const dish = data?.payload?.data;
  return <DishDetail dish={dish} />;
}
