# Qualidade e Validação do Backend

Este documento registra a estratégia de testes do backend Django do EcoSmart, os casos automatizados implementados, o relatório de execução e a evidência de cobertura funcional mínima para o MVP.

## Estratégia de Testes

A estratégia atual prioriza testes automatizados de integração usando `django.test.TestCase` e o client HTTP do Django. O objetivo é validar os fluxos críticos do backend sem depender do banco SQLite local ou dos dados de seed.

Escopo coberto pela suíte principal e pelas suítes complementares:

- Autenticação e emissão de token.
- Middleware de autenticação e autorização por perfil.
- Cadastro de usuário e tratamento de dados inválidos.
- Proteção de rotas autenticadas.
- Controle de acesso por perfil (`UC`, `UP`, `UE`, `UA`).
- Registro e histórico de descartes.
- Pedido de coleta criando descarte disponível para UP.
- Coleta por UP com e sem vínculo institucional.
- Transições válidas e inválidas de status.
- Sincronização entre `PedidoColeta` e `Descarte`.
- Visibilidade da empresa (`UE`) apenas quando há vínculo institucional.
- Gestão básica de workspace empresarial.
- Conteúdo educativo protegido por permissão administrativa.
- Atualização de perfil respeitando dono do cadastro ou administrador.
- Métricas administrativas acessíveis somente para `UA`.
- Validação de entradas inválidas.
- Integridade de banco de dados.
- Segurança contra token ausente ou inválido.
- Regressões de permissão.
- Tratamento de erro.
- Integridade de workflow.
- Estresse básico com múltiplos descartes e logins.

Os testes criam seus próprios usuários, instituição, vínculos e resíduos em banco de teste isolado em memória. Isso evita interferência dos registros locais usados durante a demonstração.

Para acelerar a execução, a suíte usa `MD5PasswordHasher` apenas no ambiente de teste. Isso não altera o hasher usado no sistema em execução.

## Como Executar

Com o ambiente Python configurado:

```powershell
python manage.py check
python manage.py test ecosmart -v 2
```

Para executar somente a suíte principal do MVP:

```powershell
python manage.py test ecosmart.tests.BackendQualityTests -v 2
```

Observação: neste projeto, o comando explícito acima é o mais confiável porque a pasta raiz contém hífen no nome. A descoberta genérica do `unittest` pode tentar importar o projeto usando o nome da pasta, o que não é um nome válido de módulo Python.

## Casos Testados

### Tipos Cobertos

| Tipo | O que valida | Exemplos |
| --- | --- | --- |
| Testes comuns/positivos | Fluxos esperados do usuário | Login válido, registro de descarte, pedido de coleta, workspace válido |
| Testes falhos/negativos | Entradas inválidas e regras quebradas | Senha inválida, usuário inexistente, material ausente, transição inválida |
| Testes de permissão | Acesso correto por perfil | UC sem acesso a rotas de UP/UA, conteúdo educativo só para admin |
| Testes de regra de negócio | Comportamento específico do domínio | UP não coleta o próprio descarte, UE só vê coleta com vínculo |
| Testes de integração | Fluxos passando por API, banco e serializers | UC cria pedido, UP coleta, UE visualiza |
| Testes de validação | Dados incorretos e limites de entrada | Email inválido, quantidade negativa, texto grande |
| Testes de integridade | Restrições do banco | Email único, chaves estrangeiras, campos obrigatórios |
| Testes de segurança | Bloqueio de acessos indevidos | Token inválido e acesso sem token |
| Testes de estresse | Repetição de fluxos críticos | 100 descartes e 50 logins consecutivos |

### Suítes Automatizadas

| Classe | Quantidade | Finalidade |
| --- | ---: | --- |
| `BackendQualityTests` | 31 | Fluxos principais do MVP, permissões e integração |
| `ValidationTests` | 4 | Validação de entradas |
| `DatabaseIntegrityTests` | 3 | Constraints e integridade do banco |
| `RegressionTests` | 2 | Regressões administrativas |
| `SecurityTests` | 2 | Acesso sem token e token inválido |
| `StressTests` | 2 | Volume básico de operações |
| `ErrorHandlingTests` | 2 | Rotas e métodos inválidos |
| `WorkflowIntegrityTests` | 2 | Ordem de estados e transições |
| **Total** | **48** | Cobertura funcional do backend |

### Lista Completa

