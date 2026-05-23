import { Database, Server, GitBranch, Code, Workflow, ShieldCheck } from 'lucide-react';

export function ArquiteturaSystem() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1a4d2e]">Arquitetura do Sistema</h1>
        <p className="mt-2 text-muted-foreground">
          Visão técnica da estrutura do EcoSmart
        </p>
      </div>

      <div className="rounded-xl border bg-gradient-to-br from-[#4caf50]/10 to-[#81c784]/10 p-8">
        <h2 className="text-2xl font-bold text-[#1a4d2e]">Visão Geral</h2>
        <p className="mt-2 text-muted-foreground">
          O EcoSmart combina frontend React, API Django e banco relacional para registrar descartes,
          controlar coletas, gerenciar perfis e consolidar dados empresariais.
        </p>
      </div>


      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4caf50]">
              <Code className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Front-end Web</h3>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <p>• React 18 com TypeScript</p>
            <p>• React Router para navegação</p>
            <p>• Tailwind CSS v4 para estilização</p>
            <p>• Recharts para visualização de dados</p>
            <p>• Responsivo e acessível</p>
          </div>
        </div>

        {/* Backend */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4caf50]">
              <Server className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold">API / Backend</h3>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <p>• Django como API da aplicação</p>
            <p>• Views JSON para regras de negócio</p>
            <p>• Middleware próprio de autenticação</p>
            <p>• Controle de acesso por perfil</p>
            <p>• Testes automatizados do backend</p>
          </div>
        </div>

        {/* Database */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4caf50]">
              <Database className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Banco de Dados</h3>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <p>• SQLite para desenvolvimento local</p>
            <p>• PostgreSQL local via Docker</p>
            <p>• Supabase PostgreSQL opcional</p>
            <p>• Estrutura relacional normalizada</p>
            <p>• Tabelas de usuários, descartes, pedidos e instituições</p>
          </div>
        </div>

        {/* Automação */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#4caf50]">
              <Workflow className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Integrações</h3>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <p>• Frontend consome a API por VITE_API_URL</p>
            <p>• Supabase pode ser usado como PostgreSQL remoto</p>
            <p>• Make e automações externas estão no roadmap</p>
            <p>• Uploads e notificações reais estão planejados</p>
          </div>
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[#1a4d2e]">Fases de Desenvolvimento</h3>

        <div className="rounded-xl border-l-4 border-yellow-500 bg-yellow-50 p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-6 w-6 text-yellow-600" />
            <div>
              <h4 className="font-semibold text-yellow-900">Fase 1: MVP Funcional</h4>
              <p className="mt-2 text-sm text-yellow-800">
                <strong>Status:</strong> Atual<br />
                Autenticação, controle de acesso, usuários, conteúdos, descartes, pedidos,
                coletas e workspace empresarial já estão integrados ao backend Django.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border-l-4 border-blue-500 bg-blue-50 p-6">
          <div className="flex items-start gap-3">
            <Database className="h-6 w-6 text-blue-600" />
            <div>
              <h4 className="font-semibold text-blue-900">Fase 2: Persistência Completa</h4>
              <p className="mt-2 text-sm text-blue-800">
                <strong>Status:</strong> Próximo Passo<br />
                Migrar impacto ambiental, notificações, pontos de coleta, uploads e relatórios
                para endpoints persistidos na API, mantendo as regras de acesso por perfil.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border-l-4 border-green-500 bg-green-50 p-6">
          <div className="flex items-start gap-3">
            <Database className="h-6 w-6 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-900">Fase 3: Produção e Expansão</h4>
              <p className="mt-2 text-sm text-green-800">
                <strong>Status:</strong> Futuro<br />
                Deploy com variáveis seguras, HTTPS, banco gerenciado, monitoramento, analytics,
                gamificação expandida, IA e integrações com órgãos públicos ou cooperativas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Stack */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-[#1a4d2e]">Stack Tecnológica</h3>
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3">
          {[
            { name: 'React', desc: 'UI Library' },
            { name: 'TypeScript', desc: 'Type Safety' },
            { name: 'Tailwind CSS', desc: 'Styling' },
            { name: 'Django', desc: 'API Backend' },
            { name: 'React Router', desc: 'Navigation' },
            { name: 'Recharts', desc: 'Charts' },
            { name: 'SQLite', desc: 'Local DB' },
            { name: 'PostgreSQL', desc: 'Database' },
            { name: 'Vite', desc: 'Build Tool' }
          ].map((tech, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#4caf50]/10">
                <GitBranch className="h-6 w-6 text-[#4caf50]" />
              </div>
              <p className="mt-2 font-semibold">{tech.name}</p>
              <p className="text-xs text-muted-foreground">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Connection Info */}
      <div className="rounded-xl border bg-gradient-to-r from-[#4caf50]/10 to-[#81c784]/10 p-6">
        <h3 className="font-semibold text-[#1a4d2e]">📋 Documentação Técnica</h3>
        <div className="mt-4 space-y-2 text-sm">
          <p>
            <strong>1.</strong> Use o README como porta de entrada do projeto
          </p>
          <p>
            <strong>2.</strong> Consulte docs/arquitetura.md para a visão completa
          </p>
          <p>
            <strong>3.</strong> Consulte docs/api.md para endpoints e payloads
          </p>
          <p>
            <strong>4.</strong> Consulte SUPABASE_INTEGRATION.md para usar Supabase como banco PostgreSQL
          </p>
          <p className="mt-4 italic text-muted-foreground">
            Nota: alguns módulos visuais ainda usam mock local, mas os fluxos principais já passam
            pela API Django e pelo banco configurado no ambiente.
          </p>
        </div>
      </div>
    </div>
  );
}
