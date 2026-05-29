# Matriz de Casos de Teste

## Objetivo

Documentar os principais casos de teste do projeto EcoSmart, relacionando funcionalidades, critérios esperados e situação da validação automatizada.

## Perfis Considerados

| Perfil | Descrição |
| --- | --- |
| `UC` | Usuário Comum |
| `UP` | Usuário Premium |
| `UE` | Usuário Empresarial |
| `UA` | Usuário Administrador |

## Matriz

| ID | Funcionalidade | Cenário | Resultado Esperado | Status |
| --- | --- | --- | --- | --- |
| CT-001 | Autenticação | Login com credenciais válidas | Retorna HTTP 200 e token | Aprovado |
| CT-002 | Autenticação | Login com senha inválida | Retorna HTTP 401 | Aprovado |
| CT-003 | Autenticação | Acesso sem token a rota protegida | Retorna HTTP 401 | Aprovado |
| CT-004 | Autenticação | Token inválido | Retorna HTTP 401 | Aprovado |
| CT-005 | Middleware | Token válido no header Authorization | Usuário é anexado ao request | Aprovado |
| CT-006 | Cadastro | Cadastro com perfil inválido | Cria usuário comum `UC` | Aprovado |
| CT-007 | Cadastro | Cadastro com e-mail duplicado | Retorna HTTP 400 | Aprovado |
| CT-008 | Cadastro | Cadastro sem nome | Retorna erro de validação | Aprovado |
| CT-009 | Cadastro | Cadastro com e-mail inválido | Retorna erro de validação | Aprovado |
| CT-010 | Permissões | `UC` acessa rota exclusiva de `UP` | Retorna HTTP 403 | Aprovado |
| CT-011 | Permissões | `UC` tenta consultar histórico de outro usuário | Retorna HTTP 403 | Aprovado |
| CT-012 | Permissões | `UC` tenta acessar métricas administrativas | Retorna HTTP 403 | Aprovado |
| CT-013 | Permissões | `UA` acessa métricas administrativas | Retorna HTTP 200 | Aprovado |
| CT-014 | Perfil | `UC` atualiza o próprio perfil | Retorna HTTP 200 e dados atualizados | Aprovado |
| CT-015 | Perfil | `UC` tenta atualizar outro usuário | Retorna HTTP 403 | Aprovado |
| CT-016 | Usuários | `UA` lista usuários | Retorna lista de usuários | Aprovado |
| CT-017 | Usuários | `UA` cria usuário | Retorna usuário criado | Aprovado |
| CT-018 | Usuários | `UA` remove usuário | Retorna sucesso | Aprovado |
| CT-019 | Conteúdos | `UA` cria conteúdo educativo | Retorna HTTP 201 | Aprovado |
| CT-020 | Conteúdos | `UC` tenta criar conteúdo educativo | Retorna HTTP 403 | Aprovado |
| CT-021 | Descartes | `UC` registra descarte válido | Retorna HTTP 201 | Aprovado |
| CT-022 | Descartes | Registro de descarte para usuário inexistente | Retorna HTTP 404 | Aprovado |
| CT-023 | Descartes | Registro com quantidade negativa | Retorna erro de validação | Aprovado |
| CT-024 | Descartes | Registro com observação muito grande | Retorna erro de validação | Aprovado |
| CT-025 | Histórico | `UC` consulta o próprio histórico | Retorna lista de descartes | Aprovado |
| CT-026 | Pedido de coleta | Pedido com material válido | Cria pedido e descarte relacionado | Aprovado |
| CT-027 | Pedido de coleta | Pedido sem material | Retorna HTTP 400 | Aprovado |
| CT-028 | Pedido de coleta | Pedido sem endereço | Retorna HTTP 400 | Aprovado |
| CT-029 | Pedido de coleta | `UA` tenta criar pedido | Retorna HTTP 403 | Aprovado |
| CT-030 | Coleta | `UP` visualiza descartes disponíveis | Retorna descartes com status `registrado` | Aprovado |
| CT-031 | Coleta | `UP` coleta descarte disponível | Atualiza status para `coletado` | Aprovado |
| CT-032 | Coleta | `UP` tenta coletar o próprio descarte | Retorna HTTP 400 | Aprovado |
| CT-033 | Coleta | Coletar descarte inexistente | Retorna HTTP 404 | Aprovado |
| CT-034 | Coleta | Coletar descarte já coletado | Retorna HTTP 400 | Aprovado |
| CT-035 | Status de coleta | Alterar `coletado` para `em_transito` | Atualiza status com sucesso | Aprovado |
| CT-036 | Status de coleta | Alterar `em_transito` para `processado` | Atualiza status com sucesso | Aprovado |
| CT-037 | Status de coleta | Transição inválida de status | Retorna HTTP 400 | Aprovado |
| CT-038 | Status de coleta | `UP` altera coleta de outro `UP` | Retorna HTTP 403 | Aprovado |
| CT-039 | Empresa | `UE` consulta descartes da instituição | Retorna registros vinculados | Aprovado |
| CT-040 | Empresa | Coleta por `UP` sem vínculo institucional | Não aparece para `UE` | Aprovado |
| CT-041 | Workspace | `UE` lista workspace | Retorna workspace e membros | Aprovado |
| CT-042 | Workspace | `UE` vincula usuário comum | Cria vínculo ativo | Aprovado |
| CT-043 | Workspace | `UE` inativa vínculo | Atualiza status do vínculo | Aprovado |
| CT-044 | Workspace | Vincular administrador ao workspace | Retorna HTTP 400 | Aprovado |
| CT-045 | Workspace | Vincular usuário inexistente | Retorna HTTP 404 | Aprovado |
| CT-046 | Workspace | `UE` sem vínculo acessa workspace | Cria workspace automaticamente | Aprovado |
| CT-047 | Integridade | Criar tipo de resíduo sem nome | Gera erro de integridade | Aprovado |
| CT-048 | Integridade | Criar usuário com e-mail duplicado | Gera erro de integridade | Aprovado |
| CT-049 | Integridade | Criar descarte com usuário inexistente | Gera erro de integridade | Aprovado |
| CT-050 | Erros | Acessar rota inexistente | Retorna HTTP 404 | Aprovado |
| CT-051 | Erros | Usar método inválido em login | Retorna HTTP 400 ou 405 | Aprovado |
| CT-052 | Estresse | Criar 100 descartes consecutivos | Todos retornam HTTP 201 | Aprovado |
| CT-053 | Estresse | Fazer 50 logins consecutivos | Todos retornam HTTP 200 | Aprovado |
| CT-054 | Frontend | Executar build de produção | Build concluído sem erro | Aprovado |
| CT-055 | Configuração | Executar `manage.py check` | Sem problemas identificados | Aprovado |
| CT-056 | Migrações | Conferir migrações pendentes | Nenhuma alteração detectada | Aprovado |

## Cobertura por Área

| Área | Situação |
| --- | --- |
| Backend/API | Coberto por testes automatizados |
| Autenticação | Coberto por testes automatizados |
| Permissões | Coberto por testes automatizados |
| Banco de dados | Coberto por testes de integridade |
| Frontend | Validado por build de produção |
| Interface visual | Sem teste automatizado dedicado |
| Cobertura percentual | Não aferida no ambiente atual |

## Observações

- A suíte automatizada atual cobre os fluxos mais críticos do backend.
- O frontend ainda não possui testes unitários ou testes end-to-end.
- O build do frontend serve como validação de compilação, importações e empacotamento.
- Algumas funcionalidades visuais ainda usam dados mockados, conforme documentado no projeto.
- Para evolução futura, recomenda-se adicionar testes E2E com Playwright ou Cypress para validar login, cadastro, registro de descarte e fluxo de coleta pela interface.

