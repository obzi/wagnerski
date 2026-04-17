import { renderToBuffer } from "@react-pdf/renderer";
import { VoucherPDF } from "@/lib/voucher-pdf";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const serviceLabel = searchParams.get("serviceLabel");
  const discountedPrice = Number(searchParams.get("discountedPrice"));
  const buyerName = searchParams.get("buyerName");
  const validFrom = searchParams.get("validFrom");
  const validUntil = searchParams.get("validUntil");

  if (!code || !serviceLabel || !discountedPrice || !buyerName || !validFrom || !validUntil) {
    return Response.json({ error: "Missing parameters" }, { status: 400 });
  }

  const buffer = await renderToBuffer(
    VoucherPDF({ code, serviceLabel, discountedPrice, buyerName, validFrom, validUntil })
  );

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="voucher-${code}.pdf"`,
    },
  });
}
