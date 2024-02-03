import { format, isFuture, isPast } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

import { Prisma } from "@prisma/client";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true,
            barbershop: true
        }
    }>
}


const BookingItem = ({booking}: BookingItemProps) => {

    const isBooking = isFuture(booking.date)

    return ( 
        <Card>
            <CardContent className="py-5 flex px-0">
                <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
                    <Badge variant={ isBooking ? 'default' : 'secondary'} className="bg-[#221C3D]  hover:bg-[#221C3D] w-fit">
                        {
                            isBooking ? 'Confirmado' : 'Finalizado'
                        }
                    </Badge>
                    <h2 className="font-bold">{booking.service.name}</h2>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={booking.barbershop.imageUrl}/>

                            <AvatarFallback></AvatarFallback>
                        </Avatar>
                        <h3 className="text-sm">{booking.barbershop.name}</h3>
                    </div>
                </div>
                <div className="flex flex-1 flex-col justify-center items-center border-l border-solid border-secondary">
                    <p className="text-sm capitalize">{format(booking.date, "MMMM",{locale: ptBR})}</p>
                    <p className="text-2xl">{format(booking.date, "dd")}</p>
                    <p className="text-sm">{format(booking.date, "hh:mm")}</p>
                </div>
            </CardContent>
        </Card>
     );
}
 
export default BookingItem;