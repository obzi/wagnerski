import { Resend } from "resend";
import { EMAIL } from "@/config/site";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await request.json();
  const { name, email, phone, campType, campDate, participants, note } = body;

  if (!name || !email || !phone || !campType) {
    return Response.json({ error: "Chybí povinné údaje." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: EMAIL.skicamp.from,
      to: EMAIL.adminEmail,
      subject: `Nová přihláška na skicamp: ${campType}`,
      html: `
        <div style="font-family: sans-serif; color: #111110;">
          <h2>Nová přihláška na ski kemp</h2>
          <table style="border-collapse: collapse;">
            <tr><td style="padding: 4px 12px 4px 0; color: #aaa89e;">Jméno:</td><td>${name}</td></tr>
            <tr><td style="padding: 4px 12px 4px 0; color: #aaa89e;">E-mail:</td><td>${email}</td></tr>
            <tr><td style="padding: 4px 12px 4px 0; color: #aaa89e;">Telefon:</td><td>${phone}</td></tr>
            <tr><td style="padding: 4px 12px 4px 0; color: #aaa89e;">Kemp:</td><td>${campType}</td></tr>
            ${campDate ? `<tr><td style="padding: 4px 12px 4px 0; color: #aaa89e;">Termín:</td><td>${campDate}</td></tr>` : ""}
            ${participants ? `<tr><td style="padding: 4px 12px 4px 0; color: #aaa89e;">Počet osob:</td><td>${participants}</td></tr>` : ""}
            ${note ? `<tr><td style="padding: 4px 12px 4px 0; color: #aaa89e;">Poznámka:</td><td>${note}</td></tr>` : ""}
          </table>
        </div>
      `,
    });

    await resend.emails.send({
      from: EMAIL.skicamp.from,
      to: email,
      subject: "Potvrzení přihlášky na ski kemp",
      html: `
        <div style="font-family: sans-serif; color: #111110;">
          <h2>Dobrý den, ${name}!</h2>
          <p>Vaše přihláška na ski kemp <strong>${campType}</strong> byla přijata.</p>
          <p>Ozveme se vám s dalšími informacemi na váš e-mail nebo telefon.</p>
          <hr style="border: none; border-top: 1px solid #e0ddd6; margin: 20px 0;" />
          <p style="color: #aaa89e; font-size: 12px;">Skicamp · Wagner Ski Akademie</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Nepodařilo se odeslat přihlášku." }, { status: 500 });
  }
}
