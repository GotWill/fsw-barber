import { db } from "@/app/_lib/prisma";
import BarberShopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";

interface BarberShopProps {
  params: {
    id?: string;
  };
}

const BarberShopDetailsPage = async ({ params }: BarberShopProps) => {
  if (!params.id) {
    return null;
  }

  const barberShop = await db.barberShop.findUnique({
    where: { id: params.id },
    include: {
      services: true,
    },
  });

  if (!barberShop) {
    return null;
  }

  console.log(barberShop.services);

  return (
    <div>
      <BarberShopInfo barberShop={barberShop} key={barberShop.id} />
      <div className="px-5 flex flex-col gap-4 py-3">
        {barberShop.services.map((service) => (
          <ServiceItem service={service} key={service.id} />
        ))}
      </div>
    </div>
  );
};

export default BarberShopDetailsPage;
