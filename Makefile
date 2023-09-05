build:
	docker build -t temmplate-nest-prisma .
lint:
	npm run lint
migrate/dev:
	prisma migrate dev --preview-feature
migrate/dev/only:
	create: prisma migrate dev --create-only --preview-feature
migrate/reset:
	prisma migrate reset --preview-feature
migrate/deploy: 
	npx prisma migrate deploy --preview-feature
migrate/status: 
	npx prisma migrate status --preview-feature
migrate/resolve: 
	npx prisma migrate resolve --preview-feature
prisma/studio: 
	npx prisma studio,
prisma/generate: 
	npx prisma generate,
prisma/db/push: 
	npx prisma db push,
prisma/generate/watch: 
	npx prisma generate --watch,