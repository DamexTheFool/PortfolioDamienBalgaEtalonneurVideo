/* =============================================
   INTERNATIONALISATION — FR (base) / EN / DE
   ---------------------------------------------
   • Le français reste la langue de base : il est écrit
     directement dans le HTML (lu par les moteurs de recherche
     et affiché même sans JavaScript).
   • Les éléments traduisibles portent :
       data-i18n="clé"                → remplace le contenu HTML
       data-i18n-attr="attr:clé;..."  → remplace des attributs
                                        (alt, aria-label, data-caption…)
   • Le choix de langue est mémorisé (localStorage) et peut
     être forcé via l'URL : ?lang=en  /  ?lang=de
   ============================================= */
(function () {
  'use strict';

  var SUPPORTED = ['fr', 'en', 'de'];
  var DEFAULT_LANG = 'fr';
  var STORAGE_KEY = 'db-lang';

  /* ---------- DICTIONNAIRES (EN / DE) ---------- */
  var T = {
    en: {
      /* ---- commun ---- */
      'nav.aria': 'Main navigation',
      'nav.home': 'Home',
      'nav.work': 'Work',
      'nav.stills': 'Stills',
      'nav.ba': 'Before / After',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'menu.open': 'Open menu',
      'menu.label': 'Menu',
      'logo.aria': 'Back to home',
      'lang.group': 'Language',
      'footer.role': 'Video Colorist',

      /* ---- index ---- */
      'index.title': 'Damien Balga — Video Colorist',
      'index.desc': 'Portfolio of Damien Balga, video colorist & color grader. Cinema color grading, music videos, commercials. DaVinci Resolve.',
      'index.intro.sub': 'Colorist · DaVinci Resolve',
      'index.hero.aria': 'Introduction',
      'index.hero.badge': 'Available for your projects',
      'index.hero.h1': 'Video<br><span class="accent-orange">Colorist</span> &amp;<br><span class="accent-cyan">Color Grader</span>',
      'index.hero.desc': 'I give your images a <strong>strong visual identity</strong>. Films, music videos, commercials — every shot is treated with a tailor-made approach, inspired by cinema and the standards of modern productions.',
      'index.hero.cta1': 'See my work',
      'index.hero.cta2': "Let's work together",
      'index.stat.projects': 'Projects',
      'index.stat.formats': 'Formats',
      'index.stat.tool': 'Tool · DaVinci',
      'index.portrait.alt': 'Damien Balga – Video colorist',
      'index.pb.label': 'Software',
      'index.reels.eyebrow': 'Showreel',
      'index.reels.h2': 'Project excerpts',
      'index.reels.p': 'A few glimpses of my color grades — full frame.',
      'type.leisure': 'Leisure',
      'type.ad': 'Advertising',
      'type.interactive': 'Interactive Film',
      'type.leisurevfx': 'Leisure / VFX',
      'type.regrade': 'Cinematic Regrade',
      'index.reels.all': 'See all my work →',
      'index.ba.eyebrow': 'Before / After',
      'index.ba.h2': 'Before / After Grading',
      'index.ba.p': 'Slide to compare the raw image with the graded image.',
      'ba.before.alt': 'Before grading',
      'ba.after.alt': 'After grading',
      'ba.before': 'BEFORE',
      'ba.after': 'AFTER',
      'index.about.eyebrow': 'About',
      'index.about.h2': 'A passion<br>for color',
      'index.about.lead': 'I am a video colorist specialized in <strong>creating looks</strong> and emotions through color.',
      'index.about.p1': 'I help directors, brands and creators give their images a strong visual identity. My work focuses on light, contrast and color consistency in order to create a unique, narrative atmosphere.',
      'index.about.p2': 'Every project is handled with a tailor-made approach, inspired by cinema and the standards of modern productions.',
      'tag.ad': 'Advertising',
      'tag.short': 'Short film',
      'tag.film': 'Film',
      'tag.clip': 'Music video',
      'index.about.btn1': 'My work',
      'index.about.btn2': 'Contact me',
      'scope.cg': 'Color Grading',
      'scope.lookdev': 'Look Development',
      'scope.expert': 'Expert',
      'scope.advanced': 'Advanced',
      'scope.inter': 'Intermediate',
      'scope.film': 'Film Grading',

      /* ---- work ---- */
      'work.title': 'Work — Damien Balga · Colorist',
      'work.desc': 'Color grading projects by Damien Balga: films, music videos, commercials, short films.',
      'work.intro.h1': 'Work',
      'work.eyebrow': 'Video portfolio',
      'work.h1': 'My Work',
      'work.sub': 'Color grading · Films · Commercials · Music videos · Short films',
      'work.filter.aria': 'Filter by category',
      'work.f.all': 'All',
      'work.f.film': 'Film',
      'work.f.ad': 'Advertising',
      'work.f.leisure': 'Leisure',
      'work.f.regrade': 'Regrade',
      'work.f.animalier': 'Wildlife',
      'work.none': '// No projects in this category',

      /* ---- stills ---- */
      'stills.title': 'Stills — Damien Balga · Colorist',
      'stills.desc': 'Color grading stills by Damien Balga — frames taken from his projects.',
      'stills.intro.h1': 'Stills',
      'stills.eyebrow': 'Graded frames',
      'stills.h1': 'Project Stills',
      'stills.sub': 'Films · Commercials · Wildlife · Leisure — click to enlarge',
      'type.wildlife': 'Wildlife',
      'lb.aria': 'Enlarged image',
      'lb.close': 'Close',

      /* ---- contact ---- */
      'contact.title': 'Contact — Damien Balga · Colorist',
      'contact.desc': 'Contact Damien Balga for your color grading, video colorist, film, music video or commercial projects.',
      'contact.intro.h1': 'Contact',
      'contact.eyebrow': "Let's work together",
      'contact.h1': 'Let\'s bring<br><span style="color:var(--orange)">your images</span> to life',
      'contact.hero.p': 'Available for color grading, commercial, music video or short film projects. My goal: to give your images a strong and consistent visual identity.',
      'contact.section.aria': 'Contact information',
      'contact.h2': 'What kind of project?',
      'contact.pt.film': 'Film',
      'contact.pt.film.d': 'Short film · Documentary',
      'contact.pt.clip': 'Music video',
      'contact.pt.clip.d': 'Music video · Teaser',
      'contact.pt.ad': 'Ad',
      'contact.pt.ad.d': 'Commercial · Brand content',
      'contact.pt.regrade': 'Regrade',
      'contact.pt.regrade.d': 'Regrade · Look dev',
      'contact.details': 'Contact details',
      'contact.mail.aria': 'Send an email to damienbalga@gmail.com',
      'contact.li.aria': "Damien Balga's LinkedIn",
      'contact.yt.aria': "Damien Balga's YouTube",
      'contact.ig.aria': "Damien Balga's Instagram",
      'contact.vm.aria': "Damien Balga's Vimeo",
      'contact.social': 'Social media',
      'contact.france': 'France',
      'contact.fast': 'Quick reply',
      'contact.portrait.alt': 'Damien Balga – Video Colorist',
      'contact.avail': 'Available for new projects',
      'contact.avail.s': 'Film · Music video · Commercial · Regrade',
      'contact.spec': 'Specialties'
    },

    de: {
      /* ---- commun ---- */
      'nav.aria': 'Hauptnavigation',
      'nav.home': 'Startseite',
      'nav.work': 'Arbeiten',
      'nav.stills': 'Stills',
      'nav.ba': 'Vorher / Nachher',
      'nav.about': 'Über mich',
      'nav.contact': 'Kontakt',
      'menu.open': 'Menü öffnen',
      'menu.label': 'Menü',
      'logo.aria': 'Zurück zur Startseite',
      'lang.group': 'Sprache',
      'footer.role': 'Video-Colorist',

      /* ---- index ---- */
      'index.title': 'Damien Balga — Video-Colorist',
      'index.desc': 'Portfolio von Damien Balga, Video-Colorist & Color Grader. Color Grading fürs Kino, Musikvideos, Werbespots. DaVinci Resolve.',
      'index.intro.sub': 'Colorist · DaVinci Resolve',
      'index.hero.aria': 'Vorstellung',
      'index.hero.badge': 'Verfügbar für Ihre Projekte',
      'index.hero.h1': 'Video-<br><span class="accent-orange">Colorist</span> &amp;<br><span class="accent-cyan">Color Grader</span>',
      'index.hero.desc': 'Ich gebe Ihren Bildern eine <strong>starke visuelle Identität</strong>. Filme, Musikvideos, Werbespots — jedes Bild wird individuell behandelt, inspiriert vom Kino und von den Standards moderner Produktionen.',
      'index.hero.cta1': 'Meine Arbeiten ansehen',
      'index.hero.cta2': 'Lassen Sie uns zusammenarbeiten',
      'index.stat.projects': 'Projekte',
      'index.stat.formats': 'Formate',
      'index.stat.tool': 'Tool · DaVinci',
      'index.portrait.alt': 'Damien Balga – Video-Colorist',
      'index.pb.label': 'Software',
      'index.reels.eyebrow': 'Showreel',
      'index.reels.h2': 'Projektausschnitte',
      'index.reels.p': 'Einige Einblicke in meine Color Gradings — im Vollformat.',
      'type.leisure': 'Freizeit',
      'type.ad': 'Werbung',
      'type.interactive': 'Interaktiver Film',
      'type.leisurevfx': 'Freizeit / VFX',
      'type.regrade': 'Kinematografisches Regrade',
      'index.reels.all': 'Alle Arbeiten ansehen →',
      'index.ba.eyebrow': 'Vorher / Nachher',
      'index.ba.h2': 'Vorher / Nachher im Grading',
      'index.ba.p': 'Schieben Sie den Regler, um das Rohbild mit dem gegradeten Bild zu vergleichen.',
      'ba.before.alt': 'Vor dem Grading',
      'ba.after.alt': 'Nach dem Grading',
      'ba.before': 'VORHER',
      'ba.after': 'NACHHER',
      'index.about.eyebrow': 'Über mich',
      'index.about.h2': 'Leidenschaft<br>für Farbe',
      'index.about.lead': 'Ich bin Video-Colorist und darauf spezialisiert, durch Farbe <strong>Looks</strong> und Emotionen zu erschaffen.',
      'index.about.p1': 'Ich helfe Regisseuren, Marken und Kreativen dabei, ihren Bildern eine starke visuelle Identität zu geben. Meine Arbeit konzentriert sich auf Licht, Kontrast und Farbkonsistenz, um eine einzigartige, erzählerische Atmosphäre zu schaffen.',
      'index.about.p2': 'Jedes Projekt wird individuell behandelt, inspiriert vom Kino und von den Standards moderner Produktionen.',
      'tag.ad': 'Werbung',
      'tag.short': 'Kurzfilm',
      'tag.film': 'Film',
      'tag.clip': 'Musikvideo',
      'index.about.btn1': 'Meine Arbeiten',
      'index.about.btn2': 'Kontakt aufnehmen',
      'scope.cg': 'Color Grading',
      'scope.lookdev': 'Look Development',
      'scope.expert': 'Experte',
      'scope.advanced': 'Fortgeschritten',
      'scope.inter': 'Mittel',
      'scope.film': 'Film-Grading',

      /* ---- work ---- */
      'work.title': 'Arbeiten — Damien Balga · Colorist',
      'work.desc': 'Color-Grading-Projekte von Damien Balga: Filme, Musikvideos, Werbespots, Kurzfilme.',
      'work.intro.h1': 'Arbeiten',
      'work.eyebrow': 'Video-Portfolio',
      'work.h1': 'Meine Arbeiten',
      'work.sub': 'Color Grading · Filme · Werbespots · Musikvideos · Kurzfilme',
      'work.filter.aria': 'Nach Kategorie filtern',
      'work.f.all': 'Alle',
      'work.f.film': 'Film',
      'work.f.ad': 'Werbung',
      'work.f.leisure': 'Freizeit',
      'work.f.regrade': 'Regrade',
      'work.f.animalier': 'Tierwelt',
      'work.none': '// Keine Projekte in dieser Kategorie',

      /* ---- stills ---- */
      'stills.title': 'Stills — Damien Balga · Colorist',
      'stills.desc': 'Color-Grading-Stills von Damien Balga — Frames aus seinen Projekten.',
      'stills.intro.h1': 'Stills',
      'stills.eyebrow': 'Gegradete Frames',
      'stills.h1': 'Projekt-Stills',
      'stills.sub': 'Filme · Werbespots · Tierwelt · Freizeit — zum Vergrößern anklicken',
      'type.wildlife': 'Tierwelt',
      'lb.aria': 'Vergrößertes Bild',
      'lb.close': 'Schließen',

      /* ---- contact ---- */
      'contact.title': 'Kontakt — Damien Balga · Colorist',
      'contact.desc': 'Kontaktieren Sie Damien Balga für Ihre Projekte in den Bereichen Color Grading, Video-Colorist, Film, Musikvideo oder Werbung.',
      'contact.intro.h1': 'Kontakt',
      'contact.eyebrow': 'Lassen Sie uns zusammenarbeiten',
      'contact.h1': 'Erwecken wir<br><span style="color:var(--orange)">Ihre Bilder</span> zum Leben',
      'contact.hero.p': 'Verfügbar für Projekte in den Bereichen Color Grading, Werbung, Musikvideo oder Kurzfilm. Mein Ziel: Ihren Bildern eine starke und stimmige visuelle Identität zu geben.',
      'contact.section.aria': 'Kontaktinformationen',
      'contact.h2': 'Für welches Projekt?',
      'contact.pt.film': 'Film',
      'contact.pt.film.d': 'Kurzfilm · Dokumentarfilm',
      'contact.pt.clip': 'Musikvideo',
      'contact.pt.clip.d': 'Musikvideo · Teaser',
      'contact.pt.ad': 'Werbung',
      'contact.pt.ad.d': 'Werbespot · Brand Content',
      'contact.pt.regrade': 'Regrade',
      'contact.pt.regrade.d': 'Regrade · Look Dev',
      'contact.details': 'Kontaktdaten',
      'contact.mail.aria': 'E-Mail an damienbalga@gmail.com senden',
      'contact.li.aria': 'LinkedIn von Damien Balga',
      'contact.yt.aria': 'YouTube von Damien Balga',
      'contact.ig.aria': 'Instagram von Damien Balga',
      'contact.vm.aria': 'Vimeo von Damien Balga',
      'contact.social': 'Soziale Netzwerke',
      'contact.france': 'Frankreich',
      'contact.fast': 'Schnelle Antwort',
      'contact.portrait.alt': 'Damien Balga – Video-Colorist',
      'contact.avail': 'Verfügbar für neue Projekte',
      'contact.avail.s': 'Film · Musikvideo · Werbung · Regrade',
      'contact.spec': 'Spezialgebiete'
    }
  };

  /* ---------- Utilitaires ---------- */
  function getStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function setStored(v) {
    try { localStorage.setItem(STORAGE_KEY, v); } catch (e) { /* stockage indisponible */ }
  }
  function fromUrl() {
    try {
      var l = new URLSearchParams(window.location.search).get('lang');
      return l && SUPPORTED.indexOf(l.toLowerCase()) > -1 ? l.toLowerCase() : null;
    } catch (e) { return null; }
  }

  /* ---------- Cache du contenu français d'origine ---------- */
  var frHTML = new WeakMap();   // élément -> innerHTML FR
  var frAttr = new WeakMap();   // élément -> { attr: valeur FR }
  var frMeta = {};              // title / description FR

  function cacheFrench() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      frHTML.set(el, el.innerHTML);
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var store = {};
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var attr = pair.split(':')[0].trim();
        if (attr) store[attr] = el.getAttribute(attr);
      });
      frAttr.set(el, store);
    });
    frMeta.title = document.title;
    var md = document.querySelector('meta[name="description"]');
    frMeta.desc = md ? md.getAttribute('content') : '';
  }

  /* ---------- Application d'une langue ---------- */
  var current = DEFAULT_LANG;

  function apply(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    current = lang;
    var dict = T[lang]; // undefined pour fr → on restaure le HTML d'origine

    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict && dict[key] !== undefined) el.innerHTML = dict[key];
      else if (frHTML.has(el)) el.innerHTML = frHTML.get(el);
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var fr = frAttr.get(el) || {};
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        var attr = (parts[0] || '').trim();
        var key = (parts[1] || '').trim();
        if (!attr) return;
        if (dict && dict[key] !== undefined) el.setAttribute(attr, dict[key]);
        else if (fr[attr] !== undefined && fr[attr] !== null) el.setAttribute(attr, fr[attr]);
      });
    });

    /* <title> et meta description */
    var titleKey = document.documentElement.getAttribute('data-i18n-title');
    var descKey = document.documentElement.getAttribute('data-i18n-desc');
    var md = document.querySelector('meta[name="description"]');
    document.title = (dict && titleKey && dict[titleKey]) || frMeta.title;
    if (md) md.setAttribute('content', (dict && descKey && dict[descKey]) || frMeta.desc);

    /* État du sélecteur de langue */
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
    });

    /* Le lightbox ouvert doit refléter la langue */
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: lang } }));
  }

  function setLang(lang) {
    setStored(lang);
    apply(lang);
  }

  /* ---------- Init ---------- */
  function init() {
    cacheFrench();

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang'));
      });
    });

    var lang = fromUrl() || getStored() || DEFAULT_LANG;
    if (lang !== DEFAULT_LANG) apply(lang);
    else apply(DEFAULT_LANG); // synchronise l'état visuel des boutons
  }

  window.I18N = { setLang: setLang, getLang: function () { return current; }, dict: T };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
