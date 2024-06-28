'use client'
import { SideMenu } from "@/components/core/side-menu";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MenuIcon, MapPinIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type BarbershopInfoProps = {
  barbershop: Barbershop
}
export const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const router = useRouter()

  const handleBackClick = () => {
    router.replace('/')
  }

  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Button
          className="z-50 absolute top-4 left-4"
          size="icon"
          variant="outline"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="z-50 absolute top-4 right-4"
              size="icon"
              variant="outline"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>

        <Image
          src={barbershop.imageUrl}
          className="opacity-75"
          fill
          alt={barbershop.name}
          style={{
            objectFit: 'cover'
          }}
          unoptimized
        />
      </div>

      <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>

        <div className="flex items-center gap-1 mt-2">
          <MapPinIcon className="stroke-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <StarIcon className="stroke-primary" size={18} />
          <p className="text-sm">5,0 (899 avaliações)</p>
        </div>
      </div>
    </div>
  );
}