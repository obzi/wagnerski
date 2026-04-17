import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";
import { VoucherPDF } from "@/lib/voucher-pdf";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await request.json();
  const { code, serviceLabel, discountedPrice, buyerName, buyerEmail, validFrom, validUntil } = body;

  if (!code || !serviceLabel || !buyerName || !buyerEmail || !validFrom || !validUntil) {
    return Response.json({ error: "Chybí povinné údaje." }, { status: 400 });
  }

  const pdfBuffer = await renderToBuffer(
    VoucherPDF({ code, serviceLabel, discountedPrice, buyerName, validFrom, validUntil })
  );

  try {
    await resend.emails.send({
      from: "Sherpa Ski School <onboarding@resend.dev>",
      to: "t.obzina@seznam.cz",
      subject: `Váš voucher Sherpaski — ${code}`,
      html: `
        <div style="font-family: sans-serif; color: #111110;">
          <h2>Dobrý den, ${buyerName}!</h2>
          <p>Děkujeme za zakoupení voucheru na <strong>${serviceLabel}</strong>.</p>
          <p>Váš kód: <strong style="font-size: 20px; letter-spacing: 2px;">${code}</strong></p>
          <p>Platnost: do ${new Date(validUntil).toLocaleDateString("cs-CZ")}</p>
          <p><strong>Podmínky:</strong> Voucher je platný pouze Po–Pá, 11:00–14:00.</p>
          <p>PDF voucher naleznete v příloze.</p>
          <hr style="border: none; border-top: 1px solid #e0ddd6; margin: 20px 0;" />
          <p style="color: #aaa89e; font-size: 12px;">Sherpa Ski School · Ski aréna Karlov pod Pradědem</p>
        </div>
      `,
      attachments: [
        {
          filename: `voucher-${code}.pdf`,
          content: Buffer.from(pdfBuffer),
        },
      ],
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Nepodařilo se odeslat email." }, { status: 500 });
  }
}
