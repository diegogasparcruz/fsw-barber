import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BookingItem } from "@/components/shared/booking-item";
import { BarbershopItem } from "./components/barbershop-item";
import { Header } from "@/components/core/header";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { SearchForm } from "@/components/shared/search-form";

export default async function Home() {
  const session = await getServerSession(authOptions)

  const [barbershops, recommendedBarbershops, confirmedBookings] = await Promise.all([
    await db.barbershop.findMany({}),
    await db.barbershop.findMany({
      orderBy: {
        id: 'asc'
      }
    }),
    session?.user ?
      await db.booking.findMany({
        where: {
          userId: (session?.user as any).id,
          date: {
            gte: new Date()
          }
        },
        include: {
          service: true,
          barbershop: true
        }
      }) : Promise.resolve([])
  ])

  return (
    <>
      <Header />
      <div className="lg:px-20">
        <header className="px-5 pt-5 lg:px-0">
          <h2 className="text-xl font-bold">
            {session?.user
              ? `Olá, ${session.user.name?.split(' ')[0]}!`
              : 'Olá! Vamos agendar um corte hoje?'}
          </h2>
          <p className="capitalize text-sm">
            {format(new Date(), "EEEE, d 'de' MMMM", {
              locale: ptBR
            })}
          </p>
        </header>

        <div className="px-5 lg:px-0 mt-6">
          <SearchForm />
        </div>

        {confirmedBookings.length > 0 && (
          <div className="mt-6">
            <h2 className="pl-5 lg:px-0 uppercase text-xs text-gray-400 font-bold mb-3">
              Agendamentos
            </h2>

            <div className="px-5 lg:px-0 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map(booking => (
                <BookingItem key={booking.id} cardClassName="min-w-[420px]" booking={booking} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <h2 className="px-5 lg:px-0 uppercase text-xs text-gray-400 font-bold mb-3">
            Recomendados
          </h2>

          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden px-5 lg:px-0">
            {recommendedBarbershops.map((barbershop => (
              <div key={barbershop.id} className="min-w-[167px]">
                <BarbershopItem barbershop={barbershop} />
              </div>
            )))}
          </div>
        </div>

        <div className="mt-6 mb-[4.5rem]">
          <h2 className="px-5 lg:px-0 uppercase text-xs text-gray-400 font-bold mb-3">
            Populares
          </h2>

          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden px-5 lg:px-0">
            {barbershops.map((barbershop => (
              <div key={barbershop.id} className="min-w-[167px]">
                <BarbershopItem barbershop={barbershop} />
              </div>
            )))}
          </div>
        </div>
      </div>
    </>
  );
}
