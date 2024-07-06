'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type BarbershopItemProps = {
  barbershop: Barbershop
}

export const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  const router = useRouter()
  
  const handleBookingClick = () => {
    router.push(`/barbershops/${barbershop.id}`)
  }
  
  return (
    <Card className="rounded-2xl">
      <CardContent className="px-1 py-0 pt-1">
        <div className="px-1 relative w-full h-[159px]">
          <div className="absolute top-2 left-2 z-50">
            <Badge variant="secondary" className="flex items-center justify-center gap-1 opacity-75">
              <StarIcon size={12} className="text-primary fill-primary" />
              <span className="text-xs">5,0</span>
            </Badge>
          </div>

          <Image
            className="rounded-2xl"
            src={barbershop.imageUrl}
            sizes="100vw"
            fill
            style={{
              objectFit: 'cover'
            }}
            alt={`${barbershop.name}`}
          />
        </div>

        <div className="px-3 pb-3">
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">{barbershop.name}</h2>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">{barbershop.address}</p>
          <Button 
            className="w-full mt-3"
            variant="secondary" 
            onClick={handleBookingClick}
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}