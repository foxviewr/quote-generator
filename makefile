# colors
RED=\033[31m
GREEN=\033[32m
YELLOW=\033[33m
NO_COLOR=\033[0m

# targets
default:
	@echo "> make [targets]"
	@echo "${RED}Please specify a target. Check inside the ${YELLOW}./makefile${RED} for available targets.${NO_COLOR}"
docker-install: .env
	docker compose up db -d
	docker compose up backend frontend --no-start
	@echo "${GREEN}Docker installation done!${NO_COLOR}"
	@echo "You can now run ${YELLOW}make docker-start${NO_COLOR}"
docker-start: .env
	docker compose up
docker-stop:
	docker compose down
docker-delete:
	docker compose rm -s -f -v db
	docker rmi postgres
	docker compose rm -s -f -v backend
	docker rmi quote-generator-backend
	docker compose rm -s -f -v frontend
	docker rmi quote-generator-frontend
delete-dependencies:
	rm -rf backend/dist
	rm -rf backend/node_modules
	rm -rf frontend/node_modules
	rm -rf frontend/.next
delete-postgres-data:
	rm -rf .pgdata
remove-all:
	make docker-delete
	make delete-dependencies
	make delete-postgres-data