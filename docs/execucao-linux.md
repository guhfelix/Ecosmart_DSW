# Guia de Execução no Linux

Este guia mostra como rodar a aplicação EcoSmart em uma máquina Linux. Os comandos abaixo foram pensados para Ubuntu/Debian, mas funcionam de forma parecida em outras distribuições.

## 1. Pré-requisitos

Verifique se a máquina possui:

- Python 3.10 ou superior
- Node.js 18 ou superior
- npm
- Git, caso o projeto seja clonado de um repositório

Comandos para verificar:

```bash
python3 --version
node --version
npm --version
git --version
```

Se faltar algo em Ubuntu/Debian:

```bash
sudo apt update
sudo apt install -y python3 python3-venv python3-pip nodejs npm git
```

Se o `node --version` mostrar uma versão menor que 18, instale uma versão mais nova do Node.js antes de continuar.

## 2. Entrar na pasta do projeto

Se recebeu o projeto em `.zip`, extraia e entre na pasta:

```bash
cd caminho/para/ecosmart-dsw-main
```

Se recebeu via Git:

```bash
git clone URL_DO_REPOSITORIO
cd ecosmart-dsw-main
```

## 3. Criar ambiente virtual Python

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Quando o ambiente estiver ativo, o terminal normalmente mostra `(.venv)` no início da linha.

## 4. Instalar dependências do backend

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

## 5. Instalar dependências do frontend

```bash
npm install
```

## 6. Configurar variáveis de ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Abra o `.env` e confirme que está usando SQLite para rodar localmente:

```bash
nano .env
```

Configuração recomendada para execução local:

```env
DATABASE_ENGINE=sqlite
SQLITE_DB_PATH=db.sqlite3
DJANGO_DEBUG=true
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DJANGO_CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Salve e feche o arquivo.

No `nano`: `Ctrl + O`, `Enter`, depois `Ctrl + X`.

## 7. Preparar o banco de dados

```bash
python manage.py migrate
python manage.py seed_db
```

O comando `seed_db` cria dados e credenciais de teste.

## 8. Rodar o backend

Abra um terminal na pasta do projeto, ative o ambiente virtual e execute:

```bash
source .venv/bin/activate
python manage.py runserver 127.0.0.1:8000
```

O backend ficará disponível em:

```text
http://127.0.0.1:8000
```

## 9. Rodar o frontend

Abra outro terminal na pasta do projeto e execute:

```bash
npm run dev -- --host 127.0.0.1
```

O frontend ficará disponível em:

```text
http://127.0.0.1:5173
```

## 10. Acessar a aplicação

Abra no navegador:

```text
http://127.0.0.1:5173
```

## 11. Credenciais de teste

```text
Administrador:
Email: admin@ecosmart.com
Senha: admin123

Usuário Comum:
Email: maria@email.com
Senha: maria123

Usuário Premium vinculado à empresa:
Email: ana@email.com
Senha: ana123

Usuário Premium sem empresa:
Email: joao@email.com
Senha: joao123

Usuário Empresarial:
Email: carlos@empresa.com
Senha: carlos123
```

## 12. Validar backend e testes

Com o ambiente virtual ativo:

```bash
python manage.py check
python manage.py test ecosmart -v 2
```

Resultado esperado:

```text
System check identified no issues
48 tests
OK
```

## 13. Fluxo rápido para testar manualmente

1. Entre como `maria@email.com`.
2. Crie um pedido em `Pedidos de Coleta`.
3. Saia e entre como `ana@email.com`.
4. No painel UP, colete o descarte disponível.
5. Marque como `Em trânsito`.
6. Marque como `Entregue`.
7. Saia e entre como `carlos@empresa.com`.
8. Verifique se a coleta aparece no painel empresarial.

## 14. Problemas comuns

### Porta 8000 já está em uso

Use outra porta:

```bash
python manage.py runserver 127.0.0.1:8001
```

Nesse caso, crie ou ajuste no `.env` do frontend:

```env
VITE_API_URL=http://127.0.0.1:8001/api
```

Depois reinicie o frontend.

### Porta 5173 já está em uso

O Vite pode escolher outra porta automaticamente. Se isso acontecer, acesse a URL mostrada no terminal.

### Erro de permissão no Python

Confirme que o ambiente virtual está ativo:

```bash
source .venv/bin/activate
```

Depois instale novamente:

```bash
pip install -r requirements.txt
```

### Erro de banco ou dados antigos

Para recriar o banco local do zero, use apenas se puder apagar os dados locais:

```bash
rm -f db.sqlite3
python manage.py migrate
python manage.py seed_db
```

### A tela não conecta ao backend

Confirme:

- Backend rodando em `http://127.0.0.1:8000`.
- Frontend rodando em `http://127.0.0.1:5173`.
- `.env` com `DJANGO_CORS_ALLOWED_ORIGINS` incluindo `http://127.0.0.1:5173`.

## 15. Parar a aplicação

Nos terminais do backend e frontend:

```bash
Ctrl + C
```

Para sair do ambiente virtual:

```bash
deactivate
```
