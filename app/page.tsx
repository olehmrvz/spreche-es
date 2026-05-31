import { SettingsForm } from "@/components/SettingsForm";

export default function Page() {
  return (
    <main className="page">
      <div className="wrap">
        <header className="hero">
          <div className="kicker">Обновление 2 раза в день · PNG-обои</div>
          <h1>Немецкое слово дня на обоях.</h1>
          <p>
            Сгенерируй одну ссылку. Она возвращает новый PNG с немецким словом,
            русским переводом и примером два раза в день: в 07:00 и 15:30 по Европе.
            Используй ссылку в iPhone Shortcuts или Android MacroDroid.
          </p>
        </header>

        <div className="sectionTitle">1 · Настройки</div>
        <SettingsForm />

        <section className="instructions">
          <div>
            <h2>2 · iPhone</h2>
            <p>Фото обновляется 2 раза в день, поэтому нужно создать две одинаковые автоматизации: на 07:00 и на 15:30.</p>
            <ol>
              <li>Открой Команды → Автоматизация → Новая автоматизация → Время суток.</li>
              <li>Создай первую автоматизацию на 07:00 → ежедневно → запускать немедленно.</li>
              <li>Добавь действие «Получить содержимое URL» и вставь ссылку.</li>
              <li>Добавь «Установить фото как обои».</li>
              <li>Выключи предпросмотр и «Обрезать до объекта».</li>
              <li>Сохрани автоматизацию.</li>
              <li>Создай вторую такую же автоматизацию на 15:30 с той же ссылкой и теми же действиями.</li>
            </ol>
          </div>
          <div>
            <h2>3 · Android</h2>
            <ol>
              <li>В MacroDroid создай ежедневный триггер.</li>
              <li>Добавь HTTP GET по ссылке и сохрани ответ в wallpaper.png.</li>
              <li>Добавь действие установки wallpaper.png как обоев.</li>
            </ol>
          </div>
        </section>
      </div>
    </main>
  );
}
