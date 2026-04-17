import { createVoucher } from "@/lib/data";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  const body = await request.json();
  const { serviceLabel, durationMinutes, originalPrice, discountedPrice, buyerName, buyerEmail } = body;

  if (!serviceLabel || !durationMinutes || !originalPrice || !discountedPrice || !buyerName || !buyerEmail) {
    return Response.json({ error: "Chybí povinné údaje." }, { status: 400 });
  }

  const code = `SHRP-${nanoid(8).toUpperCase()}`;
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 14);

  try {
    const voucher = await createVoucher({
      code,
      service_label: serviceLabel,
      duration_minutes: durationMinutes,
      original_price: originalPrice,
      discounted_price: discountedPrice,
      buyer_name: buyerName,
      buyer_email: buyerEmail,
      valid_until: validUntil.toISOString(),
    });

    return Response.json({ voucher });
  } catch {
    return Response.json({ error: "Nepodařilo se vytvořit voucher." }, { status: 500 });
  }
}
