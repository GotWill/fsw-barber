import { da, ptBR } from "date-fns/locale";
import Header from "../_components/header";
import { format, isFuture } from "date-fns";
import Search from "./_components/Search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarberShopItem from "./_components/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import imageUrl from "../../../public/bg-home.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../_components/ui/carousel";

export default async function Home() {
  const barberShop = await db.barberShop.findMany();
  const recomendsBarberShop = await db.barberShop.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const session = await getServerSession(authOptions);

  const booking = session?.user
    ? await db.booking.findMany({
        include: {
          barbershop: true,
          service: true,
        },
        where: {
          userId: session.user.id,
          date: {
            gte: new Date(),
          },
        },
      })
    : [];

  return (
    <div>
      <Header />

      <div className="px-5 pt-5 md-desk:hidden">
        <h2 className="text-xl font-bold">
          {session?.user
            ? `Olá, ${session.user.name.split(" ")[0]}`
            : "Olá!, Vamos agendar um corte hoje?"}
        </h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM  ", { locale: ptBR })}
        </p>
      </div>

      <div className="px-5 mt-6 md-desk:hidden">
        <Search />
      </div>

      <div className="px-5 mt-6 md-desk:hidden">
        {booking.length > 0 && (
          <>
            <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">
              Agendamentos
            </h2>
            <div className="flex flex-col gap-3">
              {booking.map((booking) => (
                <BookingItem booking={booking} key={booking.id} />
              ))}
            </div>
          </>
        )}
      </div>

      <div
        className={`md-mobol:hidden bg-black p-10 bg-home bg-heroImage h-[463px] bg-cover`}
      >
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-bold">
                {session?.user
                  ? `Olá, ${session.user.name.split(" ")[0]}`
                  : "Olá!, Vamos agendar um corte hoje?"}
              </h2>
              <p className="capitalize text-sm">
                {format(new Date(), "EEEE',' dd 'de' MMMM  ", { locale: ptBR })}
              </p>
            </div>
            <div className="w-[391px]">
              <Search />
            </div>

            <div className="w-[439px]">
              {booking.length > 0 && (session.user as any).id && (
                <>
                  <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">
                    Agendamentos
                  </h2>
                  <div className="flex flex-col gap-3">
                    {booking.map((booking) => (
                      <BookingItem booking={booking} key={booking.id} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="max-w-[640px]">
            <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">
              Recomendados
            </h2>
            <Carousel
              orientation="horizontal"
              className="w-full"
              opts={{
                align: "start",
                skipSnaps: true,
              }}
            >
              <CarouselContent className="p-0">
                {barberShop.map((item) => (
                  <CarouselItem className=" pl-5" key={item.id}>
                    <BarberShopItem barbershop={item} key={item.id} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>

      <div className="mt-6 px-4 md-desk:max-w-[1240px] md-desk:mx-auto">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">
          Recomendados
        </h2>
        <div className="grid grid-cols-2 gap-4 md-desk:hidden">
          {barberShop.map((item) => (
            <BarberShopItem barbershop={item} key={item.id} />
          ))}
        </div>
        <div className="w-full md-mobol:hidden">
          <Carousel
            orientation="horizontal"
            className="w-full"
            opts={{
              align: "start",
              skipSnaps: true,
            }}
          >
            <CarouselContent className="p-0">
              {barberShop.map((item) => (
                <CarouselItem className=" pl-5" key={item.id}>
                  <BarberShopItem barbershop={item} key={item.id} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      <div className="mt-6 px-4 mb-[4.5rem] md-desk:max-w-[1240px] md-desk:mx-auto">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">
          Populares
        </h2>
        <div className="grid grid-cols-2 gap-4 md-desk:hidden">
          {recomendsBarberShop.map((item) => (
            <>
              <BarberShopItem barbershop={item} key={item.id} />
            </>
          ))}
        </div>

        <div className="w-full md-mobol:hidden">
          <Carousel
            orientation="horizontal"
            className="w-full"
            opts={{
              align: "start",
              skipSnaps: true,
            }}
          >
            <CarouselContent className="p-0">
              {recomendsBarberShop.map((item) => (
                <CarouselItem className=" pl-5" key={item.id}>
                  <BarberShopItem barbershop={item} key={item.id} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
