# Create a React Library with TypeScript and Vite

This Mono repository is an example of a React library created with TypeScript, Vite, Storybook and PNPM.

## How to Test setup 

- `apps/local-ui` is the local app to try out your libraries and will be run via http://localhost:3000
- `packages/*` will be your libraries

### Without docker (using your environment)

#### Requirements

- `pnpm` version 8+
- `node` version 18+

```sh
# install global project
pnpm install

# run your local app dev
pnpm run start-app-local-ui

# depending in apps/local-ui/vite.config.ts 
# if you comment "resolve" object part, you need to run build and then (re-)run local app dev
pnpm run build
pnpm run start-app-local-ui

# build specific package (your choices)
pnpm run build-base-library
pnpm run build-theme-library

# run total
pnpm clear; pnpm install; pnpm build; pnpm install; pnpm run start-app-local-ui # we do a reinstall in order to apply local-ui the updated deps workspace:*
```

### Docker mode

the file `cli.sh` is available for each project in order to run your instance

```sh
# install global project
./cli.sh install

# run your local app dev
./cli.sh runLocalUi

# depending in apps/local-ui/vite.config.ts 
# if you comment "resolve" object part, you need to run build and then (re-)run local app dev
./cli.sh build
./cli.sh runLocalUi

# build specific package (your choices)
./cli.sh buildBaseLibrary
./cli.sh buildThemeLibrary

# run total
./cli.sh clear install build install runLocalUi # we do a reinstall in order to apply local-ui the updated deps workspace:*
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

# apps / local-ui

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
./cli.sh buildThemeLibraryWatch
./cli.sh buildBaseLibraryWatch

# same instruction without docker
pnpm run build-base-library-watch
pnpm run build-theme-library-watch

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

`/hub-ui/packages/base/src/index.ts` correspond au path utilisé dans le volumes docker-compose.yml
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
  - `"@mui/material": "5.15.7"`
  - `"@emotion/styled": "11.11.0"`
  - `"@emotion/react": "11.11.3"`

You will need to add `"@cgi-learning-hub/ui` in devDependencies and add in docker-compose.yml your local project mount volumes

In your next.config.js you will have to add `transpilePackages` :

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