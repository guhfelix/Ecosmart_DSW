# Guia de Uso - EcoSmart

## 🚀 Como Começar

> Status atual: login, cadastro, usuários, conteúdos, descartes, pedidos de coleta, coletas e workspace empresarial estão integrados à API Django. Impacto ambiental, notificações, pontos de coleta e alguns indicadores administrativos ainda usam dados demonstrativos do frontend.

### 1. Acessar o Sistema

Ao abrir o EcoSmart, você verá a **Landing Page** com informações sobre a plataforma.

**Opções:**
- **Entrar**: Se já possui conta
- **Criar Conta**: Para novos usuários

### 2. Criar uma Conta

1. Clique em "Criar Conta" ou "Cadastro"
2. Preencha os dados:
   - Nome completo
   - E-mail
   - Telefone
   - Endereço
   - Senha
   - Tipo de perfil:
     - **Usuário Comum**: Para uso pessoal
     - **Usuário Premium**: Recursos avançados
     - **Usuário Empresarial**: Para organizações
3. Aceite os termos de uso
4. Clique em "Criar Conta"

### 3. Fazer Login

**Credenciais de Teste Disponíveis:**

| Perfil | E-mail | Senha |
|--------|--------|-------|
| Admin | admin@ecosmart.com | admin123 |
| Comum | maria@email.com | maria123 |
| Premium | ana@email.com | ana123 |
| Empresarial | carlos@empresa.com | carlos123 |

## 📱 Navegando no Dashboard

Após o login, você verá seu **Dashboard** personalizado.

### Barra Lateral (Sidebar)
- 🏠 **Dashboard**: Visão geral
- ➕ **Registrar Descarte**: Novo registro
- 📜 **Histórico**: Descartes anteriores
- 📊 **Impacto Ambiental**: Suas métricas
- 📚 **Conteúdo Educativo**: Aprenda sobre reciclagem
- 📍 **Pontos de Coleta**: Onde descartar
- 🚛 **Pedidos de Coleta**: Solicitar coleta
- 🔔 **Notificações**: Alertas e avisos
- 👤 **Perfil**: Suas configurações

### Barra Superior
- 🔍 **Busca**: Pesquisar no sistema
- 🔔 **Notificações**: Com contador de não lidas
- 👤 **Menu de Usuário**: Perfil e sair

## ♻️ Registrando um Descarte

### Passo a Passo

1. Clique em **"Registrar Descarte"** na sidebar
2. Preencha o formulário:
   - **Tipo de Resíduo**: Selecione da lista
     - Papel, Plástico, Vidro, Metal, Eletrônicos, etc.
   - **Quantidade**: Valor numérico
   - **Unidade**: kg, litros ou unidades
   - **Data do Descarte**: Quando descartou
   - **Local**: Onde foi descartado
   - **Observações** (opcional): Detalhes adicionais
   - **Foto** (opcional): campo visual preparado para evolução; o envio real de arquivo ainda é item futuro
3. Clique em **"Registrar Descarte"**

✅ Você verá uma confirmação de sucesso!

### Onde Encontrar Depois
- Dashboard: Últimos registros
- Histórico: Lista completa
- Impacto: Métricas atualizadas

## 📜 Consultando o Histórico

1. Acesse **"Histórico"** na sidebar
2. Veja todos seus descartes em tabela
3. Use os **filtros**:
   - 🔍 **Busca**: Por tipo ou local
   - 📊 **Status**: Registrado, Coletado, Processado
   - 📅 **Período**: Data específica
4. Clique em uma linha para ver **detalhes**

### Ações Disponíveis
- 👁️ **Visualizar**: Detalhes completos
- 🔎 **Filtrar**: Refinar a lista por busca, status e período

> Exportação e edição retroativa de descarte estão no roadmap.

## 📊 Acompanhando seu Impacto

1. Clique em **"Impacto Ambiental"**
2. Veja suas métricas:
   - 🌿 **Material Reciclado**: Total em kg
   - 💨 **CO₂ Evitado**: Emissões evitadas
   - ⭐ **Pontos Acumulados**: Sua pontuação
   - 💰 **Economia Gerada**: Valor econômico

### Gráficos
- 📈 **Evolução de Reciclagem**: Por mês
- 📉 **Emissões Evitadas**: Linha do tempo
- 🌳 **Equivalentes**: Árvores, água, energia

> Nesta versão, a tela de impacto usa dados demonstrativos locais. Os descartes reais já ficam salvos no backend e podem alimentar esses indicadores em uma próxima etapa.

### Sugestões
- Dicas personalizadas para melhorar seu impacto
- Metas sugeridas
- Comparativos

## 📚 Aprendendo a Reciclar

### Central Educativa

1. Acesse **"Conteúdo Educativo"**
2. Navegue pelos materiais disponíveis:
   - 💡 Lâmpadas Fluorescentes
   - 💅 Esmaltes
   - 📱 Eletrônicos
   - 🛢️ Óleo de Cozinha
   - 📄 Papel
   - ♻️ Plástico
   - 🍷 Vidro
   - 🔩 Metal

### Visualizando um Conteúdo

1. Clique em um material
2. Veja informações detalhadas:
   - 📝 **Descrição**: O que é o material
   - ✅ **Como Descartar**: Passo a passo
   - ⚠️ **Cuidados**: Avisos importantes

### Ações Rápidas
- 📍 **Ver Pontos de Coleta**: Para aquele material
- ➕ **Registrar Descarte**: Já com material selecionado

