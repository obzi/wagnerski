import { createVoucher, getSiteSettings } from "@/lib/data";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  const body = await request.json();
  const { serviceLabel, durationMinutes, originalPrice, discountedPrice, buyerName, buyerEmail } = body;

  if (!serviceLabel || !durationMinutes || !originalPrice || !discountedPrice || !buyerName || !buyerEmail) {
    return Response.json({ error: "Chybí povinné údaje." }, { status: 400 });
  }

  const code = `SHRP-${nanoid(8).toUpperCase()}`;

  const settings = await getSiteSettings();
  const windowEnabled = settings.find((s) => s.key === "voucher_window_enabled")?.value === "true";

  let validFrom: Date;
  let validUntil: Date;

  if (windowEnabled) {
    const fromDate = settings.find((s) => s.key === "voucher_window_from")?.value;
    const toDate = settings.find((s) => s.key === "voucher_window_to")?.value;
    const timeFrom = settings.find((s) => s.key === "voucher_window_time_from")?.value || "00:00";
    const timeTo = settings.find((s) => s.key === "voucher_window_time_to")?.value || "23:59";

    validFrom = fromDate ? new Date(`${fromDate}T${timeFrom}:00`) : new Date();
    validUntil = toDate ? new Date(`${toDate}T${timeTo}:00`) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  } else {
    validFrom = new Date();
    validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 14);
  }

  try {
    const voucher = await createVoucher({
      code,
      service_label: serviceLabel,
      duration_minutes: durationMinutes,
      original_price: originalPrice,
      discounted_price: discountedPrice,
      buyer_name: buyerName,
      buyer_email: buyerEmail,
      valid_from: validFrom.toISOString(),
      valid_until: validUntil.toISOString(),
    });

    return Response.json({ voucher });
  } catch {
    return Response.json({ error: "Nepodařilo se vytvořit voucher." }, { status: 500 });
  }
}
