const EUROPE_TIME_ZONE = "Europe/Berlin";
const MORNING_RELEASE_HOUR = 7;
const AFTERNOON_RELEASE_HOUR = 15;
const AFTERNOON_RELEASE_MINUTE = 30;

export function getDailyReleaseDateKey() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: EUROPE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find((part) => part.type === type)?.value || "";
  const year = Number(get("year"));
  const month = Number(get("month"));
  const day = Number(get("day"));
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));
  const minutesNow = hour * 60 + minute;
  const morningRelease = MORNING_RELEASE_HOUR * 60;
  const afternoonRelease = AFTERNOON_RELEASE_HOUR * 60 + AFTERNOON_RELEASE_MINUTE;

  const releaseDate = new Date(Date.UTC(year, month - 1, day));
  let slot = "afternoon";

  if (minutesNow < morningRelease) {
    releaseDate.setUTCDate(releaseDate.getUTCDate() - 1);
    slot = "afternoon";
  } else if (minutesNow < afternoonRelease) {
    slot = "morning";
  }

  return `${releaseDate.toISOString().slice(0, 10)}-${slot}`;
}