## 📍 Encontrando Pontos de Coleta

1. Acesse **"Pontos de Coleta"**
2. Veja o **mapa** com marcadores
3. Use os **filtros**:
   - 🔍 **Busca**: Por endereço/bairro
   - 🏷️ **Tipo**: Ecoponto, Especializado, etc.
   - 📦 **Material**: O que deseja descartar

### Detalhes de um Ponto

Clique em um ponto para ver:
- 📍 **Endereço**: Localização completa
- ⏰ **Horário**: Funcionamento
- ☎️ **Telefone**: Contato
- ♻️ **Materiais Aceitos**: Lista completa

### Ações
- 🗺️ **Ver Rota**: Navegar até lá
- 🚛 **Solicitar Coleta**: Pedir coleta naquele local

> Os pontos de coleta são demonstrativos nesta versão. O modelo `PontoColeta` já existe no backend, mas a tela ainda não consulta essa tabela.

## 🚛 Solicitando uma Coleta

### Novo Pedido (Wizard de 4 Etapas)

1. Clique em **"Pedidos de Coleta"** → **"Novo Pedido"**

#### Etapa 1: Foto (Opcional)
- 📷 Upload de imagem do material
- Ou pule para próximo

#### Etapa 2: Materiais
- ✅ Selecione os tipos de material
- Múltipla seleção permitida
- Ex: Papel + Plástico + Vidro

#### Etapa 3: Detalhes
- 📦 **Quantidade Estimada**: Ex: "50 kg"
- 📍 **Endereço**: Onde coletar
- 📝 **Observações**: Informações extras

#### Etapa 4: Revisão
- Confira todos os dados
- ✅ Confirme e envie

### Acompanhando Pedidos

Status possíveis:
- 🟡 **Solicitada**: Aguardando aprovação
- 🔵 **Agendada**: Data marcada
- 🟢 **Finalizada**: Coleta concluída
- 🔴 **Cancelada**: Pedido cancelado

## 🔔 Notificações

### Tipos de Notificação
- ⚙️ **Sistema**: Atualizações da plataforma
- 🚛 **Coleta**: Status de pedidos
- 📣 **Campanha**: Eventos e promoções
- 📚 **Educativo**: Novos conteúdos

### Gerenciando Notificações

1. Clique no ícone 🔔 no topo
2. Ou acesse **"Notificações"** na sidebar
3. Filtros:
   - **Todas**: Todas notificações
   - **Não Lidas**: Apenas novas
4. Ações:
   - ✅ Marcar como lida
   - 🗑️ Arquivar
   - 📖 Ver detalhes

> Notificações ainda usam dados mockados no frontend.

## 👤 Gerenciando seu Perfil

1. Acesse **"Perfil"** na sidebar
2. Seções disponíveis:

### Informações Pessoais
- ✏️ **Editar**: Nome, e-mail, telefone, endereço
- 💾 **Salvar**: Atualizar dados

### Preferências
- ✉️ Receber notificações por e-mail
- 📰 Receber novidades e promoções
- 📊 Compartilhar dados para relatórios

### Segurança
- 🔐 Alterar senha (roadmap)
- 🔒 Configurações de privacidade

## 🔐 Painel Administrativo (Admin)

*Disponível apenas para perfil UA*

### Gestão de Usuários
- 👥 Ver todos usuários
- ✏️ Editar perfis
- 🔒 Ativar/Desativar contas
- ➕ Criar novos usuários

### Gestão de Permissões
- 🛡️ Matriz de permissões por perfil
- ✅ Ativar/Desativar funcionalidades
- 💾 Salvar configurações

### Gestão de Conteúdos
- 📚 Criar conteúdos educativos
- ✏️ Editar materiais
- 🗑️ Remover conteúdos
- 📢 Publicar campanhas

### Arquitetura do Sistema
- 🏗️ Visão técnica da plataforma
- 📊 Status dos serviços
- 🔗 Documentação de integração

## 🎯 Dicas de Uso

### Para Usuários Comuns
1. Registre descartes regularmente
2. Consulte o conteúdo educativo antes de descartar
3. Use o mapa para encontrar pontos próximos
4. Acompanhe seu impacto para se motivar

### Para Empresas
1. Incentive funcionários a usar a plataforma
2. Acompanhe métricas consolidadas
3. Solicite coletas para grandes volumes
4. Use dados para relatórios de sustentabilidade

### Para Administradores
1. Monitore o uso do sistema
2. Atualize conteúdos educativos regularmente
3. Gerencie permissões com cuidado
4. Analise logs para identificar problemas

## ❓ Perguntas Frequentes

**Como ganho pontos?**
- Registrando descartes
- Participando de campanhas
- Compartilhando conteúdos

**Posso mudar meu perfil depois?**
- Sim, solicite ao administrador

**Os dados são privados?**
- O backend aplica autenticação por token assinado e controle de acesso por perfil. O projeto não usa Supabase Auth/RLS diretamente nesta versão.

**Como exporto meu histórico?**
- A exportação ainda está no roadmap. Por enquanto, o histórico é consultado na própria tela.

**Posso usar no celular?**
- Sim, o design é responsivo

## 🆘 Suporte

**Problemas ou dúvidas?**
- Use a documentação técnica em `README.md` e na pasta `docs/`.
- Valide o backend com `python manage.py check` e `python manage.py test ecosmart -v 2`.
- Valide o frontend com `npm run build`.

---

**EcoSmart** - Sua jornada sustentável começa aqui! 🌿♻️
