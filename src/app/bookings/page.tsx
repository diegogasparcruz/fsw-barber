import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { Header } from "@/components/core/header";
import { db } from "@/lib/prisma";
import { BookingItem } from "@/components/shared/booking-item";
import { isFuture, isPast } from "date-fns";
import { authOptions } from "@/lib/auth-options";

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
      include: {
        service: true,
        barbershop: true
      }
    })
  ])

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
              Confirmados
            </h2>

            <div className="flex flex-col gap-3">
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

            <div className="flex flex-col gap-3">
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