| ID | Tipo | Teste automatizado | Resultado esperado |
| --- | --- | --- | --- |
| T01 | Misto | `test_login_retorna_token_e_rejeita_senha_invalida` | Login válido retorna token; senha errada retorna HTTP 401 |
| T02 | Positivo | `test_signup_com_perfil_invalido_cria_usuario_comum` | Perfil inválido é normalizado para `UC` |
| T03 | Negativo | `test_signup_com_email_duplicado_retorna_erro` | E-mail duplicado retorna HTTP 400 |
| T04 | Negativo | `test_rotas_protegidas_exigem_autenticacao` | Rota protegida sem token retorna HTTP 401 |
| T05 | Permissão | `test_uc_nao_acessa_historico_de_outro_usuario` | UC não acessa histórico de outro usuário |
| T06 | Permissão | `test_uc_nao_acessa_lista_de_descartes_disponiveis_para_up` | UC não acessa endpoint exclusivo de UP |
| T07 | Positivo | `test_uc_registra_descarte_e_consulta_historico` | Descarte criado aparece no histórico do UC |
| T08 | Negativo | `test_registro_de_descarte_com_usuario_inexistente_retorna_404` | Usuário inexistente retorna HTTP 404 |
| T09 | Positivo | `test_pedido_de_coleta_cria_descarte_disponivel_para_up` | Pedido cria descarte disponível para UP |
| T10 | Negativo | `test_pedido_sem_material_retorna_400` | Pedido sem material retorna HTTP 400 |
| T11 | Negativo | `test_pedido_sem_endereco_e_usuario_sem_endereco_retorna_400` | Pedido sem endereço válido retorna HTTP 400 |
| T12 | Permissão | `test_ua_nao_pode_criar_pedido_de_coleta` | Administrador não solicita coleta |
| T13 | Positivo | `test_up_vinculado_coleta_transita_finaliza_e_ue_visualiza` | Fluxo completo com UP vinculado e UE visualizando |
| T14 | Negativo | `test_descarte_ja_coletado_nao_pode_ser_coletado_novamente` | Segunda coleta do mesmo descarte retorna HTTP 400 |
| T15 | Positivo | `test_up_sem_vinculo_finaliza_sem_aparecer_para_ue` | UP sem vínculo finaliza sem expor ao UE |
| T16 | Negativo | `test_transicao_invalida_de_status_retorna_erro` | Transição direta inválida retorna HTTP 400 |
| T17 | Permissão | `test_up_nao_altera_status_de_coleta_de_outro_up` | UP não altera coleta de outro UP |
| T18 | Negativo | `test_status_nao_pode_ser_atualizado_antes_da_coleta` | Status não avança antes de uma coleta válida |
| T19 | Regra de negócio | `test_up_nao_pode_coletar_o_proprio_descarte` | UP não coleta o próprio descarte |
| T20 | Negativo | `test_coletar_descarte_inexistente_retorna_404` | Descarte inexistente retorna HTTP 404 |
| T21 | Positivo | `test_workspace_ue_lista_vincula_e_inativa_usuario` | UE lista, vincula e inativa usuário |
| T22 | Negativo | `test_workspace_rejeita_vinculo_com_admin` | Workspace rejeita vínculo com administrador |
| T23 | Negativo | `test_workspace_rejeita_usuario_inexistente` | Vínculo com usuário inexistente retorna HTTP 404 |
| T24 | Negativo | `test_workspace_sem_usuario_informado_retorna_400` | Vínculo sem usuário/e-mail retorna HTTP 400 |
| T25 | Positivo | `test_ue_sem_vinculo_recebe_workspace_auto_criado` | UE sem instituição recebe workspace criado automaticamente |
| T26 | Permissão | `test_metricas_admin_somente_para_ua` | Métricas só para UA |
| T27 | Permissão | `test_conteudo_educativo_post_somente_para_admin` | Conteúdo educativo só pode ser criado por admin |
| T28 | Misto | `test_usuario_comum_pode_atualizar_proprio_perfil_mas_nao_outro_usuario` | UC atualiza próprio perfil, mas não outro usuário |
| T29 | Middleware | `test_middleware_anexa_usuario_autenticado_ao_request` | Token válido popula `request.ecosmart_user` |
| T30 | Middleware | `test_middleware_bloqueia_perfil_nao_autorizado_antes_da_view` | Perfil sem permissão é bloqueado com HTTP 403 antes da view |
| T31 | Middleware | `test_middleware_bloqueia_token_ausente_antes_da_view` | Rota protegida sem token é bloqueada com HTTP 401 antes da view |

## Relatório de Execução

Execução completa validada nesta revisão:

