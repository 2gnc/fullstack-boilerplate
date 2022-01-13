NODE_MODULES_BIN := node_modules/.bin

.PHONY: server
server:
	@cd ./server && \
	npm run watch && \
	npm run start


.PHONY: lint-server
lint-server:
	@cd ./server && \
	npm run lint
	
.PHONY: pretty-server
pretty-server:
	@cd ./server && \
	npm run pretty