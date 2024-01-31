import { ptBR } from "date-fns/locale";
import Header from "../_components/header";
import { format } from "date-fns";
import Search from "./_components/Search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarberShopItem from "./_components/barbershop-item";

export default async function Home() {

  const barberShop = await db.barberShop.findMany()

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Miguel</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM  ", { locale: ptBR })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
        <BookingItem/>
      </div>

      <div className="mt-6 px-4">
       <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Recomendados</h2>
        <div className="grid grid-cols-2 gap-4">
         {barberShop.map(item => <BarberShopItem barbershop={item} key={item.id}/>)}
        </div>
      </div>

      <div className="mt-6 px-4 mb-[4.5rem]">
       <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Populares</h2>
        <div className="grid grid-cols-2 gap-4">
         {barberShop.map(item => <BarberShopItem barbershop={item} key={item.id}/>)}
        </div>
      </div>
    </div>
  );
}
