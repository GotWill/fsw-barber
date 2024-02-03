"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

export const CancelBooking = async (bookingid: string) => {
    db.booking.delete({
        where: {
            id: bookingid
        }
    })

    revalidatePath("/bookings")
}