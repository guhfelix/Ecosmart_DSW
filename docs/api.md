# API Django do EcoSmart

A API fica sob o prefixo `/api`. Em desenvolvimento local, a URL padrao usada pelo frontend e:

```text
http://localhost:8000/api
```

O frontend pode apontar para outra URL usando `VITE_API_URL`.

## Autenticacao

Rotas protegidas exigem:

```http
Authorization: Bearer <token>
```

O token e retornado por `POST /api/login/` e `POST /api/signup/`.

Respostas comuns:

| Status | Significado |
| --- | --- |
| `200` | Operacao concluida |
| `201` | Recurso criado |
| `400` | Dados invalidos ou regra de negocio violada |
| `401` | Token ausente, invalido ou expirado |
| `403` | Perfil sem permissao |
| `404` | Recurso nao encontrado |
| `405` | Metodo HTTP nao permitido |

## Endpoints Publicos

### `POST /api/login/`

Faz login e retorna usuario + token.

Payload:

```json
{
  "email": "maria@email.com",
  "senha": "maria123"
}
```

Resposta:

```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "perfil": "UC",
  "status": "ativo",
  "token": "..."
}
```

### `POST /api/signup/`

Cria usuario `UC`, `UP` ou `UE`. Perfis invalidos sao normalizados para `UC`.

Payload:

```json
{
  "nome": "Novo Usuario",
  "email": "novo@email.com",
  "senha": "123456",
  "telefone": "(65) 99999-0000",
  "endereco": "Rua Exemplo, 100",
  "perfil": "UC"
}
```

## Usuarios

### `GET /api/usuarios/`

Lista usuarios. Requer `UA`.

### `POST /api/usuarios/`

Cria usuario pela administracao. Requer `UA`.

Payload:

```json
{
  "nome": "Usuario Teste",
  "email": "teste@email.com",
  "senha": "EcoSmart123",
  "perfil": "UC",
  "status": "ativo"
}
```

### `GET /api/usuarios/<user_id>/`

Retorna dados de um usuario. Requer dono do cadastro ou `UA`.

### `PUT /api/usuarios/<user_id>/`

Atualiza usuario. O proprio usuario pode atualizar dados basicos; `UA` tambem pode alterar perfil e status.

### `DELETE /api/usuarios/<user_id>/`

Remove usuario. Requer `UA`.

### `PUT /api/update-perfil/<user_id>/`

Atualiza dados basicos do perfil. Mantido por compatibilidade com o frontend.

## Conteudos Educativos

### `GET /api/conteudos/`

Lista conteudos educativos. Requer usuario autenticado.

### `POST /api/conteudos/`

Cria conteudo educativo. Requer `UA`.

Payload:

```json
{
  "nome": "Guia de Papel",
  "categoria": "Recicláveis",
  "descricao": "Como separar papel",
  "comoDescartar": "Separar limpo\nEvitar umidade",
  "cuidados": "Nao misturar com lixo organico"
}
```

### `DELETE /api/conteudos/?id=<id>`

Remove conteudo educativo. Requer `UA`.

## Descartes

### `POST /api/descartes/`

Registra descarte. Requer usuario autenticado. Um usuario comum so pode registrar para si mesmo; `UA` pode registrar para outros.

Payload:

```json
{
  "usuario_id": 1,
  "tipo_residuo": "Papel",
  "quantidade": 2.5,
  "unidade": "kg",
  "data_descarte": "2026-05-16",
  "local": "Residencia",
  "observacao": "Papelao limpo"
}
```

### `GET /api/descartes/historico/?usuario_id=<id>`

Lista historico do usuario. Requer dono do historico ou `UA`.

### `GET /api/descartes/disponiveis/`

Lista descartes de `UC` com status `registrado`. Requer `UP` ou `UA`.

### `POST /api/descartes/<descarte_id>/coletar/`

Assume uma coleta disponivel. Requer `UP` ou `UA`.

Regras:

- O descarte precisa estar `registrado`.
- O coletor nao pode ser o proprio usuario que criou o descarte.
- Se o coletor tiver vinculo institucional ativo, a coleta fica vinculada a instituicao.

### `GET /api/descartes/minhas-coletas/`

Lista coletas do usuario autenticado. Requer `UP` ou `UA`.

### `POST /api/descartes/<descarte_id>/status/`

Atualiza status da coleta. Requer `UP` dono da coleta ou `UA`.

Payload:

```json
{
  "status": "em_transito"
}
```

Transicoes validas:

| Atual | Proximo |
| --- | --- |
| `coletado` | `em_transito` |
| `em_transito` | `processado` |

## Pedidos de Coleta

### `GET /api/pedidos-coleta/`

Lista pedidos conforme perfil:

- `UC` e `UP`: proprios pedidos.
- `UE`: pedidos vinculados a instituicoes do usuario.
- `UA`: todos os pedidos.

### `POST /api/pedidos-coleta/`

Cria pedido e descarte relacionado. Requer usuario autenticado, exceto `UA`.

Payload:

```json
{
  "materiais": ["Papel"],
  "quantidade_estimada": "4 kg",
  "endereco": "Rua Teste, 123",
  "observacao": "Retirar no periodo da tarde",
  "data_preferencial": "2026-05-20"
}
```

Status retornados para a interface:

| Banco | API |
| --- | --- |
| `solicitado` | `solicitada` |
| `em_andamento` | `agendada` |
| `concluido` | `finalizada` |
| `cancelado` | `cancelada` |

## Empresa e Workspace

### `GET /api/empresa/descartes/`

Lista descartes vinculados a instituicao. Requer `UE` ou `UA`.

### `GET /api/workspace/`

Retorna dados do workspace, membros e usuarios disponiveis. Requer `UE` ou `UA`.

### `POST /api/workspace/vinculos/`

Vincula usuario ao workspace por `usuario_id` ou `email`. Requer `UE` ou `UA`.

Payload:

```json
{
  "usuario_id": 2
}
```

### `GET /api/workspace/vinculos/<vinculo_id>/`

Detalha um vinculo do workspace. Requer `UE` ou `UA`.

### `PUT /api/workspace/vinculos/<vinculo_id>/`

Ativa ou inativa vinculo. Requer `UE` ou `UA`.

Payload:

```json
{
  "status_vinculo": "inativo"
}
```

### `DELETE /api/workspace/vinculos/<vinculo_id>/`

Inativa o vinculo. Requer `UE` ou `UA`.

## Metricas

### `GET /api/metrics/`

Retorna totais administrativos. Requer `UA`.

Resposta:

```json
{
  "total_usuarios": 6,
  "total_conteudos": 8,
  "perfil_comum": 2,
  "perfil_premium": 2,
  "perfil_empresa": 1,
  "perfil_admin": 1
}
```
