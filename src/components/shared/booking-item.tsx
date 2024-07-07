
'use client'
import { Booking, Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card"
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import Image from "next/image";
import { Button } from "../ui/button";
import { cancelBooking } from "@/actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { Input } from "postcss";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { BookingInfo } from "./booking-info";
import { cn } from "@/lib/utils";

type BookingItemProps = {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true,
      barbershop: true
    }
  }>
  cardClassName?: string
}

export const BookingItem = ({ booking, cardClassName }: BookingItemProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  const isBookingConfirmed = isFuture(booking.date)

  const handleCancelClick = async () => {
    setIsDeleteLoading(true)

    try {
      await cancelBooking(booking.id)

      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Card className={cn("max-w-[420px]", cardClassName)}>
          <CardContent className="flex p-0">
            <div className="flex flex-col gap-2 py-5 pl-5 flex-[3]">
              <Badge
                className="w-fit"
                variant={isBookingConfirmed ? 'default' : 'secondary'}
              >
                {isBookingConfirmed ? 'Confirmado' : 'Finalizado'}
              </Badge>
              <h2 className="font-bold text-start">{booking.service.name}</h2>

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
      </SheetTrigger>

      <SheetContent className="px-0">
        <SheetHeader className="px-5 text-left pb-6 border-b border-solid border-secondary">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5 flex flex-col gap-3">
          <div className="relative h-[180px] w-full mt-6">
            <Image
              src="/images/png/barbershop-map.png"
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 100vw, 100vw"
              alt={booking.barbershop.name}
            />

            <div className="w-full absolute bottom-4 left-0 px-5">
              <Card>
                <CardContent className="p-3 flex gap-2">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>

                  <div className="">
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">{booking.barbershop.address}</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            className="w-fit"
            variant={isBookingConfirmed ? 'default' : 'secondary'}
          >
            {isBookingConfirmed ? 'Confirmado' : 'Finalizado'}
          </Badge>

          <BookingInfo 
            service={booking.service}
            barbershop={booking.barbershop}
            date={booking.date}
            hour={format(booking.date, "hh:mm")}
          />

          {isBookingConfirmed && (
            <SheetFooter className="flex gap-3 flex-row">
              <SheetClose asChild>
                <Button className="w-full" variant="secondary">
                  Voltar
                </Button>
              </SheetClose>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-full"
                    variant="destructive"
                    disabled={isDeleteLoading}
                  >
                    Cancelar Reserva
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="w-[90%]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Deseja mesmo cancelar essa reserva?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Uma vez cancelada, não será possível reverter essa ação.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  
                  <AlertDialogFooter className="flex-row gap-3">
                    <AlertDialogCancel 
                      className="w-full mt-0" 
                      disabled={isDeleteLoading}
                    >
                      Voltar
                    </AlertDialogCancel>
                    <AlertDialogAction 
                      className="w-full"
                      disabled={isDeleteLoading}
                      onClick={handleCancelClick}
                    >
                      Confirmar
                      {isDeleteLoading && (
                        <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </SheetFooter>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}