import { db } from "@/app/_lib/prisma";
import BarberShopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

interface BarberShopProps {
  params: {
    id?: string;
  };
}

const BarberShopDetailsPage = async ({ params }: BarberShopProps) => {
  
  const session = await getServerSession(authOptions)

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

  return (
    <div>
      <BarberShopInfo barberShop={barberShop} key={barberShop.id} />
      <div className="px-5 flex flex-col gap-4 py-3">
        {barberShop.services.map((service) => (
          <ServiceItem
          barberShop={barberShop}
            service={service}
            key={service.id}
            isAutenticated={!!session?.user}
          />
        ))}
      </div>
    </div>
  );
};

export default BarberShopDetailsPage;
