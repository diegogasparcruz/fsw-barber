import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Search } from "./components/search";
import { BookingItem } from "@/components/shared/booking-item";
import { db } from "@/lib/prisma";
import { BarbershopItem } from "./components/barbershop-item";

export default async function Home() {
  const barbershops = await db.barbershop.findMany({})

  return (
    <div>
      <header className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Diego!</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE, d 'de' MMMM", {
            locale: ptBR
          })}
        </p>
      </header>

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="px-5 mt-6">
        <h2 className="uppercase text-xs text-gray-400 font-bold mb-3">
          Agendamentos
        </h2>
        <BookingItem />
      </div>

      <div className="mt-6">
        <h2 className="px-5 uppercase text-xs text-gray-400 font-bold mb-3">
          Recomendados
        </h2>
        
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden px-5">
          {barbershops.map((barbershop => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          )))}
        </div>
      </div>
      
      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 uppercase text-xs text-gray-400 font-bold mb-3">
          Populares
        </h2>
        
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden px-5">
          {barbershops.map((barbershop => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          )))}
        </div>
      </div>
    </div>
  );
}
