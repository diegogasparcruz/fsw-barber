'use client'
import { Header } from "@/components/core/header";
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
    <div className="">
      <div className="h-[250px] w-full relative lg:hidden">
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


      <div className="hidden lg:block relative min-h-[480px] max-h-[480px] w-full">
        <Image
          className="rounded-lg"
          src={barbershop.imageUrl}
          fill
          style={{
            objectFit: 'cover'
          }}
          alt={barbershop.name}
        />
      </div>

      <div className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-start px-5 pt-3 lg:px-0 pb-6 border-b border-solid border-secondary">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl lg:text-3xl font-bold">{barbershop.name}</h1>

          <div className="flex items-center gap-1">
            <MapPinIcon className="stroke-primary" size={18} />
            <p className="text-sm">{barbershop.address}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <StarIcon className="stroke-primary" size={18} />
          <p className="text-sm">5,0 (899 avaliações)</p>
        </div>
      </div>
    </div>
  );
}