import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Barbershop } from "@prisma/client";
import { SmartphoneIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type BarbershopAboutInfoProps = {
  barbershop: Barbershop
}

export const BarbershopAboutInfo = ({ barbershop }: BarbershopAboutInfoProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative h-[180px] w-full">
        <Image
          src="/images/png/barbershop-map.png"
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 100vw, 100vw"
          alt={barbershop.name}
        />

        <div className="w-full absolute bottom-4 left-0 px-5">
          <Card>
            <CardContent className="p-3 flex gap-2">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>

              <div className="">
                <h2 className="font-bold">{barbershop.name}</h2>
                <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">{barbershop.address}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <h2 className="uppercase font-bold text-sm">Sobre Nós</h2>
        <p className="text-gray-400 text-justify text-sm">
          {`Bem-vindo à ${barbershop.name}, onde tradição encontra estilo. 
          Nossa equipe de mestres barbeiros transforma cortes de cabelo e barbas em obras de arte. 
          Em um ambiente acolhedor, promovemos confiança, estilo e uma comunidade unida.`}
        </p>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <span className="flex text-sm items-center gap-2">
          <SmartphoneIcon size={24} /> (11) 98204-5108
        </span>

        <Button variant="secondary" asChild>
          <Link href="https://wa.me/11982045108" target="_blank">
            Fale conosco
          </Link>
        </Button>
      </div>

      <Separator />

      <ul className="flex flex-col gap-[10px] text-sm">
        <li className="flex justify-between">
          <p className="text-gray-400">Segunda-feira</p>
          <p>Fechado</p>
        </li>
        <li className="flex justify-between">
          <p className="text-gray-400">Terça-feira</p>
          <p>09:00 - 20:00</p>
        </li>
        <li className="flex justify-between">
          <p className="text-gray-400">Quarta-feira</p>
          <p>09:00 - 20:00</p>
        </li>
        <li className="flex justify-between">
          <p className="text-gray-400">Quinta-feira</p>
          <p>09:00 - 20:00</p>
        </li>
        <li className="flex justify-between">
          <p className="text-gray-400">Sexta-feira</p>
          <p>09:00 - 20:00</p>
        </li>
        <li className="flex justify-between">
          <p className="text-gray-400">Sábado</p>
          <p>09:00 - 20:00</p>
        </li>
        <li className="flex justify-between">
          <p className="text-gray-400">Domingo</p>
          <p>Fechado</p>
        </li>
      </ul>
    </div>
  );
}