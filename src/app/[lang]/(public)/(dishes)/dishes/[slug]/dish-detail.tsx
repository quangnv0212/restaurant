import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import { DishResType } from '../../schemaValidations/dish.schema';

export default async function DishDetail({
  dish,
}: {
  dish: DishResType['data'] | undefined;
}) {
  if (!dish)
    return (
      <div>
        <h1 className="text-2xl font-semibold lg:text-3xl">Not found</h1>
      </div>
    );
  return (
    <div className="grid h-screen grid-cols-1 gap-4 sm:grid-cols-2">
      <Image
        src={dish.image}
        width={700}
        height={700}
        quality={100}
        alt={dish.name}
        className="h-full max-h-[1080px] w-full max-w-[1080px] rounded-md object-cover"
        title={dish.name}
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold lg:text-3xl">{dish.name}</h1>
        <div className="font-semibold">Price: {formatCurrency(dish.price)}</div>
        <div dangerouslySetInnerHTML={{ __html: dish.description }} />
      </div>
    </div>
  );
}
