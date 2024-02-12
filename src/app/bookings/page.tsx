import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { authOptions } from "../_lib/auth";
import BarberShopInfo from "../barbershop/[id]/_components/barbershop-info";

const BookingPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const [confirmedBookings, finshedBooking] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),

    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ]);

  return (
    <>
      <Header />

      <div className="md-desk:flex md-desk:items-center md-desk:gap-5 md-desk:max-w-[1200px] md-desk:mx-auto">
        <div className="px-5 py-6 md-desk:max-w-[100%] md-desk:w-full">
          <h1 className="text-xl font-bold mb-6">Agendamentos</h1>

          {confirmedBookings.length > 0 && (
            <>
              <h2 className="text-gray-400 font-bold uppercase text-sm mt-6 mb-3">
                Confirmados
              </h2>
              <div className="flex flex-col gap-3">
                {confirmedBookings.map((booking) => (
                    <BookingItem booking={booking} key={booking.id} />
                ))}
              </div>
            </>
          )}

          {finshedBooking.length > 0 && (
            <>
              <h2 className="text-gray-400 font-bold uppercase text-sm mt-6 mb-3">
                Finalizados
              </h2>
              <div className="flex flex-col gap-3">
                {finshedBooking.map((booking) => (
                  <BookingItem booking={booking} key={booking.id} />
                ))}
              </div>
            </>
          )}
        </div>
        <div>{/* <BarberShopInfo/> */}</div>
      </div>
    </>
  );
};

export default BookingPage;
