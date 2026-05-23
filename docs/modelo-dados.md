# Modelo de Dados

O backend usa modelos Django em `ecosmart/models.py`. As tabelas reais recebem prefixo do app no banco, por exemplo `ecosmart_usuario`.

## Entidades

### `Usuario`

Representa contas do sistema.

Campos principais:

- `nome`
- `email` unico
- `senha` com hash Django
- `telefone`
- `endereco`
- `perfil`: `UC`, `UP`, `UE` ou `UA`
- `status`: ativo/inativo
- `created_at`, `updated_at`

Regras:

- A senha e convertida para hash no `save()`.
- Usuarios inativos nao autenticam.
- O email nao pode duplicar.

### `TipoResiduo`

Catalogo de residuos usados em descartes e pedidos.

Campos principais:

- `nome` unico
- `descricao`
- `reciclavel`
- `created_at`, `updated_at`

### `Instituicao`

Representa empresa, cooperativa ou workspace institucional.

Campos principais:

- `nome`
- `tipo`
- `cnpj` unico
- `email_contato`
- `telefone`
- `created_at`, `updated_at`

### `UsuarioInstituicao`

Tabela de vinculo entre usuarios e instituicoes.

Campos principais:

- `usuario`
- `instituicao`
- `vinculo_ativo`
- `created_at`, `updated_at`

Regras:

- O par `usuario + instituicao` e unico.
- Coletas feitas por `UP` vinculado sao associadas automaticamente a instituicao.

### `PontoColeta`

Modelo preparado para pontos de coleta. A tela atual usa dados mockados, mas o modelo ja existe.

Campos principais:

- `nome`
- `categoria`
- `endereco`
- `latitude`
- `longitude`
- `status`
- `created_at`, `updated_at`

### `Descarte`

Registro operacional de descarte.

Campos principais:

- `usuario`: quem gerou o descarte
- `tipo_residuo`
- `coletor`: usuario que assumiu a coleta
- `instituicao_coletora`: instituicao do coletor, quando existe vinculo
- `pedido_coleta`: pedido que originou o descarte, quando aplicavel
- `quantidade`
- `unidade_medida`
- `data_descarte`
- `local_descarte`
- `observacoes`
- `foto`
- `status`
- `data_coleta`
- `created_at`, `updated_at`

Status:

| Status | Significado |
| --- | --- |
| `registrado` | Criado e disponivel para coleta |
| `coletado` | Assumido por um coletor |
| `em_transito` | Coleta em andamento |
| `processado` | Fluxo finalizado |

### `PedidoColeta`

Solicitacao criada pelo usuario para que um material seja coletado.

Campos principais:

- `usuario`
- `instituicao`
- `tipo_residuo`
- `quantidade`
- `unidade_medida`
- `endereco_coleta`
- `data_preferencial`
- `status`
- `observacoes`
- `created_at`, `updated_at`

Status:

| Banco | Label da API |
| --- | --- |
| `solicitado` | `solicitada` |
| `em_andamento` | `agendada` |
| `concluido` | `finalizada` |
| `cancelado` | `cancelada` |

### `ConteudoEducativo`

Conteudos da central educativa.

Campos principais:

- `nome`
- `categoria`
- `descricao`
- `como_descartar`
- `cuidados`
- `data_criacao`

Categorias:

- `Eletrônicos`
- `Químicos`
- `Orgânicos`
- `Recicláveis`

## Relacionamentos

```text
Usuario 1:N Descarte
Usuario 1:N PedidoColeta
Usuario N:N Instituicao via UsuarioInstituicao
TipoResiduo 1:N Descarte
TipoResiduo 1:N PedidoColeta
Instituicao 1:N UsuarioInstituicao
Instituicao 1:N PedidoColeta
Instituicao 1:N Descarte como instituicao_coletora
PedidoColeta 1:N Descarte
```

## Seed de Demonstracao

O comando `python manage.py seed_db` cria:

| Perfil | Nome | E-mail | Senha |
| --- | --- | --- | --- |
| `UA` | Admin Sistema | `admin@ecosmart.com` | `admin123` |
| `UC` | Maria Silva | `maria@email.com` | `maria123` |
| `UC` | Pedro Santos | `pedro@email.com` | `pedro123` |
| `UP` | Ana Premium | `ana@email.com` | `ana123` |
| `UP` | João Premium | `joao@email.com` | `joao123` |
| `UE` | Carlos Empresa | `carlos@empresa.com` | `carlos123` |

Tambem cria residuos base, uma instituicao, vinculos institucionais, alguns descartes e um pedido de coleta.

## Observacoes

- `PontoColeta` existe no modelo, mas a tela atual ainda usa mock local.
- `Descarte.foto` existe no modelo, mas o endpoint atual recebe JSON e ainda nao processa upload multipart.
- Impactos, notificacoes e recompensas ainda nao possuem modelos persistidos neste MVP.
