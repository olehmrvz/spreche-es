import { SettingsForm } from "@/components/SettingsForm";

export default function Page() {
  return (
    <main className="page">
      <div className="wrap">
        <header className="hero">
          <div className="kicker">Ежедневное обновление · PNG-обои</div>
          <h1>Немецкое слово дня на обоях.</h1>
          <p>
            Сгенерируй одну ссылку. Каждый день она возвращает новый PNG с немецким словом,
            русским переводом и примером. Используй ссылку в iPhone Shortcuts или Android MacroDroid.
          </p>
        </header>

        <div className="sectionTitle">1 · Настройки</div>
        <SettingsForm />

        <section className="instructions">
          <div>
            <h2>2 · iPhone</h2>
            <ol>
              <li>Открой Команды → Автоматизация → Время суток → ежедневно.</li>
              <li>Добавь действие «Получить содержимое URL» и вставь ссылку.</li>
              <li>Добавь «Установить фото как обои».</li>
              <li>Выключи предпросмотр и «Обрезать до объекта».</li>
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
