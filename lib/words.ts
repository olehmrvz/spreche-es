import words from "@/data/words.json";
import { getLocalDateKey } from "./date";

export type Word = {
  id: string;
  de_word: string;
  article?: string;
  ru_translation: string;
  ipa_optional?: string;
  example_de: string;
  example_ru_optional?: string;
  tags?: string[];
  level?: string;
  source?: string;
};

function hashString(input: string) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

const fallbackWord: Word = {
  id: "atem",
  de_word: "Atem",
  article: "der",
  ru_translation: "дыхание",
  ipa_optional: "ˈaːtəm",
  example_de: "Ich brauche einen tiefen Atemzug.",
  example_ru_optional: "Мне нужен глубокий вдох.",
  level: "A2",
  source: "fallback",
};

export function getWordOfDay(timeZone: string, seed = "default") {
  const list = words as Word[];
  const dateKey = getLocalDateKey(timeZone);
  if (!list.length) return { word: fallbackWord, dateKey };

  const index = hashString(`${dateKey}:${seed}`) % list.length;
  return { word: list[index] || fallbackWord, dateKey };
}
