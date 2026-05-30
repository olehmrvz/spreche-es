# German Word of the Day Wallpaper

Dynamic PNG wallpaper generator: one German word per day with Russian translation and example sentence.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

PNG endpoint:

```txt
/api/wallpaper?device=iphone_16_pro&theme=dark&track=A1&tz=Europe/Moscow

Tracks:

- `A1`
- `A2`
- `B1`
- `B2`
- `C1`
- `C2`
- `VERBS`
```

## Word data

Edit `data/words.json`.

Fields:

- `id`
- `de_word`
- `article`
- `ru_translation`
- `ipa_optional`
- `example_de`
- `example_ru_optional`
- `tags`
- `level`
- `source`

## Deploy

Recommended: Vercel.

```bash
npm run build
npx vercel
```
