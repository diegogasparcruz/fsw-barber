import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
    </div>
  );
}
