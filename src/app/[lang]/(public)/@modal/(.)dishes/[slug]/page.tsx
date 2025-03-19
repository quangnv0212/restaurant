import DishDetail from '@/app/[lang]/(public)/(dishes)/dishes/[slug]/dish-detail';
import Modal from '@/app/[lang]/(public)/@modal/(.)dishes/[slug]/modal';
import { getIdFromSlugUrl } from '@/lib/utils';
import dishApiRequest from '../../../(dishes)/apiRequests/dish';

export default async function DishPage(props: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const params = await props.params;

  const { slug } = params;

  const id = getIdFromSlugUrl(slug);
  const data = await dishApiRequest.getDish(Number(id));

  const dish = data?.payload?.data;
  return (
    <Modal>
      <DishDetail dish={dish} />
    </Modal>
  );
}
