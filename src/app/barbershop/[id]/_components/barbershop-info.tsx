"use client";

import { Button } from "@/app/_components/ui/button";
import { BarberShop } from "@prisma/client";
import { ChevronLeftIcon, MapPin, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarberShopInfoProps {
    barberShop: BarberShop
}

const BarberShopInfo = ({barberShop} : BarberShopInfoProps) => {

    const router = useRouter()



  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Button
          size="icon"
          variant="outline"
          className="z-50 absolute top-4 left-4"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="z-50 absolute top-4 right-4"
        >
          <MenuIcon />
        </Button>
        <Image
          src={barberShop.imageUrl}
          alt={barberShop.name}
          fill
          style={{
            objectFit: "cover",
          }}
          className="opacity-75"
        />
      </div>

      <div className="px-5 py-2 pb-6 border-b border-solid border-secondary">
        <h1 className="font-bold text-xl ">{barberShop.name}</h1>
        <div className="flex items-center gap-1 mt-2">
          <MapPin className="text-primary" size={18} />
          <p className="text-sm">{barberShop.address}</p>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <StarIcon className="text-primary" size={18} />
          <p className="text-sm">5,0 (899 avaliações)</p>
        </div>
      </div>
    </div>
  );
};

export default BarberShopInfo;
