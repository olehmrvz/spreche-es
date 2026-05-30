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
/api/wallpaper?device=iphone_16_pro&theme=dark&tz=Europe/Moscow&seed=default
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
