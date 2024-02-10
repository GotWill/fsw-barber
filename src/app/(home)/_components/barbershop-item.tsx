import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { BarberShop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type BarberShopProps = {
  barbershop: BarberShop;
};

const BarberShopItem = ({ barbershop }: BarberShopProps) => {
  return (
    <Card className="min-w-full max-w-full rounded-2xl">
      <CardContent className="px-1 pb-0 pt-1">
        <div className="px-1 relative w-full h-[159px]">
          <div className="absolute left-2 top-2 z-50"> 
            <Badge variant="secondary" className="flex items-center gap-2 opacity-90">
              <StarIcon size={12} className="fill-primary text-primary"/>
              <span className="text-xs">5,0</span>
            </Badge>
          </div>
          <Image
            src={barbershop.imageUrl}
            width={0}
            height={0}
            alt={barbershop.name}
            sizes="100vw"
            fill
            style={{
              objectFit: "cover",
            }}
            className="h-[159px]  rounded-2xl"
          />
        </div>
        <div className="px-2 pb-3">
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.name}
          </h2>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.address}
          </p>
          <Button variant="secondary" className="w-full mt-3">
            <Link href={`/barbershop/${barbershop.id}`}>
             Reservar
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarberShopItem;
