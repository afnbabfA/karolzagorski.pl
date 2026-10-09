// UMW Scaler — teksty interfejsu (EN domyślnie, PL opcjonalnie). Klucze używane przez data-i18n i T().
'use strict';
const I18N = {
  en: {
    subtitle: 'Uveal Melanoma Wroclaw Scale — research model 1.0 (frozen) · all computation runs on this computer; no data leave your browser',
    drop_text: 'Drop the slide file here, or click to choose (SVS, TIFF, OME-TIFF)', nav_convert: 'Convert formats',
    l_mpp: 'Pixel size', e_nopyramid: 'This TIFF has no pyramid (reduced-resolution levels) — convert it with the script or QuPath (tab “Convert formats”).',
    e_format: 'This format cannot be read in the browser — convert it to TIFF first (tab “Convert formats”; ~30 s per slide, locally).',
    e_folder: 'This is a folder (e.g. MRXS). Convert the slide to TIFF first — see the tab “Convert formats”.',
    conv_html: `<h3>Read directly</h3>
      <p>SVS (Aperio/Leica), pyramidal TIFF / BigTIFF and OME-TIFF (including QuPath export). Drag the file onto the
      “Analyse slide” tab or click to choose it.</p>
      <h3>Other scanner formats — convert locally first</h3>
      <p>Conversion runs on your computer; slides are never uploaded. The result is a pyramidal TIFF with the original
      pixel size, which you then drop into UMW Scaler.</p>
      <table><tr><th>Format</th><th>Scanner</th><th>How</th></tr>
      <tr><td>.mrxs (+ folder of the same name)</td><td>3DHistech</td><td>A or B</td></tr>
      <tr><td>.ndpi</td><td>Hamamatsu</td><td>A or B</td></tr>
      <tr><td>.scn, .vms/.vmu, .bif, .svslide, DICOM</td><td>Leica, Hamamatsu, Roche/Ventana, Sakura, DICOM-WSI</td><td>A</td></tr>
      <tr><td>.czi</td><td>Zeiss</td><td>B</td></tr>
      <tr><td>.isyntax</td><td>Philips</td><td>export as TIFF in the Philips software</td></tr></table>
      <h3>A — libvips (fast, whole folders; ≈ 30 s per slide) — recommended</h3>
      <p>1. Install once: macOS <code>brew install vips</code> · Ubuntu/Debian <code>sudo apt install libvips-tools</code> ·
      Windows: download <b>vips-dev-w64-all</b> from github.com/libvips/build-win64-mxe/releases and unzip it.</p>
      <p>2. Download the script, put it in the folder with your slides and run it
      (macOS/Linux: <code>bash convert_to_tiff.sh</code> in Terminal; Windows: right-click → <i>Run with PowerShell</i>).
      For MRXS keep the .mrxs file together with its folder.</p>
      <p><button data-dl="sh">Download script — macOS / Linux</button><button data-dl="ps1">Download script — Windows</button></p>
      <p>Or a single slide, typed in Terminal:</p>
      <pre>vips flatten slide.mrxs "slide_umws.tif[compression=jpeg,Q=90,tile,tile-width=256,tile-height=256,pyramid,bigtiff]" --background 255</pre>
      <p>Output: <code>&lt;name&gt;_umws.tif</code> (white background, full-colour JPEG quality 90, tiled pyramid; ≈ 2–3× the size
      of the original). Tested on macOS with MRXS: results identical to the original slide (tile-level cosine 0.9999).
      The Windows script uses the same libvips command but was not tested by us.</p>
      <p><b>Important:</b> do not convert with lower JPEG quality or other tools' default JPEG settings. Colour subsampling
      (YCbCr 4:2:0) shifted the model's outputs in our tests (e.g. monosomy-3 probability 0.76 → 0.66).</p>
      <h3>B — QuPath (lossless; ≈ 2 min and ≈ 4 GB per large slide)</h3>
      <p>QuPath's command-line converter with lossless ZLIB compression (identical results to the original slide):</p>
      <pre>QuPath convert-ome -y=2 -c=ZLIB --tile-size=512 --big-tiff slide.mrxs slide.ome.tif</pre>
      <p>In the QuPath window (<i>File → Export images… → OME TIFF</i>) choose a lossless compression (ZLIB or LZW), not JPEG.
      Then drop the <code>.ome.tif</code> here.</p>
      <h3>Check after loading</h3>
      <p>The log shows the pixel size and where it came from, e.g. <i>0.389 µm/px (TIFF resolution tags)</i>. Typical values
      are 0.2–0.5 µm/px (20–40×). If it says “manual”, enter the pixel size in the field on the left.</p>`,
    gate_title: 'UMW Scaler — restricted preview',
    gate_text: 'This is a non-public research preview. Enter the access password you received from the study team.',
    gate_pw: 'Password', gate_btn: 'Unlock', gate_wrong: 'Wrong password (or files could not be decrypted).',
    gate_loading: 'Decrypting and loading the model (≈ 90 MB, first time may take a minute)…',
    modal_title: 'Before you continue — please read',
    modal_html: `<p><b>Research Use Only.</b> UMW Scaler is an experimental research tool. It is <b>not a medical device</b>, has not been
      cleared or approved by any regulatory authority and <b>must not be used for diagnosis, prognosis or treatment decisions</b>
      for any patient.</p>
      <p><b>Your data stay on your computer.</b> The slide image and any clinical values you enter are processed entirely
      inside your web browser (TensorFlow.js / WebGPU). Nothing is uploaded, stored or sent to any server.</p>
      <p><b>Supported input:</b> H&amp;E whole-slide images in SVS (Aperio), TIFF or OME-TIFF format containing the pixel size
      (µm/px) or with the pixel size entered manually. MRXS (3DHistech) and other formats are supported only by the
      command-line version. Images should be de-identified before use.</p>
      <p><b>Model and limitations:</b> developed on 161 enucleated uveal melanomas from Wroclaw Medical University and
      externally tested on 80 TCGA-UVM cases. Estimates carry wide uncertainty and may not generalise to other
      laboratories, scanners or staining protocols.</p>
      <p><b>Third-party model:</b> image features are computed with Google Path Foundation, converted to TensorFlow.js
      (modified files). HAI-DEF is provided under and subject to the
      <a href="https://developers.google.com/health-ai-developer-foundations/terms" target="_blank" rel="noopener">Health AI Developer Foundations Terms of Use</a>;
      its use is subject to the HAI-DEF Prohibited Use Policy.</p>
      <p>By clicking <b>“I agree”</b> you confirm that you have read and accept these conditions and will use the tool for research only.</p>`,
    modal_btn: 'I agree',
    ruo: '<b>Research Use Only.</b> Not a medical device; not for clinical decisions. Developed on 161 UMW cases, tested on 80 TCGA-UVM cases; wide uncertainty.',
    in_file: 'H&E whole-slide image', in_url: '…or file URL (local testing)', in_mpp: 'Pixel size µm/px (if missing in file)',
    clin: 'Clinical data (optional)', c_diam: 'Largest basal diameter [mm]', c_height: 'Greatest height [mm]', c_age: 'Age [years]',
    c_extra: 'Extraocular extension', c_bap1: 'BAP1 loss (IHC) / monosomy 3 — used for prognosis only',
    unknown: 'unknown', no: 'no', yes: 'yes', run: 'Analyse', loading: 'Loading model…',
    how_title: 'How it works',
    how_html: `<p>1) tissue mask from the thumbnail; 2) 224-px tiles at 1 µm/px → Google Path Foundation (ViT-S) → tumour/non-tumour
      classifier with 3×3 smoothing = automatic tumour outline; 3) 500 random tumour tiles at 0.5 µm/px → mean embedding →
      linear models: probability of BAP1 loss / monosomy 3 and Cox linear predictors for OS and DFS, reported as a percentile
      of the UMW cohort and a risk group (tertiles) with cross-validated Kaplan–Meier survival.</p>`,
    // komunikaty i wyniki
    l_backend: 'TF.js backend', l_loaded: 'Model and UMW Scaler heads loaded', l_wsi: 'Slide', l_levels: 'pyramid levels',
    l_tissue: 'Tissue tiles (1 µm/px)', l_tumor: 'Tumour tiles', l_used: 'Tumour tiles used', l_checked: 'checked',
    p_roi: 'Automatic tumour outline', p_feat: 'Tumour features (0.5 µm/px)', p_done: 'Done in', err: 'ERROR',
    e_nofile: 'Choose an SVS/TIFF file.', e_nompp: 'No pixel size in file — enter µm/px manually.',
    e_notumor: 'No tumour detected (or area too small) — check the slide.',
    r_m3: 'Molecular risk (BAP1 loss / monosomy 3)', r_model: 'model', m_img: 'image only', m_full: 'image + clinical',
    r_os: 'Overall survival (OS)', r_dfs: 'Disease-free survival (DFS)', r_pct: 'percentile of risk in the UMW cohort',
    r_group: 'Risk group', r_groupsurv: 'in this group in UMW (cross-validated, n=', r_free: ') event-free survival',
    r_3y: '3 years', r_5y: '5 years', g_low: 'low', g_mid: 'intermediate', g_high: 'high',
    r_qc: 'Quality control', r_qc_txt: 'Green fields on the thumbnail = automatic tumour outline. If the outline is clearly wrong, the result is not reliable.',
    call_loss: 'Confident call: BAP1 loss / monosomy 3 likely', call_retained: 'Confident call: BAP1 retained / disomy 3 likely', call_uncertain: 'Uncertain — molecular testing recommended', call_na: '',
    call_note: 'Confidence layer: split-conformal prediction (α = 0.10) calibrated on the UMW cohort; on TCGA (fully automatic) 31–42% of cases received a confident call, with 94–96% accuracy.', r_art: 'artefact tiles skipped',
    r_tissue: 'tissue tiles', r_tum: 'tumour', r_usedf: 'used for features', r_time: 'time', r_dl: 'Download report (JSON)', r_toform: 'Add to validation form', nav_scaler: 'Analyse slide', nav_form: 'Validation data form', nav_form_note: 'The data form is in English for all centres. Entries stay in this browser until you export a CSV.',
  },
  pl: {
    drop_text: 'Upuść tu plik preparatu albo kliknij, aby wybrać (SVS, TIFF, OME-TIFF)', nav_convert: 'Konwersja formatów',
    l_mpp: 'Rozdzielczość', e_nopyramid: 'Ten TIFF nie ma piramidy (poziomów pomniejszonych) — przekonwertuj go skryptem albo w QuPath (zakładka „Konwersja formatów”).',
    e_format: 'Tego formatu przeglądarka nie odczyta — najpierw przekonwertuj do TIFF (zakładka „Konwersja formatów”; ok. 30 s na preparat, lokalnie).',
    e_folder: 'To folder (np. MRXS). Najpierw przekonwertuj preparat do TIFF — zakładka „Konwersja formatów”.',
    conv_html: `<h3>Odczyt bezpośredni</h3>
      <p>SVS (Aperio/Leica), piramidalny TIFF / BigTIFF i OME-TIFF (także eksport z QuPath). Przeciągnij plik na zakładkę
      „Analiza preparatu” albo kliknij, aby go wybrać.</p>
      <h3>Inne formaty skanerów — najpierw konwersja na Twoim komputerze</h3>
      <p>Konwersja działa lokalnie, preparaty nigdzie nie są wysyłane. Wynik to piramidalny TIFF z oryginalną rozdzielczością,
      który potem upuszczasz w UMW Scaler.</p>
      <table><tr><th>Format</th><th>Skaner</th><th>Sposób</th></tr>
      <tr><td>.mrxs (+ folder o tej samej nazwie)</td><td>3DHistech</td><td>A lub B</td></tr>
      <tr><td>.ndpi</td><td>Hamamatsu</td><td>A lub B</td></tr>
      <tr><td>.scn, .vms/.vmu, .bif, .svslide, DICOM</td><td>Leica, Hamamatsu, Roche/Ventana, Sakura, DICOM-WSI</td><td>A</td></tr>
      <tr><td>.czi</td><td>Zeiss</td><td>B</td></tr>
      <tr><td>.isyntax</td><td>Philips</td><td>eksport do TIFF w oprogramowaniu Philips</td></tr></table>
      <h3>A — libvips (szybko, całe foldery; ok. 30 s na preparat) — zalecane</h3>
      <p>1. Instalacja jednorazowa: macOS <code>brew install vips</code> · Ubuntu/Debian <code>sudo apt install libvips-tools</code> ·
      Windows: pobierz <b>vips-dev-w64-all</b> z github.com/libvips/build-win64-mxe/releases i rozpakuj.</p>
      <p>2. Pobierz skrypt, umieść go w folderze z preparatami i uruchom
      (macOS/Linux: <code>bash convert_to_tiff.sh</code> w Terminalu; Windows: prawy przycisk → <i>Uruchom za pomocą programu PowerShell</i>).
      Przy MRXS plik .mrxs musi leżeć razem ze swoim folderem.</p>
      <p><button data-dl="sh">Pobierz skrypt — macOS / Linux</button><button data-dl="ps1">Pobierz skrypt — Windows</button></p>
      <p>Albo pojedynczy preparat, wpisany w Terminalu:</p>
      <pre>vips flatten preparat.mrxs "preparat_umws.tif[compression=jpeg,Q=90,tile,tile-width=256,tile-height=256,pyramid,bigtiff]" --background 255</pre>
      <p>Wynik: <code>&lt;nazwa&gt;_umws.tif</code> (białe tło, pełnokolorowy JPEG jakość 90, piramida kafelkowa; ok. 2–3× większy
      od oryginału). Przetestowane na macOS z MRXS: wyniki identyczne z oryginałem (zgodność kafelków cos 0,9999).
      Skrypt Windows używa tego samego polecenia libvips, ale nie był przez nas testowany.</p>
      <p><b>Ważne:</b> nie konwertuj z niższą jakością JPEG ani domyślnymi ustawieniami JPEG innych programów. Podpróbkowanie
      koloru (YCbCr 4:2:0) przesuwało w naszych testach wyniki modelu (np. prawdopodobieństwo monosomii 3: 0,76 → 0,66).</p>
      <h3>B — QuPath (bezstratnie; ok. 2 min i ok. 4 GB na duży preparat)</h3>
      <p>Konwerter QuPath z bezstratną kompresją ZLIB (wyniki identyczne z oryginałem):</p>
      <pre>QuPath convert-ome -y=2 -c=ZLIB --tile-size=512 --big-tiff preparat.mrxs preparat.ome.tif</pre>
      <p>W oknie QuPath (<i>File → Export images… → OME TIFF</i>) wybierz kompresję bezstratną (ZLIB lub LZW), nie JPEG.
      Potem upuść plik <code>.ome.tif</code> tutaj.</p>
      <h3>Kontrola po wczytaniu</h3>
      <p>W logu widać rozdzielczość i jej źródło, np. <i>0.389 µm/px (TIFF resolution tags)</i>. Typowo 0,2–0,5 µm/px (20–40×).
      Jeśli widać „manual”, wpisz rozdzielczość w polu po lewej.</p>`,
    subtitle: 'Uveal Melanoma Wroclaw Scale — model badawczy 1.0 (zamrożony) · wszystkie obliczenia na tym komputerze, dane nie opuszczają przeglądarki',
    gate_title: 'UMW Scaler — podgląd z ograniczonym dostępem',
    gate_text: 'To niepubliczna wersja badawcza. Wpisz hasło dostępu otrzymane od zespołu badawczego.',
    gate_pw: 'Hasło', gate_btn: 'Odblokuj', gate_wrong: 'Błędne hasło (lub nie udało się odszyfrować plików).',
    gate_loading: 'Odszyfrowywanie i wczytywanie modelu (ok. 90 MB, za pierwszym razem może potrwać minutę)…',
    modal_title: 'Zanim przejdziesz dalej — przeczytaj',
    modal_html: `<p><b>Wyłącznie do celów badawczych (Research Use Only).</b> UMW Scaler to eksperymentalne narzędzie badawcze.
      <b>Nie jest wyrobem medycznym</b>, nie zostało zatwierdzone przez żaden organ regulacyjny i <b>nie może służyć do diagnozy,
      rokowania ani decyzji terapeutycznych</b> u jakiegokolwiek pacjenta.</p>
      <p><b>Twoje dane zostają na Twoim komputerze.</b> Obraz preparatu i wpisane dane kliniczne są przetwarzane w całości
      w przeglądarce (TensorFlow.js / WebGPU). Nic nie jest wysyłane, zapisywane ani przekazywane na żaden serwer.</p>
      <p><b>Obsługiwane pliki:</b> preparaty H&amp;E w formacie SVS (Aperio), TIFF lub OME-TIFF z zapisaną rozdzielczością (µm/px)
      albo z rozdzielczością wpisaną ręcznie. MRXS (3DHistech) i inne formaty obsługuje tylko wersja wiersza poleceń.
      Obrazy powinny być zanonimizowane.</p>
      <p><b>Model i ograniczenia:</b> opracowany na 161 enukleacjach czerniaka błony naczyniowej z Uniwersytetu Medycznego we Wrocławiu
      i przetestowany zewnętrznie na 80 przypadkach TCGA-UVM. Wyniki są obarczone dużą niepewnością i mogą nie przenosić się
      na inne laboratoria, skanery czy protokoły barwienia.</p>
      <p><b>Model zewnętrzny:</b> cechy obrazu liczone są modelem Google Path Foundation, przekonwertowanym do TensorFlow.js
      (pliki zmodyfikowane). HAI-DEF is provided under and subject to the
      <a href="https://developers.google.com/health-ai-developer-foundations/terms" target="_blank" rel="noopener">Health AI Developer Foundations Terms of Use</a>;
      obowiązuje HAI-DEF Prohibited Use Policy.</p>
      <p>Klikając <b>„Zgoda”</b> potwierdzasz, że zapoznałeś(-aś) się z tymi warunkami, akceptujesz je i użyjesz narzędzia wyłącznie do badań.</p>`,
    modal_btn: 'Zgoda',
    ruo: '<b>Wyłącznie do celów badawczych.</b> Nie jest wyrobem medycznym; nie służy do decyzji klinicznych. Model: 161 przypadków UMW, test: 80 TCGA-UVM; duża niepewność.',
    in_file: 'Preparat H&E', in_url: '…albo adres URL pliku (test lokalny)', in_mpp: 'Rozdzielczość µm/px (gdy brak w pliku)',
    clin: 'Dane kliniczne (opcjonalnie)', c_diam: 'Największa średnica podstawy [mm]', c_height: 'Największa wysokość [mm]', c_age: 'Wiek [lata]',
    c_extra: 'Naciek pozagałkowy', c_bap1: 'Utrata BAP1 (IHC) / monosomia 3 — tylko do rokowania',
    unknown: 'nie wiadomo', no: 'nie', yes: 'tak', run: 'Analizuj', loading: 'Wczytywanie modelu…',
    how_title: 'Jak to działa',
    how_html: `<p>1) maska tkanki z miniatury; 2) kafelki 224 px przy 1 µm/px → Google Path Foundation (ViT-S) → klasyfikator guz/nie-guz
      z wygładzeniem 3×3 = automatyczny obrys; 3) 500 losowych kafelków guza przy 0,5 µm/px → średni embedding → modele liniowe:
      prawdopodobieństwo utraty BAP1 / monosomii 3 oraz predyktory Coxa dla OS i DFS, raportowane jako percentyl kohorty UMW
      i grupa ryzyka (tercyle) z przeżyciem Kaplana-Meiera z walidacji krzyżowej.</p>`,
    l_backend: 'Backend TF.js', l_loaded: 'Model i głowice UMW Scaler wczytane', l_wsi: 'Preparat', l_levels: 'poziomów piramidy',
    l_tissue: 'Kafelki tkanki (1 µm/px)', l_tumor: 'Kafelki guza', l_used: 'Użyte kafelki guza', l_checked: 'sprawdzone',
    p_roi: 'Auto-obrys guza', p_feat: 'Cechy guza (0,5 µm/px)', p_done: 'Gotowe w', err: 'BŁĄD',
    e_nofile: 'Wybierz plik SVS/TIFF.', e_nompp: 'Brak rozdzielczości w pliku — wpisz µm/px ręcznie.',
    e_notumor: 'Nie wykryto guza (lub za mały obszar) — sprawdź preparat.',
    r_m3: 'Ryzyko molekularne (utrata BAP1 / monosomia 3)', r_model: 'model', m_img: 'tylko obraz', m_full: 'obraz + klinika',
    r_os: 'Przeżycie całkowite (OS)', r_dfs: 'Przeżycie wolne od choroby (DFS)', r_pct: 'percentyl ryzyka w kohorcie UMW',
    r_group: 'Grupa ryzyka', r_groupsurv: 'w tej grupie w UMW (walidacja krzyżowa, n=', r_free: ') przeżycie wolne od zdarzenia',
    r_3y: '3 lata', r_5y: '5 lat', g_low: 'niskie', g_mid: 'pośrednie', g_high: 'wysokie',
    r_qc: 'Kontrola jakości', r_qc_txt: 'Zielone pola na miniaturze = automatyczny obrys guza. Jeśli obrys jest wyraźnie błędny, wynik jest niewiarygodny.',
    call_loss: 'Pewne: prawdopodobna utrata BAP1 / monosomia 3', call_retained: 'Pewne: prawdopodobnie BAP1 zachowany / disomia 3', call_uncertain: 'Niepewne — zalecane badanie molekularne', call_na: '',
    call_note: 'Warstwa niepewności: conformal prediction (α = 0,10) skalibrowana na kohorcie UMW; w TCGA (pełny automat) 31–42% przypadków dostało pewną decyzję, z trafnością 94–96%.', r_art: 'pominięte kafelki-artefakty',
    r_tissue: 'kafelki tkanki', r_tum: 'guz', r_usedf: 'użyte do cech', r_time: 'czas', r_dl: 'Pobierz raport (JSON)', r_toform: 'Dodaj do formularza walidacji', nav_scaler: 'Analiza preparatu', nav_form: 'Formularz danych (walidacja)', nav_form_note: 'Formularz jest po angielsku (wspólny dla ośrodków). Wpisy zostają w tej przeglądarce do momentu eksportu CSV.',
  },
};
let LANG = (() => { try { return localStorage.getItem('umws_lang') || 'en'; } catch (e) { return 'en'; } })();
function T(k) { return (I18N[LANG] && I18N[LANG][k]) || I18N.en[k] || k; }
function applyI18n() {
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = T(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = T(el.dataset.i18nHtml); });
  document.querySelectorAll('.langbtn').forEach(b => b.classList.toggle('on', b.dataset.lang === LANG));
  if (window.UMWScaler && window.UMWScaler.rerender) window.UMWScaler.rerender();
}
function setLang(l) { LANG = l; try { localStorage.setItem('umws_lang', l); } catch (e) {} applyI18n(); }
