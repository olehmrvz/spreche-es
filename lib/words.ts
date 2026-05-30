import words from "@/data/words.json";
import verbs from "@/data/verbs.json";
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
  forms?: {
    infinitive: string;
    praesens: string;
    praeteritum: string;
    perfekt: string;
  };
};

export type Track = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "VERBS";

export const TRACKS: { value: Track; label: string }[] = [
  { value: "A1", label: "A1" },
  { value: "A2", label: "A2" },
  { value: "B1", label: "B1" },
  { value: "B2", label: "B2" },
  { value: "C1", label: "C1" },
  { value: "C2", label: "C2" },
  { value: "VERBS", label: "Глаголы" },
];

export function safeTrack(value: string | null): Track {
  const upper = (value || "A1").toUpperCase();
  return TRACKS.some((track) => track.value === upper) ? (upper as Track) : "A1";
}

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

export function getWordOfDay(timeZone: string, seed = "default", track: Track = "A1") {
  const dateKey = getLocalDateKey(timeZone);
  const source = track === "VERBS" ? (verbs as Word[]) : (words as Word[]).filter((word) => word.level === track);
  const list = source.length ? source : [fallbackWord];

  const index = hashString(`${dateKey}:${seed}:${track}`) % list.length;
  return { word: list[index] || fallbackWord, dateKey, track };
}
