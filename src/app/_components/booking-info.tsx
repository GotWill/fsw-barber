import { BarberShop, Booking, Prisma, Service } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

interface BookingInfoProps {
    booking: Partial<Pick<Booking, "date">> & {
    service: Pick<Service, "name" | "price">;
    barbeshop: Pick<BarberShop, "name">;
  };
}

const BookingInfo = ({ booking }: BookingInfoProps) => {
  return (
      <Card>
        <CardContent className="p-3 flex flex-col gap-3">
          <div className="flex justify-between">
            <h2 className="font-bold">{booking.service.name}</h2>
            <h3 className="font-bold text-sm">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(booking.service.price))}
            </h3>
          </div>
          {booking.date && (
            <>
              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Data</h3>
                <p className="text-sm">
                  {format(booking.date, "dd 'de' MMMM ", { locale: ptBR })}
                </p>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Horário</h3>
                <p className="text-sm">{format(booking.date, "hh:mm")}</p>
              </div>
            </>
          )}

          <div className="flex justify-between">
            <h3 className="text-gray-400 text-sm">Barbearia</h3>
            <p className="text-sm">{booking.barbeshop.name}</p>
          </div>
        </CardContent>
      </Card>
  );
};

export default BookingInfo;
