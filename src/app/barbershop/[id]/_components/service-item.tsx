"use client";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { BarberShop, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { format, setHours, setMinutes } from "date-fns";
import { saveBooking } from "../_actions/save-booking";
import { Loader2 } from "lucide-react";

interface ServiceItemProps {
  barberShop: BarberShop;
  service: Service;
  isAutenticated?: boolean;
}

const ServiceItem = ({
  service,
  isAutenticated,
  barberShop,
}: ServiceItemProps) => {

  const {data} = useSession()

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>()

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  
  const handleBookingSubmit = async () => {
    setIsLoading(true)
    try {

      if(!hour || !date || !data?.user){
        return 
      }


      const dateHour = Number(hour.split(":")[0])
      const dateMinutes = Number(hour.split(":")[1])
      const newDate = setMinutes(setHours(date, dateHour), dateMinutes)

     await saveBooking({
      serviceId: service.id,
      barbershopId: barberShop.id,
      date: newDate,
      userId: (data.user as any).id
     })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

  const handleBookingClick = () => {
    if (!isAutenticated) {
      signIn("google");
    }
  };

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-4 items-center">
          <div className="relative min-h-[110px] max-h-[110px] max-w-[110px] min-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              style={{ objectFit: "contain" }}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex items-center justify-between mt-2">
              <p className="text-primary font-bold text-sm">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" onClick={handleBookingClick}>
                    Reservar
                  </Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                    <SheetTitle>Fazer reservar</SheetTitle>
                  </SheetHeader>

                  <div className="py-6">
                    <Calendar
                      mode="single"
                      selected={date}
                      fromDate={new Date()}
                      onSelect={handleDateClick}
                      locale={ptBR}
                      className="mt-6"
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {date && (
                    <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden py-4 px-5 border-t border-solid border-secondary">
                      {timeList.map((time) => (
                        <Button
                          onClick={() => handleHourClick(time)}
                          variant={hour === time ? "default" : "outline"}
                          className="rounded-full"
                          key={time}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="py-6 px-5 border-t border-solid border-secondary">
                    <Card>
                      <CardContent className="p-3 flex flex-col gap-3">
                        <div className="flex justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <h3 className="font-bold text-sm">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </h3>
                        </div>
                        {date && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">Data</h3>
                            <p className="text-sm">
                              {format(date, "dd 'de' MMMM ", { locale: ptBR })}
                            </p>
                          </div>
                        )}
                        {hour && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">Horário</h3>
                            <p className="text-sm">{hour}</p>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <h3 className="text-gray-400 text-sm">Barbearia</h3>
                          <p className="text-sm">{barberShop.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <SheetFooter className="px-5">
                          <Button onClick={handleBookingSubmit} disabled={(!hour  || !date) || !isAutenticated}>
                            {
                              isLoading && <Loader2 className="mr-4 h-4 w-4 animate-spin"/>
                            }
                            Confirma reservar
                          </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
