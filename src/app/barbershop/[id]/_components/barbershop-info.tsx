"use client";

import SideMenu from "@/app/_components/side-menu";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { BarberShop } from "@prisma/client";
import { ChevronLeftIcon, MapPin, MenuIcon, Smartphone, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarberShopInfoProps {
  barberShop: BarberShop;
}

const BarberShopInfo = ({ barberShop }: BarberShopInfoProps) => {
  const router = useRouter();

  return (
    <div className="md-desk:flex md-desk:items-start">
      <div className="w-full">
        <div className="h-[250px] w-full relative">
          <Button
            size="icon"
            variant="outline"
            className="z-50 absolute top-4 left-4 md-desk:hidden"
            onClick={() => router.back()}
          >
            <ChevronLeftIcon />
          </Button>

          <Sheet>
            <SheetTrigger asChild className="md-desk:hidden">
              <Button
                size="icon"
                variant="outline"
                className="z-50 absolute top-4 right-4"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="p-0">
              <SideMenu />
            </SheetContent>
          </Sheet>

          <Image
            src={barberShop.imageUrl}
            alt={barberShop.name}
            fill
            style={{
              objectFit: "cover",
            }}
            className="opacity-75 md-desk:max-w-[758px] md-desk:!h-[485px]"
          />
        </div>

        <div className="px-5 py-2 pb-6 border-b border-solid border-secondary md-desk:mt-[240px] md-desk:px-0 md-desk:flex md-desk:items-center md-desk:justify-between md-desk:max-w-[758px] md-desk:border-0">
          <div>
            <h1 className="font-bold text-xl ">{barberShop.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              <MapPin className="text-primary" size={18} />
              <p className="text-sm">{barberShop.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 md-desk:bg-[#1A1B1F] md-desk:px-5 md-desk:py-3 md-desk:flex md-desk:flex-col">
            <div className="flex items-center gap-2 flex-row-reverse">
              5,0
              <StarIcon className="text-primary" size={18} fill="#8161ff" />
            </div>
            <p className="text-sm">(899 avaliações)</p>
          </div>
        </div>
      </div>
      <div className="md-mobol:hidden bg-[#1A1B1F] w-[530px] p-5">
        <div className="relative h-[180px] w-full">
          <Image src="/maps.png" alt={barberShop.name} fill />

          <div className="w-full absolute bottom-4 left-0 px-5">
            <Card>
              <CardContent className="p-3 flex gap-2">
                <Avatar>
                  <AvatarImage src={barberShop.imageUrl} />
                </Avatar>
                <div>
                  <h2 className="font-bold">{barberShop.name}</h2>
                  <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
                    {barberShop.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-3  border-b border-solid border-secondary pb-3">
          <h3 className="font-bold text-sm">SOBRE NÓS</h3>
          <p className="text-gray-300 text-sm">
            Bem-vindo à <strong>{barberShop.name}</strong>, onde tradição encontra estilo. Nossa
            equipe de mestres barbeiros transforma cortes de cabelo e barbas em
            obras de arte. Em um ambiente acolhedor, promovemos confiança,
            estilo e uma comunidade unida.
          </p>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="flex items-center gap-2">
            <Smartphone width={20} />
            <span>(11) 98204-5108</span>
          </div>
          <Button variant="secondary">
            Copiar
          </Button>
        </div>
        <div className="mt-4 flex justify-between border-b border-solid border-secondary pb-3">
          <div className="flex items-center gap-2">
            <Smartphone width={20} />
            <span>(11) 98204-5108</span>
          </div>
          <Button variant="secondary">
            Copiar
          </Button>
        </div>
        <div className="mt-4 flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="text-gray-300 text-sm">Segunda</span>
              <span className="text-sm">Fechado</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300 text-sm">Terça-Feira</span>
              <span className="text-sm">09:00 - 21:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300 text-sm">Quarta-Feira</span>
              <span className="text-sm">09:00 - 21:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300 text-sm">Quinta-Feira</span>
              <span className="text-sm">09:00 - 21:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300 text-sm">Sexta-Feira</span>
              <span className="text-sm">09:00 - 21:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300 text-sm">Sábado</span>
              <span className="text-sm">08:00 - 17:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300 text-sm">Domingo</span>
              <span className="text-sm">Fechado</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BarberShopInfo;
