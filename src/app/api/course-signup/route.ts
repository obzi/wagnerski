import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, courseLevel, courseDate } = body;

  if (!name || !email || !phone || !courseLevel) {
    return Response.json({ error: "Chybí povinné údaje." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Wagner Ski Akademie <noreply@wagnerski.cz>",
      to: "chcibytinstruktor@wagnerski.cz",
      subject: `Nová přihláška na kurz: ${courseLevel}`,
      html: `
        <div style="font-family: sans-serif; color: #111110;">
          <h2>Nová přihláška na instruktorský kurz</h2>
          <table style="border-collapse: collapse;">
            <tr><td style="padding: 4px 12px 4px 0; color: #aaa89e;">Jméno:</td><td>${name}</td></tr>
            <tr><td style="padding: 4px 12px 4px 0; color: #aaa89e;">E-mail:</td><td>${email}</td></tr>
            <tr><td style="padding: 4px 12px 4px 0; color: #aaa89e;">Telefon:</td><td>${phone}</td></tr>
            <tr><td style="padding: 4px 12px 4px 0; color: #aaa89e;">Kurz:</td><td>${courseLevel}</td></tr>
            ${courseDate ? `<tr><td style="padding: 4px 12px 4px 0; color: #aaa89e;">Termín:</td><td>${courseDate}</td></tr>` : ""}
          </table>
        </div>
      `,
    });

    await resend.emails.send({
      from: "Wagner Ski Akademie <noreply@wagnerski.cz>",
      to: email,
      subject: "Potvrzení přihlášky na instruktorský kurz",
      html: `
        <div style="font-family: sans-serif; color: #111110;">
          <h2>Dobrý den, ${name}!</h2>
          <p>Vaše přihláška na kurz <strong>${courseLevel}</strong> byla přijata.</p>
          <p>Ozveme se vám s dalšími informacemi na váš e-mail nebo telefon.</p>
          <hr style="border: none; border-top: 1px solid #e0ddd6; margin: 20px 0;" />
          <p style="color: #aaa89e; font-size: 12px;">Wagner Ski Akademie · chcibytinstruktor@wagnerski.cz</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Nepodařilo se odeslat přihlášku." }, { status: 500 });
  }
}
