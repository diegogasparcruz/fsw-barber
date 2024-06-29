
import { Booking, Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card"
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

type BookingItemProps = {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true,
      barbershop: true
    }
  }>
}

export const BookingItem = ({ booking }: BookingItemProps) => {

  const isBookingConfirmed = isFuture(booking.date)

  return (
    <Card>
      <CardContent className="flex p-0">
        <div className="flex flex-col gap-2 py-5 pl-5 flex-[3]">
          <Badge 
            className="w-fit"
            variant={isBookingConfirmed ? 'default' : 'secondary'} 
          >
            {isBookingConfirmed ? 'Confirmado' : 'Finalizado'}
          </Badge>
          <h2 className="font-bold">{booking.service.name}</h2>

          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src={booking.barbershop.imageUrl}
              />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">{booking.barbershop.name}</h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center items-center border-l border-solid px-3 border-secondary">
          <p className="text-sm capitalize">{format(booking.date, 'MMMM', { locale: ptBR })}</p>
          <p className="text-2xl">{format(booking.date, 'dd', { locale: ptBR })}</p>
          <p className="text-sm">{format(booking.date, 'hh:mm', { locale: ptBR })}</p>
        </div>
      </CardContent>
    </Card>
  );
}