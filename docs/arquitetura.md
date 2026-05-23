# Arquitetura do EcoSmart

Este documento resume como o EcoSmart esta organizado tecnicamente e quais partes estao integradas ao backend real.

## Visao Geral

O EcoSmart usa uma arquitetura cliente-servidor:

- O frontend React roda no Vite e renderiza a experiencia do usuario.
- A API Django concentra autenticacao, autorizacao, regras de negocio e persistencia.
- O banco pode ser SQLite local, PostgreSQL local via Docker ou Supabase PostgreSQL.
- O frontend acessa a API por `src/lib/api.ts`, usando `VITE_API_URL`.

```text
Navegador
  |
  | React + AuthContext + apiFetch
  v
Django API
  |
  | Models + Views + Auth Middleware
  v
SQLite / PostgreSQL / Supabase PostgreSQL
```

## Frontend

Arquivos principais:

- `src/main.tsx`: ponto de entrada React.
- `src/app/App.tsx`: componente raiz.
- `src/app/routes.tsx`: rotas publicas e autenticadas.
- `src/contexts/AuthContext.tsx`: login, cadastro, sessao e usuario atual.
- `src/lib/api.ts`: helper `apiFetch` com token Bearer.
- `src/lib/mockData.ts`: dados demonstrativos ainda usados por algumas telas.

Rotas principais:

| Rota | Finalidade |
| --- | --- |
| `/` | Landing page |
| `/login` | Login |
| `/cadastro` | Cadastro |
| `/app/dashboard` | Dashboard padrao |
| `/app/dashboard-premium` | Dashboard de coletor `UP` |
| `/app/dashboard-empresarial` | Dashboard de empresa `UE` |
| `/app/dashboard-admin` | Dashboard administrativo `UA` |
| `/app/registrar-descarte` | Registro de descarte |
| `/app/historico` | Historico do usuario, coletas ou empresa |
| `/app/pedidos-coleta` | Listagem de pedidos |
| `/app/pedidos-coleta/novo` | Wizard de novo pedido |
| `/app/admin/usuarios` | Gestao de usuarios |
| `/app/admin/conteudos` | Gestao de conteudos educativos |
| `/app/empresarial/workspace` | Workspace empresarial |

## Backend

Arquivos principais:

- `settings.py`: configuracao Django, CORS, banco e seguranca.
- `urls.py`: mapeamento de endpoints.
- `ecosmart/models.py`: entidades persistidas.
- `ecosmart/views.py`: endpoints e regras de negocio.
- `ecosmart/auth.py`: token assinado, middleware e decorator `require_auth`.
- `ecosmart/tests.py`: testes automatizados.
- `ecosmart/management/commands/seed_db.py`: seed de demonstracao.

O backend nao usa Django REST Framework neste MVP. As respostas sao geradas com `JsonResponse` e as views tratam os metodos HTTP diretamente.

## Autenticacao

Fluxo:

1. `POST /api/login/` valida email e senha.
2. A API retorna um token assinado com `django.core.signing`.
3. O frontend salva o token em `localStorage` como `ecosmart_token`.
4. `apiFetch` envia `Authorization: Bearer <token>`.
5. `EcoSmartAuthMiddleware` valida o token e popula `request.ecosmart_user`.
6. `@require_auth` bloqueia rotas sem token ou sem perfil permitido.

O token expira em 12 horas, definido por `AUTH_TOKEN_MAX_AGE` em `ecosmart/auth.py`.

## Regras por Perfil

| Perfil | Uso no sistema |
| --- | --- |
| `UC` | Usuario final que registra descarte e solicita coleta |
| `UP` | Coletor premium que assume descartes disponiveis |
| `UE` | Empresa/cooperativa que acompanha coletas vinculadas |
| `UA` | Administrador com acesso global e gestao de usuarios/conteudos |

A matriz completa esta em [controle-acesso.md](controle-acesso.md).

## Fluxos de Negocio

### Registro de descarte

1. Usuario autenticado envia tipo, quantidade, unidade, data, local e observacao.
2. A API cria ou reutiliza `TipoResiduo`.
3. A API cria `Descarte` com status `registrado`.
4. O historico do usuario passa a listar o descarte.

### Pedido de coleta

1. Usuario cria pedido em `/api/pedidos-coleta/`.
2. A API cria `PedidoColeta`.
3. No mesmo `transaction.atomic`, a API cria um `Descarte` relacionado.
4. Esse descarte fica disponivel para `UP`.

### Coleta

1. `UP` ou `UA` chama `/api/descartes/<id>/coletar/`.
2. O descarte recebe coletor, data de coleta e status `coletado`.
3. Se o coletor possui vinculo institucional ativo, a instituicao e gravada.
4. O status do pedido relacionado e sincronizado.
5. O coletor pode avancar para `em_transito` e depois `processado`.

### Workspace empresarial

1. `UE` acessa `/api/workspace/`.
2. Se nao houver workspace, a API cria uma instituicao automatica para o usuario `UE`.
3. A empresa pode vincular usuarios existentes por `usuario_id` ou email.
4. Vinculos podem ser ativados ou inativados.

## Partes Integradas e Mockadas

| Area | Fonte atual |
| --- | --- |
| Auth, usuarios, conteudos, descartes, pedidos, coletas, workspace | API Django |
| Impacto ambiental | Mock local |
| Notificacoes | Mock local |
| Pontos de coleta | Mock local |
| Alguns cards/logs administrativos | Mock local |
| Upload de imagens | Interface criada, persistencia pendente |

## Ambientes de Banco

| Ambiente | Uso |
| --- | --- |
| SQLite | Desenvolvimento rapido local |
| PostgreSQL local | Validacao local com banco relacional externo |
| Supabase PostgreSQL | Banco em nuvem mantendo a API Django |

Mais detalhes em [SUPABASE_INTEGRATION.md](../SUPABASE_INTEGRATION.md).

## Seguranca e Producao

Antes de publicar em producao:

- Definir `DJANGO_SECRET_KEY` forte e privada.
- Usar `DJANGO_DEBUG=false`.
- Configurar `DJANGO_ALLOWED_HOSTS`.
- Configurar `DJANGO_CORS_ALLOWED_ORIGINS` com os dominios reais.
- Usar HTTPS e cookies/headers seguros.
- Persistir variaveis sensiveis fora do repositorio.
- Revisar politica de expiração e renovacao de token.