```text
python manage.py check
System check identified no issues (0 silenced).

python manage.py test ecosmart -v 2
Found 48 test(s).
System check identified no issues (0 silenced).
Ran 48 tests in 0.780s
OK
```

Execução realizada em 16/05/2026:

```text
python manage.py test ecosmart.tests.BackendQualityTests -v 2

Found 31 test(s).
System check identified no issues (0 silenced).
test_coletar_descarte_inexistente_retorna_404 ... ok
test_conteudo_educativo_post_somente_para_admin ... ok
test_descarte_ja_coletado_nao_pode_ser_coletado_novamente ... ok
test_login_retorna_token_e_rejeita_senha_invalida ... ok
test_metricas_admin_somente_para_ua ... ok
test_middleware_anexa_usuario_autenticado_ao_request ... ok
test_middleware_bloqueia_perfil_nao_autorizado_antes_da_view ... ok
test_middleware_bloqueia_token_ausente_antes_da_view ... ok
test_pedido_de_coleta_cria_descarte_disponivel_para_up ... ok
test_pedido_sem_endereco_e_usuario_sem_endereco_retorna_400 ... ok
test_pedido_sem_material_retorna_400 ... ok
test_registro_de_descarte_com_usuario_inexistente_retorna_404 ... ok
test_rotas_protegidas_exigem_autenticacao ... ok
test_signup_com_email_duplicado_retorna_erro ... ok
test_signup_com_perfil_invalido_cria_usuario_comum ... ok
test_status_nao_pode_ser_atualizado_antes_da_coleta ... ok
test_transicao_invalida_de_status_retorna_erro ... ok
test_ua_nao_pode_criar_pedido_de_coleta ... ok
test_uc_nao_acessa_historico_de_outro_usuario ... ok
test_uc_nao_acessa_lista_de_descartes_disponiveis_para_up ... ok
test_uc_registra_descarte_e_consulta_historico ... ok
test_ue_sem_vinculo_recebe_workspace_auto_criado ... ok
test_up_nao_altera_status_de_coleta_de_outro_up ... ok
test_up_nao_pode_coletar_o_proprio_descarte ... ok
test_up_sem_vinculo_finaliza_sem_aparecer_para_ue ... ok
test_up_vinculado_coleta_transita_finaliza_e_ue_visualiza ... ok
test_usuario_comum_pode_atualizar_proprio_perfil_mas_nao_outro_usuario ... ok
test_workspace_rejeita_usuario_inexistente ... ok
test_workspace_rejeita_vinculo_com_admin ... ok
test_workspace_sem_usuario_informado_retorna_400 ... ok
test_workspace_ue_lista_vincula_e_inativa_usuario ... ok

Ran 31 tests in 0.381s
OK
```

Validação adicional:

```text
python manage.py check
System check identified no issues (0 silenced).
```

## Evidência de Cobertura Mínima

Cobertura mínima definida para o MVP: cada fluxo crítico do backend deve ter pelo menos um teste automatizado.

| Área crítica | Evidência |
| --- | --- |
| Autenticação | T01 |
| Middleware de autorização | T29, T30, T31 |
| Autorização por perfil | T04, T05, T06, T12, T17, T26, T27, T28 |
| Cadastro de usuário | T02, T03 |
| Descartes do UC | T07, T08 |
| Pedido de coleta | T09, T10, T11, T12 |
| Coleta e status do UP | T13, T14, T15, T16, T17, T18, T19, T20 |
| Sincronização pedido/descarte | T13, T15 |
| Painel/visibilidade UE | T13, T15, T25 |
| Workspace empresarial | T21, T22, T23, T24, T25 |
| Conteúdo educativo/admin | T27 |
| Perfil de usuário | T28 |
| Métricas administrativas | T26 |

Resultado: 12 de 12 áreas críticas do backend MVP possuem cobertura funcional automatizada, com casos comuns e casos falhos/negativos.

Para uma etapa futura, recomenda-se adicionar `coverage.py` ao ambiente e medir cobertura por linha com:

```powershell
python -m coverage run manage.py test ecosmart
python -m coverage report -m
```

## Código dos Testes Implementados

O código está em:

- `ecosmart/tests.py`

Classe principal:

- `BackendQualityTests`

Essa classe contém os 31 testes automatizados do MVP listados acima e usa `TestCase`, banco isolado, client HTTP do Django e dados criados no próprio `setUp`. O arquivo tambem contem as suites complementares de validacao, integridade, regressao, seguranca, estresse, tratamento de erro e workflow, totalizando 48 testes.
