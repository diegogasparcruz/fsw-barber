import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Search } from "./components/search";
import { BookingItem } from "@/components/shared/booking-item";

export default function Home() {
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
    </div>
  );
}
