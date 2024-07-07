import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { Header } from "@/components/core/header";
import { db } from "@/lib/prisma";
import { BookingItem } from "@/components/shared/booking-item";
import { isFuture, isPast } from "date-fns";
import { authOptions } from "@/lib/auth-options";
import { ArrowLeftIcon, } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const BookingsPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/')
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    await db.booking.findMany({
      where: {
        userId: (session?.user as any).id,
        date: {
          gte: new Date()
        }
      },
      orderBy: {
        date: 'asc'
      },
      include: {
        service: true,
        barbershop: true
      }
    }),
    await db.booking.findMany({
      where: {
        userId: (session?.user as any).id,
        date: {
          lte: new Date()
        }
      },
      orderBy: {
        date: 'desc'
      },
      include: {
        service: true,
        barbershop: true
      }
    })
  ])

  return (
    <>
      <Header />

      <div className="px-5 py-6 lg:px-20">
        <div className="flex items-center gap-2">
          <Link href="/" className="hidden w-fit lg:flex gap-2 hover:text-primary">
            <ArrowLeftIcon /> Voltar
          </Link>
          <Separator orientation="vertical" className="h-[20px]" />
          <h1 className="text-xl font-bold">
            Agendamentos
          </h1>
        </div>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
              Confirmados
            </h2>

            <div className="flex flex-col gap-3 md:grid md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
              {confirmedBookings.map(booking =>
                <BookingItem key={booking.id} booking={booking} />
              )}
            </div>
          </>
        )}

        {finishedBookings.length > 0 && (
          <>
            <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
              Finalizados
            </h2>

            <div className="flex flex-col gap-3 md:grid md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
              {finishedBookings.map(booking =>
                <BookingItem key={booking.id} booking={booking} />
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default BookingsPage;