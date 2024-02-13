"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const CancelBooking = async (bookingid: string, userId: string) => {
  await db.booking.delete({
    where: {
      id: bookingid,
      userId: userId
    },
  });

  
  
  revalidatePath("/");
  revalidatePath("/bookings");
};
