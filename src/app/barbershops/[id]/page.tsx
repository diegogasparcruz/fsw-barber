import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ArrowLeftIcon, ChevronLeftIcon, MapPinIcon, MapPinOffIcon, MapPinnedIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { BarbershopInfo } from "./components/barbershop-info";
import { ServiceItem } from "./components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { Header } from "@/components/core/header";
import { BarbershopAboutInfo } from "./components/barbershop-about-info";
import Link from "next/link";

type BarbershopDetailsProps = {
  params: { id: string }
}

const BarbershopDetails = async ({ params }: BarbershopDetailsProps) => {
  const session = await getServerSession(authOptions)

  if (!params.id) {
    redirect('/')
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
    redirect('/')
  }

  return (
    <div>
      <div className="hidden lg:block lg:w-full">
        <Header />
      </div>

      <Link href="/" className="hidden w-fit lg:flex gap-2 ml-20 py-5 hover:text-primary">
        <ArrowLeftIcon /> Voltar
      </Link>

      <div className="grid lg:grid-cols-[1fr,380px] gap-6 lg:px-20">
        <div className="flex flex-col">
          <BarbershopInfo barbershop={barbershop} />

          <div className="px-5 py-6 grid gap-4 lg:px-0 xl:grid-cols-2">
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

        <div className="hidden lg:inline-block mb-6 h-[740px] bg-[#1A1B1F] rounded-lg p-5">
          <BarbershopAboutInfo barbershop={barbershop} />
        </div>
      </div>
    </div>
  );
}

export default BarbershopDetails;