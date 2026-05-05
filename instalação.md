# Documentação de Instalação Evolution API v2

## Instalação via Docker (Standalone)

Esta é a forma mais conveniente para a maioria dos usuários.

### 1. Criar o arquivo `docker-compose.yml`
```yaml
version: '3.9'
services:
  evolution-api:
    container_name: evolution_api
    image: atendai/evolution-api:v2.1.1
    restart: always
    ports:
      - "8080:8080"
    env_file:
      - .env
    volumes:
      - evolution_instances:/evolution/instances

volumes:
  evolution_instances:
```

### 2. Criar o arquivo `.env`
No mesmo diretório, crie um arquivo `.env` com a configuração mínima:
```env
AUTHENTICATION_API_KEY=mude-me-por-uma-chave-segura
```

### 3. Inicializar a API
```bash
docker compose up -d
```

---

## Verificação e Acesso
*   **Logs**: `docker logs evolution_api`
*   **Acesso**: [http://localhost:8080](http://localhost:8080)
*   **Parar**: `docker compose down`

---

## Docker Swarm (Alta Disponibilidade)
*Para usuários avançados que precisam de escalabilidade.*

### Fluxo de Deploy:
1. Configurar Manager e Workers.
2. Iniciar o Swarm: `docker swarm init`.
3. Criar rede overlay: `docker network create --driver=overlay network_public`.
4. Implementar Traefik (Proxy Reverso).
5. Fazer o Deploy da Stack Evolution API:
   ```bash
   docker stack deploy --prune --resolve-image always -c evolution_api_v2.yaml evolution_v2
   ```

---

## Variáveis de Ambiente Importantes (v2)
*   `SERVER_URL`: URL pública da sua API.
*   `DATABASE_ENABLED`: `true` para persistência em banco.
*   `DATABASE_PROVIDER`: `postgresql`.
*   `CACHE_REDIS_ENABLED`: `true` para performance.
*   `AUTHENTICATION_API_KEY`: Chave para proteger suas chamadas de API.
