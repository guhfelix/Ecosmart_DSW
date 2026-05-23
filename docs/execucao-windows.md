# Guia de Execucao no Windows

Este guia mostra como rodar o EcoSmart localmente no Windows usando PowerShell.

## 1. Pre-requisitos

Instale ou confirme:

- Python 3.10 ou superior
- Node.js 18 ou superior
- npm
- Git

Verifique:

```powershell
python --version
node --version
npm --version
git --version
```

## 2. Entrar na pasta do projeto

```powershell
cd "C:\Users\gusta\Downloads\Projeto WEB\Ecosmart_DSW"
```

Se voce clonou em outro local, entre na pasta correspondente.

## 3. Criar e ativar ambiente virtual

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Se o PowerShell bloquear a ativacao, rode em uma janela aberta como usuario normal:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Depois tente ativar novamente.

## 4. Instalar backend

```powershell
python -m pip install --upgrade pip
pip install -r requirements.txt
```

## 5. Instalar frontend

```powershell
npm install
```

## 6. Configurar `.env`

Copie o exemplo:

```powershell
Copy-Item .env.example .env
```

Configuracao local recomendada:

```env
DJANGO_SECRET_KEY=troque-por-uma-chave-longa-e-aleatoria
DJANGO_DEBUG=true
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DJANGO_CORS_ALLOW_ALL_ORIGINS=true
DJANGO_CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
DATABASE_ENGINE=sqlite
SQLITE_DB_PATH=db.sqlite3
VITE_API_URL=http://localhost:8000/api
```

## 7. Preparar banco

```powershell
python manage.py migrate
python manage.py seed_db
```

## 8. Rodar backend

Em um terminal:

```powershell
python manage.py runserver 127.0.0.1:8000
```

Backend:

```text
http://127.0.0.1:8000
```

## 9. Rodar frontend

Em outro terminal, na mesma pasta:

```powershell
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## 10. Credenciais de teste

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Administrador | `admin@ecosmart.com` | `admin123` |
| Usuario Comum | `maria@email.com` | `maria123` |
| Premium vinculado | `ana@email.com` | `ana123` |
| Premium sem vinculo | `joao@email.com` | `joao123` |
| Empresarial | `carlos@empresa.com` | `carlos123` |

## 11. Validar o projeto

Backend:

```powershell
python manage.py check
python manage.py test ecosmart -v 2
```

Frontend:

```powershell
npm run build
```

## 12. Problemas comuns

### Porta 8000 ocupada

Use outra porta:

```powershell
python manage.py runserver 127.0.0.1:8001
```

Depois ajuste:

```env
VITE_API_URL=http://127.0.0.1:8001/api
```

### Frontend nao conecta no backend

Confira:

- Backend ativo em `http://127.0.0.1:8000`.
- Frontend ativo em `http://localhost:5173`.
- `.env` com `VITE_API_URL=http://localhost:8000/api`.
- CORS permitindo a origem do frontend.

### Dados locais antigos

Se puder apagar dados locais:

```powershell
Remove-Item .\db.sqlite3
python manage.py migrate
python manage.py seed_db
```
