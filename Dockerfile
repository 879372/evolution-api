FROM evoapicloud/evolution-api:v2.3.7

# Evolution API 2.3.7 logs every inbound WhatsApp message with a direct
# console.log(), bypassing LOG_LEVEL and LOG_BAILEYS. Patch only that call in
# the compiled entrypoint while keeping the upstream image and migrations.
COPY patch-message-logging.cjs /tmp/patch-message-logging.cjs
RUN node /tmp/patch-message-logging.cjs /evolution/dist/main.js \
    && rm /tmp/patch-message-logging.cjs

# A Evolution API usa a porta 8080 por padrão
EXPOSE 8080

# O comando de inicialização já vem na imagem oficial, 
# então não precisamos adicionar nada além disso.
