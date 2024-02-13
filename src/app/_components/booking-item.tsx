"use client";
import { format, isFuture, isPast } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

import { Prisma } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { CancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import BookingInfo from "./booking-info";
import { getSession, useSession } from "next-auth/react";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isDeletedLoading, setIsDeletLoading] = useState<boolean>(false);
  const isBooking = isFuture(booking.date);

 const {data} = useSession()

  const handleCancelClick = async () => {
    setIsDeletLoading(true);
    try {
    const response =  await CancelBooking(booking.id, (data?.user as any).id);
    console.log(response)
  
      toast.success("Reservar cancelada com sucesso");
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeletLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card>
          <CardContent className="py-5 flex px-0">
            <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
              <Badge
                variant={isBooking ? "default" : "secondary"}
                className="bg-[#221C3D]  hover:bg-[#221C3D] w-fit"
              >
                {isBooking ? "Confirmado" : "Finalizado"}
              </Badge>
              <h2 className="font-bold">{booking.service.name}</h2>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.barbershop.imageUrl} />

                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-center items-center border-l border-solid border-secondary">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">{format(booking.date, "dd")}</p>
              <p className="text-sm">{format(booking.date, "hh:mm")}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="px-0 md-desk:max-w-[400px]">
        <SheetHeader className="px-5 text-left pb-6 border-b border-solid border-secondary">
          <SheetTitle>Informações da reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative h-[180px] w-full mt-6">
            <Image src="/maps.png" alt={booking.barbershop.name} fill />

            <div className="w-full absolute bottom-4 left-0 px-5">
              <Card className="">
                <CardContent className="p-3 flex gap-2">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>
                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
                      {booking.barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            variant={isBooking ? "default" : "secondary"}
            className="w-fit mt-3 my-3"
          >
            {isBooking ? "Confirmado" : "Finalizado"}
          </Badge>

          <BookingInfo booking={{
            barbeshop: booking.barbershop,
            service: booking.service,
            date: booking.date
          }}/>

          <SheetFooter className="flex gap-3 mt-6">
            <SheetClose asChild>
              <Button className="w-full" variant="secondary">
                Voltar
              </Button>
            </SheetClose>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full" variant="destructive">
                  Cancelar Reserva
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Deseja mesmo cancelar essa reservar?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja cancelar esse agendamento?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex gap-3">
                  <AlertDialogCancel className="w-full mt-0">
                    Voltar
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    disabled={!isBooking || isDeletedLoading}
                    onClick={handleCancelClick}
                    className="w-full"
                    
                  >
                    {isDeletedLoading && (
                      <Loader2 className="mr-4 h-4 w-4 animate-spin" />
                    )}
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
