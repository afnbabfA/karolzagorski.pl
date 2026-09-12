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
      // Determine active site URL or fallback to https://karolzagorski.pl
      const currentHost = (typeof window !== 'undefined' && window.location && window.location.origin && window.location.origin.startsWith('http'))
        ? window.location.origin
        : 'https://karolzagorski.pl';

      const vcardData = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'N:Zagórski;Karol;;lek.;MD',
        'FN:Karol Zagórski, MD',
        'TITLE:Resident in Anatomic Pathology & Computational Oncology Researcher',
        'ORG:Wroclaw Medical University;Department of Clinical and Experimental Pathology',
        'EMAIL;TYPE=INTERNET,WORK,PREF:karol.zagorski.md@gmail.com',
        `URL;TYPE=WORK,PREF:${currentHost}`,
        'URL;TYPE=WORK:https://karolzagorski.pl',
        'URL;TYPE=WORK:https://karolzagorski.eu',
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

      showToast('✓ Downloaded vCard (.vcf) — open to save contact directly');
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
        'SUMMARY:Follow up with Karol Zagórski, MD (ECP 2026 / Research)',
        'DESCRIPTION:Follow up regarding scientific collaboration & research.\\n\\nKarol Zagórski, MD\\nResident in Anatomic Pathology, Wroclaw Medical University\\nEmail: karol.zagorski.md@gmail.com\\nWebsite: https://karolzagorski.pl\\nECP 2026 Talk: Hybrid quantum-classical neural networks for uveal melanoma prognosis via WSI.',
        'LOCATION:Stockholmsmässan, Stockholm / Online',
        'STATUS:CONFIRMED',
        'BEGIN:VALARM',
        'TRIGGER:-PT0M',
        'ACTION:DISPLAY',
        'DESCRIPTION:Reminder: Follow up with Karol Zagórski, MD',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Karol_Zagorski_Reminder.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast('✓ Downloaded reminder (.ics) — open to set calendar alert for 21:00');
    });
  }

  // 3. Automatic Conference Lifecycle Transitions
  // ECP 2026: Oral Talk on Sep 13, 2026 15:25 CEST; Congress concludes on Sep 16, 2026 23:59 CEST
  const now = new Date();
  const isPolish = document.documentElement.lang === 'pl';

  // Transition A: After the oral presentation (Sunday Sep 13, 2026 15:35 CEST)
  const presentationEnd = new Date('2026-09-13T15:35:00+02:00');
  if (now >= presentationEnd) {
    const heading = document.querySelector('.section-heading-presentations');
    if (heading) {
      heading.textContent = isPolish ? 'Ostatnie wystąpienia' : 'Recent Conference Presentations';
    }
    const badge = document.querySelector('.featured-box .item-badge');
    if (badge) {
      badge.textContent = isPolish ? 'Wygłoszone na ECP 2026' : 'Presented at ECP 2026';
    }
  }

  // Transition B: After the entire congress concludes (September 17, 2026 00:00 CEST)
  const conferenceEnd = new Date('2026-09-17T00:00:00+02:00');
  if (now >= conferenceEnd) {
    const tag = document.querySelector('.networking-tag');
    if (tag) {
      tag.textContent = isPolish ? 'Szybki kontakt & Networking' : 'Quick Connect & Academic Networking';
    }
    const btnIcs = document.getElementById('btn-reminder-ics');
    if (btnIcs && btnIcs.parentNode) {
      const link = document.createElement('a');
      link.href = 'https://www.linkedin.com/in/karol-zagorski-md';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'btn-action btn-tertiary';
      link.setAttribute('aria-label', isPolish ? 'Profil LinkedIn' : 'LinkedIn Profile');
      link.innerHTML = `
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        <span class="btn-labels">
          <span class="btn-label-primary">Connect / LinkedIn</span>
          <span class="btn-label-sub">${isPolish ? 'Śledź publikacje i projekty' : 'Follow research & updates'}</span>
        </span>
      `;
      btnIcs.parentNode.replaceChild(link, btnIcs);
    }
  }
});

