import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { authOptions } from "../_lib/auth";

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

      <div className="px-5 py-6">
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
    </>
  );
};

export default BookingPage;
