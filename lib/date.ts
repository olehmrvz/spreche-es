const EUROPE_TIME_ZONE = "Europe/Berlin";
const RELEASE_HOUR = 7;

export function getDailyReleaseDateKey() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: EUROPE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find((part) => part.type === type)?.value || "";
  const year = Number(get("year"));
  const month = Number(get("month"));
  const day = Number(get("day"));
  const hour = Number(get("hour"));

  const releaseDate = new Date(Date.UTC(year, month - 1, day));
  if (hour < RELEASE_HOUR) releaseDate.setUTCDate(releaseDate.getUTCDate() - 1);

  return releaseDate.toISOString().slice(0, 10);
}
