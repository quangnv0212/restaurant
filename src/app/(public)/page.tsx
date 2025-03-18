import { formatCurrency, generateSlugUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import dishApiRequest from './(dishes)/apiRequests/dish';
import { DishListResType } from './(dishes)/schemaValidations/dish.schema';

export default async function Home() {
  let dishList: DishListResType['data']['items'] = [];
  try {
    const result = await dishApiRequest.list({
      limit: 10,
      page: 1,
    });
    const {
      payload: { data },
    } = result;
    dishList = data.items;
  } catch (error) {
    console.log(error);

    return <div>Something went wrong</div>;
  }
  return (
    <div className="w-full space-y-4">
      <section className="relative z-10">
        <span className="absolute top-0 left-0 z-10 h-full w-full bg-black opacity-50"></span>
        <Image
          src="/banner.png"
          width={400}
          height={200}
          quality={80}
          loading="lazy"
          alt="Banner"
          className="absolute top-0 left-0 h-full w-full object-cover"
        />
        <div className="relative z-20 px-4 py-10 sm:px-10 md:px-20 md:py-20">
          <h1 className="text-center text-xl font-bold sm:text-2xl md:text-4xl lg:text-5xl">
            Title
          </h1>
          <p className="mt-4 text-center text-sm sm:text-base">Slogan</p>
        </div>
      </section>
      <section className="space-y-10 py-16">
        <h2 className="text-center text-2xl font-bold">Title</h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {dishList.map(dish => (
            <Link
              href={`/dishes/${generateSlugUrl({
                name: dish.name,
                id: dish.id,
              })}`}
              className="w flex gap-4"
              key={dish.id}
            >
              <div className="flex-shrink-0">
                <Image
                  src={dish.image}
                  width={150}
                  height={150}
                  quality={80}
                  loading="lazy"
                  alt={dish.name}
                  className="h-[150px] w-[150px] rounded-md object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{dish.name}</h3>
                <div dangerouslySetInnerHTML={{ __html: dish.description }} />
                <p className="font-semibold">{formatCurrency(dish.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
