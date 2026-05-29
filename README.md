# EcoSmart - Gestao Sustentavel de Residuos

EcoSmart e uma plataforma web para registro, acompanhamento e gestao de descartes de residuos solidos. O projeto conecta usuarios comuns, coletores premium, empresas/cooperativas e administradores em um fluxo unico de descarte, coleta, educacao ambiental e acompanhamento operacional.

## Status do Projeto

O MVP esta funcional com frontend React e API Django integrada. A aplicacao possui autenticação propria, controle de acesso por perfil, persistencia em SQLite local ou PostgreSQL/Supabase, fluxo real de pedidos de coleta e testes automatizados do backend.

Recursos integrados ao backend:

- Login, cadastro e sessao com token assinado pelo Django.
- Controle de acesso por perfis `UC`, `UP`, `UE` e `UA`.
- Registro e historico de descartes.
- Pedido de coleta gerando descarte disponivel para coletores.
- Coleta por usuario Premium, com avanço de status.
- Vinculo de coletas a instituicoes quando o coletor esta vinculado.
- Painel empresarial com descartes vinculados a instituicao.
- Workspace empresarial para vincular e inativar usuarios.
- Gestao administrativa de usuarios e conteudos educativos.
- Edicao de perfil do proprio usuario.

Recursos demonstrativos ou parcialmente mockados:

- Impacto ambiental, notificacoes, pontos de coleta e alguns indicadores administrativos ainda usam `src/lib/mockData.ts`.
- Upload de imagem aparece na interface, mas ainda nao envia arquivo para a API.
- Exportacao de relatorios, recompensas, automacoes Make e integracoes externas estao como roadmap/documentacao.

## Stack

| Camada | Tecnologias |
| --- | --- |
| Frontend | React 18, TypeScript, Vite, React Router 7, Tailwind CSS v4 |
| UI e graficos | Radix UI, lucide-react, Recharts, sonner |
| Backend | Django, django-cors-headers |
| Banco | SQLite local, PostgreSQL local via Docker ou Supabase PostgreSQL |
| Qualidade | `django.test.TestCase`, `manage.py check`, build Vite |

## Perfis

| Perfil | Nome | Principais permissoes |
| --- | --- | --- |
| `UC` | Usuario Comum | Registrar descartes, criar pedidos de coleta, consultar proprio historico e editar perfil |
| `UP` | Usuario Premium | Ver descartes disponiveis, coletar descartes de UC e atualizar status das proprias coletas |
| `UE` | Usuario Empresarial | Consultar dados da instituicao e gerenciar vinculos no workspace |
| `UA` | Usuario Administrador | Gerenciar usuarios, conteudos, metricas administrativas e rotas de supervisao |

## Estrutura do Repositorio

```text
.
├── ecosmart/                 # App Django: modelos, views, auth, testes e seed
├── src/                      # Frontend React/TypeScript
│   ├── app/                  # Rotas, layouts, paginas e componentes
│   ├── contexts/             # AuthContext e estado de sessao
│   ├── lib/                  # apiFetch e dados mockados
│   └── styles/               # CSS global, Tailwind e tema
├── docs/                     # Documentacao tecnica e guias de execucao
├── supabase/                 # Configuracao auxiliar do Supabase
├── manage.py                 # CLI Django
├── settings.py               # Configuracao Django/env/banco/CORS
├── urls.py                   # Rotas da API
├── package.json              # Dependencias e scripts do frontend
├── requirements.txt          # Dependencias Python
└── docker-compose.yml        # PostgreSQL local opcional
```

## Documentacao

- [Guia de uso](GUIA_DE_USO.md)
- [Arquitetura](docs/arquitetura.md)
- [API Django](docs/api.md)
- [Modelo de dados](docs/modelo-dados.md)
- [Controle de acesso](docs/controle-acesso.md)
- [Qualidade e testes do backend](docs/qualidade-backend.md)
- [Relatório de execução de testes](docs/relatorio-execucao-testes.md)
- [Matriz de casos de teste](docs/matriz-casos-teste.md)
- [Execucao no Windows](docs/execucao-windows.md)
- [Execucao no Linux](docs/execucao-linux.md)
- [Integracao com Supabase](SUPABASE_INTEGRATION.md)

## Configuracao Local

### 1. Instalar dependencias Python

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### 2. Instalar dependencias do frontend

```powershell
npm install
```

### 3. Configurar ambiente

Copie `.env.example` para `.env` e mantenha SQLite para desenvolvimento local:

```env
DATABASE_ENGINE=sqlite
SQLITE_DB_PATH=db.sqlite3
DJANGO_DEBUG=true
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DJANGO_CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
VITE_API_URL=http://localhost:8000/api
```

### 4. Preparar banco e dados de teste

```powershell
python manage.py migrate
python manage.py seed_db
```

### 5. Rodar backend

```powershell
python manage.py runserver 127.0.0.1:8000
```

### 6. Rodar frontend

Em outro terminal:

```powershell
npm run dev
```

Acesse:

```text
http://localhost:5173
```

## Credenciais de Teste

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Administrador | `admin@ecosmart.com` | `admin123` |
| Usuario Comum | `maria@email.com` | `maria123` |
| Usuario Comum extra | `pedro@email.com` | `pedro123` |
| Premium vinculado | `ana@email.com` | `ana123` |
| Premium sem vinculo | `joao@email.com` | `joao123` |
| Empresarial | `carlos@empresa.com` | `carlos123` |

## Fluxo Principal

1. O `UC` cria um pedido de coleta ou registra um descarte.
2. A API cria um `Descarte` com status `registrado`.
3. O `UP` visualiza descartes disponiveis e assume a coleta.
4. O status avanca de `coletado` para `em_transito` e depois `processado`.
5. Se o `UP` estiver vinculado a uma instituicao, o descarte aparece no painel `UE`.
6. O `UC` acompanha o historico e o status relacionado ao pedido.

## Comandos de Qualidade

Backend:

```powershell
python manage.py check
python manage.py test ecosmart -v 2
```

Frontend:

```powershell
npm run build
```

Na validacao desta revisao, o backend executou 48 testes com sucesso e o build Vite foi usado para verificar a compilacao do frontend.

## Banco de Dados

O projeto pode rodar em tres modos:

| Modo | Quando usar | Configuracao |
| --- | --- | --- |
| SQLite | Desenvolvimento local simples | `DATABASE_ENGINE=sqlite` |
| PostgreSQL local | Teste mais proximo de producao | `DATABASE_ENGINE=postgres` com `docker-compose.yml` |
| Supabase PostgreSQL | Banco em nuvem mantendo Django como API | `DATABASE_URL=postgresql://...?...sslmode=require` |

Detalhes da migracao para Supabase estao em [SUPABASE_INTEGRATION.md](SUPABASE_INTEGRATION.md).

## Roadmap

- Persistir notificacoes, pontos de coleta e metricas de impacto no backend.
- Implementar upload real de imagens para descartes.
- Adicionar exportacao de relatorios.
- Criar fluxo de recuperacao/alteracao de senha.
- Preparar configuracao de deploy com variaveis seguras e `DJANGO_DEBUG=false`.
- Expandir gamificacao e recompensas.

## Licenca

Projeto academico/prototipo funcional de alta fidelidade para gestao sustentavel de residuos solidos.
