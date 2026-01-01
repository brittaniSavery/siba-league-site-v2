# SIBA Website Frontend

This project holds the entire frontend of the main website for the SIBA fictional basketball league run by father-daughter team of Kelley and Brittani Avery and powered by the basketball simulation games from [Wolverine Studios](https://www.wolverinestudios.com/).

Technologies used:

- [Typescript](https://www.typescriptlang.org/)
- [Astro](https://astro.build/)
- [Bulma CSS](https://bulma.io/)
- [Base UI](https://base-ui.com/)

## 🚀 Project Structure

Inside of this Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── recruiting-regions-map.svg
│   ├── components/
│   │   ├── RulesPage/
│   │   │   └──RulesIntro.mdx
│   │   └── Nav.tsx
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

`src/assets/`: Images and other static are placed here.

`src/pages/`: Pages for the website. Each page is exposed as a route based on its file name.

`src/components/`: All Astro, React, MDX components used throughout the website. Components are separated by page or usage.

`src/layouts/`: Layouts are Astro components used to provide a reusable UI structure, such as a page template.

## ▶️ Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                           |
| :---------------- | :----------------------------------------------- |
| `npm install`     | Installs dependencies                            |
| `npm run dev`     | Starts local dev server at `localhost:5000`      |
| `npm run build`   | Builds production site to `./dist/`              |
| `npm run preview` | Previews current build locally, before deploying |

## 📋 Current TODOs

- [x] Add important game dates for pro
- [x] Add important game dates for college
- [x] Add legend for college events calendar
- [ ] Add join page basics
- [ ] Create team search box component (ComboBox)
- [ ] Set up preview of teams on join page
- [ ] Set up validation for college teams (no same region or conference + tier limits)
- [ ] Create college standings page (searchable to for team/conference)
