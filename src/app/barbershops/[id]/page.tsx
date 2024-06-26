import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MapPinOffIcon, MapPinnedIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { BarbershopInfo } from "./components/barbershop-info";

type BarbershopDetailsProps = {
  params: { id: string }
}

const BarbershopDetails = async ({ params }: BarbershopDetailsProps) => {
  if (!params.id) {
    // TODO: redirecionar para homepage
    return null
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id
    }
  })

  if (!barbershop) {
    // TODO: redirecionar para homepage
    return null
  }

  return (
   <BarbershopInfo barbershop={barbershop} />
  );
}

export default BarbershopDetails;