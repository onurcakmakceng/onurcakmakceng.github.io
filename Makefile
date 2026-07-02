.PHONY: install dev build preview clean format lint check ci

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview: build
	npm run preview

format:
	npm run format

lint:
	npm run lint

lint-fix:
	npm run lint:fix

check:
	npm run check

ci: format lint check build

clean:
	rm -rf dist node_modules .astro
