NODE_MODULES_BIN := node_modules/.bin

.PHONY: server
server:
	cd server && \
	node_modules/.bin/concurrently --names "TS,SRV" -c "green.bold,magenta.bold" \
	"npm run watch" "npm run start"


.PHONY: lint-server
lint-server:
	@cd ./server && \
	npm run lint
	
.PHONY: pretty-server
pretty-server:
	@cd ./server && \
	npm run pretty