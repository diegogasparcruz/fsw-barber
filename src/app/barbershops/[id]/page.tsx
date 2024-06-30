import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MapPinOffIcon, MapPinnedIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { BarbershopInfo } from "./components/barbershop-info";
import { ServiceItem } from "./components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

type BarbershopDetailsProps = {
  params: { id: string }
}

const BarbershopDetails = async ({ params }: BarbershopDetailsProps) => {
  const session = await getServerSession(authOptions)

  if (!params.id) {
    // TODO: redirecionar para homepage
    return null
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id
    },
    include: {
      services: true
    }
  })

  if (!barbershop) {
    // TODO: redirecionar para homepage
    return null
  }

  return (
   <div>
    <BarbershopInfo barbershop={barbershop} />

    <div className="px-5 pt-6 flex flex-col gap-4">
      {barbershop.services.map(service => (
        <ServiceItem 
          key={service.id} 
          service={service} 
          barbershop={barbershop}
          isAuthenticated={!!session?.user} 
        />
      ))}
    </div>
   </div>
  );
}

export default BarbershopDetails;