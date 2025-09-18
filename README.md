# CGI Learning Hub UI

React monorepo containing components, theme and icons libraries

## How to Test setup

- `apps/playground` is the local app to try out your libraries and will be run via http://localhost:3000
- `packages/*` will be your libraries

### Without docker (using your environment)

#### Requirements

- `pnpm` version 9+
- `node` version 22+

```sh
# install global project
pnpm install

# run your playground app
pnpm run start-app-playground

# depending in apps/playground/vite.config.ts
# if you comment "resolve" object part, you need to run build and then (re-)run playground app
pnpm run build
pnpm run start-app-playground

# build specific package (your choices)
pnpm run build-icons-library
pnpm run build-theme-library
pnpm run build-ui-library

# run total
pnpm clean; pnpm install; pnpm build; pnpm install; pnpm run start-app-playground # we do a reinstall in order to apply playground the updated deps workspace:*
```

### Docker mode

the file `cli.sh` is available for each project in order to run your instance

```sh
# install global project
./cli.sh install

# run your playground app
./cli.sh runPlayground

# depending in apps/playground/vite.config.ts
# if you comment "resolve" object part, you need to run build and then (re-)run playground app
./cli.sh build
./cli.sh runPlayground

# build specific package (your choices)
./cli.sh buildIconsLibrary
./cli.sh buildThemeLibrary
./cli.sh buildUiLibrary

# run total
./cli.sh clean install build install runPlayground # we do a reinstall in order to apply playground the updated deps workspace:*
```

### CLI shortcut (with docker)

```bash
./cli.sh install build runPlayground
```

### Publish

#### With docker

```sh
# publish your packages
./cli.sh publish
```

#### Without docker

```sh
# publish your packages
pnpm run publish
```

### Extra command line

Please check all arguments in `cli.sh` and adapt it with/without docker for running lint/test/format...

## Storybook dev

Try `pnpm run storybook` to run storybook in `http://localhost:6006`
alternatively you can run `./cli.sh storybook` if you use `docker`

# apps / playground

in `vite.config.ts` you can comment out `resolve` to try your truth libs
resolve allows you to have `live reload` in your libs.

# Use this library repository with another repository

If you are willing to use this repository for another repository project

you can use `link:` or `file:`
We will be using example to run locally these projects

In your main repository where you want to use you library locally in dependencies

Add `"file:../hub-ui/packages/ui"` (as the library is in the folder "hub-ui")

If you use `file:` mode, you will need to build your library local and in your main repository, re-run install deps

```bash
# run build watch mode
./cli.sh buildIconsLibraryWatch
./cli.sh buildThemeLibraryWatch
./cli.sh buildUiLibraryWatch

# same instruction without docker
pnpm run build-icons-library-watch
pnpm run build-theme-library-watch
pnpm run build-ui-library-watch

```

```json
# Example
"devDependencies": {
    "@cgi-learning-hub/ui": "file:../hub-ui/packages/ui"
},
```

## docker mode

(You won't need this instruction if you do not use docker)

add new entry to your docker-compose.yml in order to include your library repository from your main app

```bash
# from your main app in its docker-compose.yml
services:
    ...
    volumes:
        ...
        - ../../project/hub-ui/packages/ui:/hub-ui/packages/ui
```

### local run library (ViteJS)

`/hub-ui/packages/ui/src/index.ts` correspond au path utilisé dans le volumes docker-compose.yml

```ts
  const resolve = {
    alias:{
      '@cgi-learning-hub/ui' : path.resolve(__dirname, '/hub-ui/packages/ui/src/index.ts'),
    }
  }

  return defineConfig({
    ...
    resolve,
    ...
  });
```

## local library from NextJS app

You need to install these dependencies if you use `ui` package in your NextJS project :

- `"@emotion/react": "^11"`
- `"@emotion/styled": "^11"`
- `"@mui/material": "^7"`

You will need to add `"@cgi-learning-hub/ui` in devDependencies and add in docker-compose.yml your local project mount volumes

In your next.config.js you will have to add `transpilePackages` in order to make your component work in your project (local or remote) :

```js
const nextConfig = {
   ...
   transpilePackages: ['@cgi-learning-hub'],
   ...
}
```

```json
# packages.json
"devDependencies": {
  ...
  "@cgi-learning-hub/ui": "file:../hub-ui/packages/ui",
}

# docker-compose.yml
volumes:
  - ./:/app
  - ../project/hub-ui/packages/ui:/hub-ui/packages/ui <== localisation de votre projet ui local
```

From this library repository, run `pnpm run build:watch` from any libs you would like to work
And from the another repository (NextJS), `next dev` and anytime you make any change from this repository, ViteJS will upgrade again your dist during its build-time but you will need to re-install your local library package

TLDR :

- (From repository library) : `pnpm run build:watch`
- (From NextJS repository) : `pnpm run install`
- (From NextJS repository) : `next dev` => run your local but can be make earlier
- (From repository library) : Make any change => ViteJS build watch will proceed
- (From NextJS repository) : `pnpm run install` or `pnpm run install <localLibraryDeps>`

## Unit test

For any projects that use Jest you must add :

```js
# jest.setup.tsx

jest.mock('@emotion/styled', () => {
  return (_: any) => jest.fn((...args) => {
    return args;
  });
});
```

## import hub theme if your project uses tailwind

From your tailwind.config.ts if you wish to use our theme :

```
import { defaultTailwindThemeConfig } from "@cgi-learning-hub/theme"

export default {
  content: [
    ...
  ],
  corePlugins: {
    preflight: false,
  },
  plugins: [...],
  theme: defaultTailwindThemeConfig,
} satisfies Config;
```
