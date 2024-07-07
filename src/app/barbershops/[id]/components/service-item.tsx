'use client'
import { getDayBookings } from "@/actions/get-day-bookings";
import { saveBooking } from "@/actions/save-booking";
import { BookingInfo } from "@/components/shared/booking-info";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { generateDayTimeList } from "@/helpers/generate-day-time-list";
import { Barbershop, Booking, Service } from "@prisma/client";
import { addDays, format, setHours, setMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2Icon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type ServiceItemProps = {
  service: Service
  isAuthenticated: boolean
  barbershop: Barbershop
}

export const ServiceItem = ({ service, barbershop, isAuthenticated }: ServiceItemProps) => {
  const router = useRouter()
  const { data: session } = useSession()

  const [date, setDate] = useState<Date | undefined>(undefined)
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [hour, setHour] = useState<String | undefined>(undefined)
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [sheetIsOpen, setSheetIsOpen] = useState(false)

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn('google')
    }
  }

  const handleDateClick = (date: Date | undefined) => {
    setDate(date)
    setHour(undefined)
  }

  const handleHourClick = (hour: string) => {
    setHour(hour)
  }

  const handleBookingSubmit = async () => {
    setIsSubmitLoading(true)

    try {
      if (!hour || !date || !session?.user) {
        return
      }

      const dateHour = Number(hour.split(':')[0])
      const dateMinutes = Number(hour.split(':')[1])

      const newDate = setMinutes(setHours(date, dateHour), dateMinutes)

      await saveBooking({
        barbershopId: service.barbershopId,
        serviceId: service.id,
        date: newDate,
        userId: (session?.user as any).id
      })

      setSheetIsOpen(false)
      setHour(undefined)
      setDate(undefined)

      toast("Reserva realizada com sucesso", {
        description: format(newDate,
          "'Para' dd 'de' MMMM 'às' HH':'mm'.'",
          { locale: ptBR }
        ),
        action: {
          label: 'Visualizar',
          onClick: () => router.push('/bookings')

        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitLoading(false)
    }
  }

  const timeList = useMemo(() => {
    if (!date) return []

    return generateDayTimeList(date).filter(time => {
      const timeHour = Number(time.split(':')[0])
      const timeMinutes = Number(time.split(':')[1])

      const booking = dayBookings.find(booking => {
        const bookingHour = booking.date.getHours()
        const bookingMinutes = booking.date.getMinutes()

        return bookingHour === timeHour && bookingMinutes === timeMinutes
      })

      if (!booking) return true

      return false
    })
  }, [date, dayBookings])

  useEffect(() => {
    const refreshAvailableHours = async () => {
      if (date) {
        const response = await getDayBookings(barbershop.id, date)
        setDayBookings(response)
      }

      return
    }

    refreshAvailableHours()
  }, [barbershop.id, date])

  return (
    <Card>
      <CardContent className="p-3 w-full">
        <div className="flex items-center gap-4 w-full">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              className="rounded-lg"
              src={service.imageUrl}
              fill
              style={{
                objectFit: 'cover'
              }}
              alt={service.name}
            />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">
              {service.description}
            </p>

            <div className="flex items-center justify-between mt-3">
              <p className="text-primary font-bold">
                {Intl.NumberFormat("pt-BR", {
                  style: 'currency',
                  currency: 'BRL'
                }
                ).format(Number(service.price))}
              </p>
              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="secondary" onClick={handleBookingClick}>
                    Reservar
                  </Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <Calendar
                    className="mt-6 w-full"
                    mode="single"
                    selected={date}
                    onSelect={handleDateClick}
                    locale={ptBR}
                    fromDate={addDays(new Date(), 1)}
                    styles={{
                      head_cell: {
                        width: '100%',
                        textTransform: 'capitalize'
                      },
                      cell: {
                        width: '100%',
                      },
                      button: {
                        width: '100%'
                      },
                      nav_button_previous: {
                        width: '32px',
                        height: '32px'
                      },
                      nav_button_next: {
                        width: '32px',
                        height: '32px'
                      },
                      caption: {
                        textTransform: 'capitalize'
                      }
                    }}
                  />

                  {date && (
                    <div className="flex gap-3 overflow-x-auto py-6 px-5 border-t border-solid border-secondary [&::-webkit-scrollbar]:hidden">
                      {timeList?.map(time => (
                        <Button
                          key={time}
                          variant={hour === time ? 'default' : "outline"}
                          className="rounded-full"
                          onClick={() => handleHourClick(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="py-6 px-5 border-t border-solid border-secondary">
                    <BookingInfo
                      barbershop={barbershop}
                      service={service}
                      date={date}
                      hour={hour as string}
                    />
                  </div>

                  <SheetFooter className="px-5">
                    <SheetClose asChild>
                      <Button className="w-full" variant="secondary">
                        Voltar
                      </Button>
                    </SheetClose>
                    
                    <Button
                      onClick={handleBookingSubmit}
                      disabled={!hour || !date || isSubmitLoading}
                    >
                      Confirmar reserva
                      {isSubmitLoading && (
                        <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
                      )}
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}