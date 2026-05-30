import { writeFileSync, mkdirSync } from "node:fs";

mkdirSync("data", { recursive: true });

const LEVELS = {
  A1: [
    ["Haus","das","дом"],["Wasser","das","вода"],["Brot","das","хлеб"],["Milch","die","молоко"],["Tisch","der","стол"],["Stuhl","der","стул"],["Fenster","das","окно"],["Tür","die","дверь"],["Familie","die","семья"],["Freund","der","друг"],["Mutter","die","мама"],["Vater","der","папа"],["Kind","das","ребёнок"],["Name","der","имя"],["Stadt","die","город"],["Straße","die","улица"],["Auto","das","машина"],["Zug","der","поезд"],["Tag","der","день"],["Nacht","die","ночь"],["Morgen","der","утро"],["Abend","der","вечер"],["Schule","die","школа"],["Arbeit","die","работа"],["Buch","das","книга"],["Handy","das","мобильный телефон"],["Kaffee","der","кофе"],["Tee","der","чай"],["Apfel","der","яблоко"],["Zeit","die","время"],["Geld","das","деньги"],["Frage","die","вопрос"],["Antwort","die","ответ"],["Zimmer","das","комната"],["Küche","die","кухня"],["Bad","das","ванная"],["Bett","das","кровать"],["Kleidung","die","одежда"],["Schuh","der","ботинок"],["Essen","das","еда"],["Hunger","der","голод"],["Durst","der","жажда"],["Woche","die","неделя"],["Monat","der","месяц"],["Jahr","das","год"],["heute","","сегодня"],["morgen","","завтра"],["gestern","","вчера"],["gut","","хороший"],["klein","","маленький"]
  ],
  A2: [
    ["Atem","der","дыхание"],["Alltag","der","повседневность"],["Ausflug","der","поездка"],["Bahnhof","der","вокзал"],["Besuch","der","визит"],["Einladung","die","приглашение"],["Entscheidung","die","решение"],["Erfahrung","die","опыт"],["Geburtstag","der","день рождения"],["Geschenk","das","подарок"],["Gespräch","das","разговор"],["Gesundheit","die","здоровье"],["Hilfe","die","помощь"],["Hoffnung","die","надежда"],["Karte","die","карта"],["Kunde","der","клиент"],["Lösung","die","решение проблемы"],["Meinung","die","мнение"],["Nachricht","die","сообщение"],["Pause","die","пауза"],["Plan","der","план"],["Problem","das","проблема"],["Reise","die","путешествие"],["Termin","der","встреча"],["Umzug","der","переезд"],["Unterschied","der","разница"],["Verkehr","der","движение"],["Versuch","der","попытка"],["Wetter","das","погода"],["Wohnung","die","квартира"],["Ziel","das","цель"],["Zufall","der","случайность"],["Anfang","der","начало"],["Ende","das","конец"],["Fehler","der","ошибка"],["Grund","der","причина"],["Lärm","der","шум"],["Mitte","die","середина"],["Nähe","die","близость"],["Ruhe","die","тишина"],["Sache","die","вещь"],["Stelle","die","место"],["Teil","der","часть"],["Weg","der","путь"],["Wunsch","der","желание"]
  ],
  B1: [
    ["Abschluss","der","окончание"],["Absicht","die","намерение"],["Angebot","das","предложение"],["Ansicht","die","точка зрения"],["Aufgabe","die","задача"],["Aufmerksamkeit","die","внимание"],["Ausbildung","die","обучение"],["Bedingung","die","условие"],["Begegnung","die","встреча"],["Begriff","der","понятие"],["Beziehung","die","отношения"],["Chance","die","шанс"],["Eindruck","der","впечатление"],["Einfluss","der","влияние"],["Entwicklung","die","развитие"],["Erfolg","der","успех"],["Erinnerung","die","воспоминание"],["Fähigkeit","die","способность"],["Folge","die","последствие"],["Gemeinschaft","die","сообщество"],["Gewohnheit","die","привычка"],["Grenze","die","граница"],["Kenntnis","die","знание"],["Möglichkeit","die","возможность"],["Nachteil","der","недостаток"],["Vorteil","der","преимущество"],["Pflicht","die","обязанность"],["Richtung","die","направление"],["Schwierigkeit","die","трудность"],["Sicherheit","die","безопасность"],["Umgebung","die","окружение"],["Verantwortung","die","ответственность"],["Vergleich","der","сравнение"],["Verhalten","das","поведение"],["Vertrauen","das","доверие"],["Vorschlag","der","предложение"],["Wirkung","die","эффект"],["Zukunft","die","будущее"],["Zusammenhang","der","связь"]
  ],
  B2: [
    ["Abhängigkeit","die","зависимость"],["Anerkennung","die","признание"],["Anforderung","die","требование"],["Auswirkung","die","воздействие"],["Behauptung","die","утверждение"],["Bereitschaft","die","готовность"],["Beschränkung","die","ограничение"],["Darstellung","die","изложение"],["Einschätzung","die","оценка"],["Einstellung","die","отношение"],["Empfehlung","die","рекомендация"],["Erkenntnis","die","понимание"],["Erwartung","die","ожидание"],["Förderung","die","поддержка"],["Herausforderung","die","вызов"],["Hintergrund","der","фон"],["Kriterium","das","критерий"],["Leistung","die","достижение"],["Maßnahme","die","мера"],["Nachhaltigkeit","die","устойчивость"],["Rücksicht","die","учёт интересов"],["Schwerpunkt","der","фокус"],["Tendenz","die","тенденция"],["Überblick","der","обзор"],["Umsetzung","die","реализация"],["Vereinbarung","die","соглашение"],["Verfügbarkeit","die","доступность"],["Voraussetzung","die","предпосылка"],["Wahrnehmung","die","восприятие"],["Widerspruch","der","противоречие"]
  ],
  C1: [
    ["Abwägung","die","взвешивание аргументов"],["Annahme","die","допущение"],["Auslegung","die","толкование"],["Beeinträchtigung","die","ухудшение"],["Befürchtung","die","опасение"],["Belastbarkeit","die","устойчивость к нагрузке"],["Beständigkeit","die","постоянство"],["Denkweise","die","образ мышления"],["Eigenverantwortung","die","личная ответственность"],["Einsicht","die","осознание"],["Folgerung","die","вывод"],["Geltung","die","действительность"],["Gewissheit","die","уверенность"],["Handlungsspielraum","der","пространство для действий"],["Herangehensweise","die","подход"],["Hürde","die","препятствие"],["Nachvollziehbarkeit","die","понятность"],["Sachverhalt","der","обстоятельство дела"],["Tragweite","die","масштаб последствий"],["Unstimmigkeit","die","несогласованность"],["Verbindlichkeit","die","обязательность"],["Verhältnismäßigkeit","die","соразмерность"],["Vermutung","die","предположение"],["Vorgehensweise","die","порядок действий"],["Zuverlässigkeit","die","надёжность"]
  ],
  C2: [
    ["Abgeklärtheit","die","невозмутимость"],["Ambivalenz","die","двойственность"],["Anmaßung","die","самонадеянность"],["Aufrichtigkeit","die","искренность"],["Befangenheit","die","предвзятость"],["Beiläufigkeit","die","мимоходность"],["Beharrlichkeit","die","настойчивость"],["Deutungshoheit","die","право интерпретации"],["Eigensinn","der","своенравие"],["Feingefühl","das","тактичность"],["Gleichmut","der","невозмутимость"],["Hingabe","die","самоотдача"],["Kleingeistigkeit","die","мелочность"],["Nachgiebigkeit","die","уступчивость"],["Schlagfertigkeit","die","находчивость в ответах"],["Selbstgefälligkeit","die","самодовольство"],["Sorgfaltspflicht","die","обязанность проявлять заботу"],["Spitzfindigkeit","die","казуистика"],["Unverfrorenheit","die","наглость"],["Weitblick","der","дальновидность"],["Wortgewandtheit","die","красноречие"],["Zerwürfnis","das","разлад"],["Zwiespalt","der","внутренний конфликт"]
  ]
};

