"use server";

import { db } from "@/app/_lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

export const getDayBooking = async (barbershopid: string, date: Date) => {
  const booking = await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
        barbershopid
      
    },
  });

  return booking;
};
