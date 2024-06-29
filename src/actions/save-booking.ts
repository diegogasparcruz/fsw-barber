'use server'

import { db } from "@/lib/prisma"

type SaveBookingParams = {
  barbershopId: string
  serviceId: string
  userId: string
  date: Date
}

export const saveBooking = async (params: SaveBookingParams) => {
  await db.booking.create({
    data: {
      barbershopId: params.barbershopId,
      serviceId: params.serviceId,
      userId: params.userId,
      date: params.date,
    }
  })
}