function buildExample(article, de, ru, level) {
  const title = [article, de].filter(Boolean).join(" ");
  if (!article) {
    return {
      de: `Heute benutze ich "${de}" in einem kurzen Satz.`,
      ru: `Сегодня я использую «${ru}» в коротком предложении.`
    };
  }
  if (level === "A1" || level === "A2") {
    return {
      de: `${title} ist heute mein neues Wort.`,
      ru: `${ru[0].toUpperCase()}${ru.slice(1)} — моё новое слово на сегодня.`
    };
  }
  return {
    de: `Im Gespräch benutze ich ${title}, wenn ich über "${ru}" spreche.`,
    ru: `В разговоре я использую «${title}», когда говорю про «${ru}».`
  };
}

const words = [];
for (const [level, base] of Object.entries(LEVELS)) {
  for (let i = 0; i < 365; i++) {
    const [de, article, ru] = base[i % base.length];
    const example = buildExample(article, de, ru, level);
    words.push({
      id: `${level.toLowerCase()}-${String(i + 1).padStart(3, "0")}-${de.toLowerCase().replaceAll(" ", "-")}`,
      de_word: de,
      article,
      ru_translation: ru,
      example_de: example.de,
      example_ru_optional: example.ru,
      tags: ["daily", level.toLowerCase()],
      level,
      source: "generated-seed-list"
    });
  }
}

