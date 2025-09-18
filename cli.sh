#!/bin/bash

if [ ! -e node_modules ]
then
  mkdir node_modules
fi

case `uname -s` in
  MINGW*)
    USER_UID=1000
    GROUP_UID=1000
    ;;
  *)
    if [ -z ${USER_UID:+x} ]
    then
      USER_UID=`id -u`
      GROUP_GID=`id -g`
    fi
esac

# Development & serving
dev() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run dev
}

devWithWatch() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run dev:with-watch
}

preview() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run preview
}

# Building
build() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run build
}

buildIcons() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run build:icons
}

buildTheme() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run build:theme
}

buildUi() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run build:ui
}

buildPlayground() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run build:playground
}

# Watching
watch() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run watch
}

watchIcons() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run watch:icons
}

watchTheme() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run watch:theme
}

watchUi() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run watch:ui
}

# Storybook
storybook() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run storybook --no-open
}

buildStorybook() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run build-storybook
}

# Publishing
publish() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run publish
}

publishDev() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run publish:dev
}

# Setup & maintenance
install() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm install
}

clean() {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" app pnpm run clean && docker-compose down ; rm -rf .pnpm-store ; docker rmi hub-ui:1.0.0
}

format() {
  docker-compose run -u "$USER_UID:$GROUP_GID" app pnpm run format
}

for param in "$@"
do
  case $param in
    dev)
      dev
      ;;
    devWithWatch)
      devWithWatch
      ;;
    preview)
      preview
      ;;
    build)
      build
      ;;
    buildIcons)
      buildIcons
      ;;
    buildTheme)
      buildTheme
      ;;
    buildUi)
      buildUi
      ;;
    buildPlayground)
      buildPlayground
      ;;
    watch)
      watch
      ;;
    watchIcons)
      watchIcons
      ;;
    watchTheme)
      watchTheme
      ;;
    watchUi)
      watchUi
      ;;
    storybook)
      storybook
      ;;
    buildStorybook)
      buildStorybook
      ;;
    publish)
      publish
      ;;
    publishDev)
      publishDev
      ;;
    install)
      install
      ;;
    clean)
      clean
      ;;
    format)
      format
      ;;
    *)
      echo "Invalid argument : $param"
  esac
  if [ ! $? -eq 0 ]; then
    exit 1
  fi
done