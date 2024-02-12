import { redirect } from "next/navigation";
import BarberShopItem from "../(home)/_components/barbershop-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import Search from "../(home)/_components/Search";

interface BarberShopProps {
  searchParams: {
    search?: string;
  };
}

const BarberShopPage = async ({ searchParams }: BarberShopProps) => {

 

  if (!searchParams.search) {
    return redirect("/");
  }
  const barberShop = await db.barberShop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });
  return (
    <>
      <Header />

      <div className="px-5 py-6 flex flex-col gap-6 md-desk:max-w-[1200px] md-desk:mx-auto">
        <div className="md-desk:hidden">
          <Search
            defaultValues={{
              search: searchParams.search,
            }}
          />
        </div>

        <h1 className="text-gray-400 font-bold text-xs uppercase">
          Resultados para *{searchParams.search}*
        </h1>

        <div className="grid grid-cols-2 gap-4 md-desk:flex md-desk:gap-4">
          {barberShop.map((barbershop) => (
            <div className="w-full md-desk:max-w-[220px] md-desk:w-full" key={barbershop.id}>
              <BarberShopItem barbershop={barbershop} key={barbershop.id} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BarberShopPage;