const baseVerbs = [
  ["sein","быть","ist","war","ist gewesen"],["haben","иметь","hat","hatte","hat gehabt"],["werden","становиться","wird","wurde","ist geworden"],["gehen","идти","geht","ging","ist gegangen"],["kommen","приходить","kommt","kam","ist gekommen"],["machen","делать","macht","machte","hat gemacht"],["sagen","говорить","sagt","sagte","hat gesagt"],["sehen","видеть","sieht","sah","hat gesehen"],["geben","давать","gibt","gab","hat gegeben"],["nehmen","брать","nimmt","nahm","hat genommen"],["finden","находить","findet","fand","hat gefunden"],["bleiben","оставаться","bleibt","blieb","ist geblieben"],["liegen","лежать","liegt","lag","hat gelegen"],["stehen","стоять","steht","stand","hat gestanden"],["denken","думать","denkt","dachte","hat gedacht"],["wissen","знать","weiß","wusste","hat gewusst"],["sprechen","говорить","spricht","sprach","hat gesprochen"],["lesen","читать","liest","las","hat gelesen"],["schreiben","писать","schreibt","schrieb","hat geschrieben"],["arbeiten","работать","arbeitet","arbeitete","hat gearbeitet"],["lernen","учить","lernt","lernte","hat gelernt"],["verstehen","понимать","versteht","verstand","hat verstanden"],["fragen","спрашивать","fragt","fragte","hat gefragt"],["antworten","отвечать","antwortet","antwortete","hat geantwortet"],["helfen","помогать","hilft","half","hat geholfen"],["kaufen","покупать","kauft","kaufte","hat gekauft"],["bezahlen","платить","bezahlt","bezahlte","hat bezahlt"],["fahren","ехать","fährt","fuhr","ist gefahren"],["fliegen","лететь","fliegt","flog","ist geflogen"],["laufen","бежать","läuft","lief","ist gelaufen"],["essen","есть","isst","aß","hat gegessen"],["trinken","пить","trinkt","trank","hat getrunken"],["schlafen","спать","schläft","schlief","hat geschlafen"],["warten","ждать","wartet","wartete","hat gewartet"],["öffnen","открывать","öffnet","öffnete","hat geöffnet"],["schließen","закрывать","schließt","schloss","hat geschlossen"],["beginnen","начинать","beginnt","begann","hat begonnen"],["enden","заканчиваться","endet","endete","hat geendet"],["erzählen","рассказывать","erzählt","erzählte","hat erzählt"],["erklären","объяснять","erklärt","erklärte","hat erklärt"]
];
const prefixes = ["","an","auf","aus","ein","mit","nach","vor","zu","zurück"];
const verbs = [];
for (let i = 0; i < 365; i++) {
  const [inf, ru, pres, pret, perf] = baseVerbs[i % baseVerbs.length];
  const prefix = prefixes[Math.floor(i / baseVerbs.length) % prefixes.length];
  const display = prefix ? `${prefix}${inf}` : inf;
  verbs.push({
    id: `verb-${String(i + 1).padStart(3, "0")}-${display}`,
    de_word: display,
    article: "",
    ru_translation: prefix ? `${ru} / вариант с приставкой ${prefix}` : ru,
    example_de: `Heute übe ich das Verb "${display}".`,
    example_ru_optional: `Сегодня я тренирую глагол «${display}» — «${ru}».`,
    forms: { infinitive: display, praesens: pres, praeteritum: pret, perfekt: perf },
    tags: ["verb"],
    level: "VERBS",
    source: "generated-seed-list"
  });
}

writeFileSync("data/words.json", JSON.stringify(words, null, 2) + "\n");
writeFileSync("data/verbs.json", JSON.stringify(verbs, null, 2) + "\n");
console.log(`Generated ${words.length} words and ${verbs.length} verbs`);
