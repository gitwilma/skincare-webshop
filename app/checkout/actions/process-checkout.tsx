"use server";

import { redirect } from "next/navigation";

export async function processCheckout(formData: FormData) {
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const zipcode = formData.get("zipcode") as string;
  const city = formData.get("city") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  const paymentSuccess = true;

  if (paymentSuccess) {
    redirect("/confirmation/bekraftelse");
  } else {
    throw new Error("Payment failed. Try again");
  }
}
