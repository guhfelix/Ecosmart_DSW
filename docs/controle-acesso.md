# Controle de Acesso Baseado em Perfil

Este documento descreve a autenticação, o middleware de autorização e as regras de acesso por perfil implementadas no backend do EcoSmart.

## Estratégia de Autenticação

O sistema usa autenticação por token assinado pelo Django.

Fluxo:

1. O usuário envia `email` e `senha` para `POST /api/login/`.
2. O backend valida a senha com o hash armazenado no modelo `Usuario`.
3. Em caso de sucesso, o backend retorna um token assinado com `django.core.signing`.
4. O frontend salva o token em `localStorage` como `ecosmart_token`.
5. As chamadas autenticadas enviam o token no header:

```http
Authorization: Bearer <token>
```

Configurações principais:

- Salt do token: `ecosmart.auth`.
- Tempo máximo do token: 12 horas.
- Usuários inativos não são autenticados.
- O perfil do usuário também é validado contra o token para evitar uso inconsistente.

Código principal:

- `ecosmart/auth.py`
- `src/lib/api.ts`
- `src/contexts/AuthContext.tsx`

## Middleware de Autorização

Foi implementado o middleware `EcoSmartAuthMiddleware`.

Arquivo:

- `ecosmart/auth.py`

Registro no Django:

- `settings.py`

```python
MIDDLEWARE = [
    ...
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "ecosmart.auth.EcoSmartAuthMiddleware",
    ...
]
```

Responsabilidades do middleware:

- Ler o header `Authorization`.
- Validar o token assinado.
- Buscar o usuário ativo no banco.
- Anexar o usuário autenticado em `request.ecosmart_user`.
- Bloquear rotas protegidas sem token com HTTP 401.
- Bloquear perfis não autorizados com HTTP 403.

As rotas declaram os perfis permitidos com o decorator `@require_auth`.

Exemplos:

```python
@require_auth(["UA"])
def api_usuarios(request):
    ...

@require_auth(["UP", "UA"])
def api_descartes_disponiveis(request):
    ...

@require_auth(["UE", "UA"])
def api_workspace(request):
    ...

@require_auth()
def api_pedidos_coleta(request):
    ...
```

## Regras Implementadas por Perfil

### UC - Usuário Comum

Permissões:

- Autenticar no sistema.
- Registrar descarte próprio.
- Consultar o próprio histórico.
- Criar pedido de coleta.
- Acompanhar pedidos de coleta.
- Atualizar o próprio perfil.
- Consultar conteúdos educativos.

Restrições:

- Não acessa histórico de outro usuário.
- Não acessa descartes disponíveis para coleta.
- Não coleta resíduos.
- Não acessa workspace empresarial.
- Não acessa métricas administrativas.
- Não cria conteúdo educativo.

### UP - Usuário Premium

Permissões:

- Todas as permissões básicas de usuário autenticado.
- Visualizar descartes de UC disponíveis para coleta.
- Coletar descarte disponível.
- Colocar coleta em trânsito.
- Marcar coleta como entregue/finalizada.
- Consultar as próprias coletas.

Restrições:

- Não pode coletar o próprio descarte.
- Não pode coletar descarte já coletado.
- Não pode alterar coleta feita por outro UP.
- Não acessa métricas administrativas.
- Só vincula coleta a uma empresa se tiver vínculo institucional ativo.

### UE - Usuário Empresarial

Permissões:

- Consultar descartes vinculados à sua instituição.
- Consultar painel empresarial consolidado.
- Acessar workspace empresarial.
- Vincular usuários existentes ao workspace.
- Inativar ou reativar vínculos.

Restrições:

- Não visualiza coletas feitas por UP sem vínculo institucional.
- Não acessa métricas administrativas.
- Não gerencia usuários globais da plataforma.
- Não vincula usuários administradores ao workspace.

### UA - Usuário Administrador

Permissões:

- Consultar métricas administrativas.
- Listar, criar, editar e remover usuários.
- Criar e remover conteúdos educativos.
- Acessar dashboards e rotas administrativas.
- Atuar como supervisor em rotas de coleta quando permitido.

Restrições:

- Não cria pedido de coleta como usuário operacional.

## Matriz de Acesso das Rotas Principais

| Rota | UC | UP | UE | UA |
| --- | --- | --- | --- | --- |
| `/api/login/` | Público | Público | Público | Público |
| `/api/signup/` | Público | Público | Público | Público |
| `/api/descartes/` | Sim | Sim | Sim | Sim |
| `/api/descartes/historico/` | Próprio | Próprio | Não | Todos |
| `/api/pedidos-coleta/` | Sim | Sim | UE lista vinculados | Lista todos; não cria |
| `/api/descartes/disponiveis/` | Não | Sim | Não | Sim |
| `/api/descartes/<id>/coletar/` | Não | Sim | Não | Sim |
| `/api/descartes/<id>/status/` | Não | Coleta própria | Não | Sim |
| `/api/empresa/descartes/` | Não | Não | Sim | Sim |
| `/api/workspace/` | Não | Não | Sim | Sim |
| `/api/workspace/vinculos/` | Não | Não | Sim | Sim |
| `/api/usuarios/` | Não | Não | Não | Sim |
| `/api/metrics/` | Não | Não | Não | Sim |
| `/api/conteudos/` GET | Sim | Sim | Sim | Sim |
| `/api/conteudos/` POST/DELETE | Não | Não | Não | Sim |

## Evidência de Funcionamento

Foram adicionados testes específicos para o middleware:

- `test_middleware_anexa_usuario_autenticado_ao_request`
- `test_middleware_bloqueia_perfil_nao_autorizado_antes_da_view`
- `test_middleware_bloqueia_token_ausente_antes_da_view`

Também há testes de permissão por perfil:

- UC não acessa histórico de outro usuário.
- UC não acessa descartes disponíveis para UP.
- UA não cria pedido de coleta.
- UC não acessa métricas administrativas.
- UC não cria conteúdo educativo.
- UP não altera coleta de outro UP.
- UE não vê coleta feita por UP sem vínculo.
- Workspace rejeita vínculo com administrador.

Execução realizada:

```text
python manage.py test ecosmart.tests.BackendQualityTests -v 2

Found 31 test(s).
System check identified no issues (0 silenced).
Ran 31 tests in 0.381s
OK
```

Execução completa da suíte atual:

```text
python manage.py test ecosmart -v 2

Found 48 test(s).
System check identified no issues (0 silenced).
Ran 48 tests in 0.780s
OK
```

Validação adicional:

```text
python manage.py check
System check identified no issues (0 silenced).
```

## Sistema Autenticado Funcional

O sistema autenticado está funcional porque:

- Login retorna token assinado válido.
- Frontend envia o token automaticamente via `apiFetch`.
- Middleware valida token e popula `request.ecosmart_user`.
- Decorators declaram perfis permitidos por rota.
- Rotas retornam HTTP 401 quando não há autenticação.
- Rotas retornam HTTP 403 quando o perfil não tem permissão.
- Testes automatizados cobrem os fluxos de autenticação, autorização e regras por perfil.
