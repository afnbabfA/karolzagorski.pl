// Karol Zagórski, MD — Academic Homepage & Networking Logic

document.addEventListener('DOMContentLoaded', () => {
  const btnVcf = document.getElementById('btn-save-vcf');
  const btnIcs = document.getElementById('btn-reminder-ics');
  const toast = document.getElementById('toast-message');

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // 1. Generate and Download vCard (.vcf)
  if (btnVcf) {
    btnVcf.addEventListener('click', () => {
      const vcardData = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'N:Zagórski;Karol;;lek.;MD',
        'FN:Karol Zagórski, MD',
        'TITLE:Resident in Anatomic Pathology & Computational Oncology Researcher',
        'ORG:Wroclaw Medical University;Department of Clinical and Experimental Pathology',
        'EMAIL;TYPE=INTERNET,WORK,PREF:karol.zagorski.md@gmail.com',
        'URL;TYPE=WORK:https://karolzagorski.pl',
        'X-SOCIALPROFILE;type=linkedin:https://www.linkedin.com/in/karol-zagorski-md',
        'X-SOCIALPROFILE;type=orcid:https://orcid.org/0009-0000-3809-3642',
        'X-SOCIALPROFILE;type=researchgate:https://www.researchgate.net/profile/Karol-Zagorski',
        'NOTE:Oral presentation at 38th European Congress of Pathology (ECP 2026), Stockholm: Hybrid quantum-classical neural networks for uveal melanoma prognosis via WSI. Affiliations: Wroclaw Medical University & 4th Military Clinical Hospital.',
        'END:VCARD'
      ].join('\r\n');

      const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Karol_Zagorski_MD.vcf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast('✓ Pobrano wizytówkę (.vcf) — otwórz plik, by zapisać kontakt w telefonie');
    });
  }

  // 2. Generate and Download Calendar Reminder (.ics)
  if (btnIcs) {
    btnIcs.addEventListener('click', () => {
      const now = new Date();
      // Target: 21:00 today, or tomorrow if already past 20:30
      const target = new Date(now.getTime());
      if (now.getHours() >= 21 || (now.getHours() === 20 && now.getMinutes() >= 30)) {
        target.setDate(target.getDate() + 1);
      }
      target.setHours(21, 0, 0, 0);

      const pad = (n) => String(n).padStart(2, '0');
      const formatICS = (d) => {
        return d.getUTCFullYear() +
          pad(d.getUTCMonth() + 1) +
          pad(d.getUTCDate()) + 'T' +
          pad(d.getUTCHours()) +
          pad(d.getUTCMinutes()) +
          pad(d.getUTCSeconds()) + 'Z';
      };

      const dtStart = formatICS(target);
      const targetEnd = new Date(target.getTime() + 30 * 60 * 1000); // 30 min duration
      const dtEnd = formatICS(targetEnd);
      const dtStamp = formatICS(now);
      const uid = 'reminder-' + now.getTime() + '@karolzagorski.pl';

      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Karol Zagorski MD//Conference Followup//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${dtStamp}`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        'SUMMARY:Napisz do: lek. Karol Zagórski (ECP 2026 / Badania)',
        'DESCRIPTION:Przypomnienie o kontakcie w sprawie współpracy naukowej.\\n\\nLek. Karol Zagórski\\nRezydent patomorfologii, Uniwersytet Medyczny we Wrocławiu\\nEmail: karol.zagorski.md@gmail.com\\nStrona: https://karolzagorski.pl\\nTemat ECP 2026: Hybrydowe sieci kwantowo-klasyczne w czerniaku naczyniówki.',
        'LOCATION:Stockholm / Online',
        'STATUS:CONFIRMED',
        'BEGIN:VALARM',
        'TRIGGER:-PT0M',
        'ACTION:DISPLAY',
        'DESCRIPTION:Przypomnienie: kontakt z lek. Karolem Zagórskim',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Przypomnienie_Karol_Zagorski.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast('✓ Dodano przypomnienie (.ics) — kliknij, by zapisać w kalendarzu na 21:00');
    });
  }
});
