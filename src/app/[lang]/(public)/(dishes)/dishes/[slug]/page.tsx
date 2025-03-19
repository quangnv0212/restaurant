import DishDetail from '@/app/[lang]/(public)/(dishes)/dishes/[slug]/dish-detail';
import { getIdFromSlugUrl } from '@/lib/utils';
import dishApiRequest from '../../apiRequests/dish';

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
