import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Users,
  Clock,
  BadgeDollarSign,
  Gift,
  UserPlus,
  GraduationCap,
  BarChart,
  Heart,
  BadgePercent,
  MessageSquare,
  FileBarChart,
  Shield,
  ExternalLink,
  BookOpen,
  ArrowRight,
} from "lucide-react";

// Componente que exibe cada módulo do sistema RH
interface ModuleSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  differential: string;
  integrations: { module: string; description: string }[];
  image?: string;
}

const ModuleSection: React.FC<ModuleSectionProps> = ({
  title,
  description,
  icon,
  features,
  differential,
  integrations,
  image,
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Funcionalidades Principais</h4>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Diferencial FOUR</h4>
          <div className="bg-primary/5 p-3 rounded-md">
            <p>{differential}</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Integrações</h4>
          <div className="space-y-2">
            {integrations.map((integration, index) => (
              <div key={index} className="flex items-start border-b pb-2 last:border-0">
                <Badge variant="outline" className="mr-2">
                  {integration.module}
                </Badge>
                <p className="text-sm">{integration.description}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const HRModuleDocumentation: React.FC = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Módulo de Recursos Humanos</h1>
        <p className="text-muted-foreground mt-2">
          O ERP FOUR oferece uma solução completa de Recursos Humanos adaptada às necessidades das empresas angolanas, 
          seguindo as regulamentações locais e otimizando processos essenciais.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-8">
          <Card className="bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Segurança de Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Proteção de dados pessoais em conformidade com as leis de proteção de dados de Angola, 
                com criptografia e controle de acesso granular.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Personalização</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Módulos e formulários adaptáveis às necessidades específicas de empresas angolanas, 
                suportando diferentes setores e estruturas organizacionais.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Suporte Local</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Suporte técnico no fuso horário de Angola (UTC+1), com equipe especializada 
                em legislação local e necessidades específicas do mercado angolano.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="employees" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-auto">
          <TabsTrigger value="employees" className="flex flex-col py-2 h-auto">
            <Users className="h-4 w-4 mb-1" />
            <span className="text-xs">Cadastro</span>
          </TabsTrigger>
          <TabsTrigger value="attendance" className="flex flex-col py-2 h-auto">
            <Clock className="h-4 w-4 mb-1" />
            <span className="text-xs">Ponto</span>
          </TabsTrigger>
          <TabsTrigger value="payroll" className="flex flex-col py-2 h-auto">
            <BadgeDollarSign className="h-4 w-4 mb-1" />
            <span className="text-xs">Folha</span>
          </TabsTrigger>
          <TabsTrigger value="benefits" className="flex flex-col py-2 h-auto">
            <Gift className="h-4 w-4 mb-1" />
            <span className="text-xs">Benefícios</span>
          </TabsTrigger>
          <TabsTrigger value="recruitment" className="flex flex-col py-2 h-auto">
            <UserPlus className="h-4 w-4 mb-1" />
            <span className="text-xs">Recrutamento</span>
          </TabsTrigger>
          <TabsTrigger value="training" className="flex flex-col py-2 h-auto">
            <GraduationCap className="h-4 w-4 mb-1" />
            <span className="text-xs">Treinamento</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex flex-col py-2 h-auto">
            <BarChart className="h-4 w-4 mb-1" />
            <span className="text-xs">Desempenho</span>
          </TabsTrigger>
          <TabsTrigger value="health" className="flex flex-col py-2 h-auto">
            <Heart className="h-4 w-4 mb-1" />
            <span className="text-xs">Saúde</span>
          </TabsTrigger>
          <TabsTrigger value="positions" className="flex flex-col py-2 h-auto">
            <BadgePercent className="h-4 w-4 mb-1" />
            <span className="text-xs">Cargos</span>
          </TabsTrigger>
          <TabsTrigger value="portal" className="flex flex-col py-2 h-auto">
            <MessageSquare className="h-4 w-4 mb-1" />
            <span className="text-xs">Portal</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex flex-col py-2 h-auto">
            <FileBarChart className="h-4 w-4 mb-1" />
            <span className="text-xs">Relatórios</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex flex-col py-2 h-auto">
            <Shield className="h-4 w-4 mb-1" />
            <span className="text-xs">Compliance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="employees">
          <ModuleSection
            title="Gestão de Cadastro de Colaboradores"
            description="Base de dados centralizada para todas as informações de colaboradores, com suporte aos documentos específicos de Angola."
            icon={<Users className="h-6 w-6 text-primary" />}
            features={[
              "Registro completo de dados pessoais incluindo BI angolano, NIF e outros documentos locais",
              "Histórico profissional com controle de promoções, transferências e alterações salariais",
              "Gestão de documentação digital (contratos, certificados, atestados médicos)",
              "Controle de vencimento de documentos com alertas automáticos",
              "Organograma interativo da empresa com visualização hierárquica",
              "Sistema de notificações para documentos a vencer (BI, passaporte, visto de trabalho para estrangeiros)",
            ]}
            differential="Digitalização inteligente de documentos com reconhecimento de BI e NIF angolanos, reduzindo erros de digitação e automatizando a extração de dados com validação em tempo real."
            integrations={[
              {
                module: "Financeiro",
                description: "Integração com contas a pagar para processamento de reembolsos e adiantamentos",
              },
              {
                module: "Folha de Pagamento",
                description: "Sincronização automática de dados cadastrais para cálculos corretos de impostos e benefícios",
              },
              {
                module: "Conformidade",
                description: "Verificação de documentação obrigatória segundo a Lei Geral do Trabalho de Angola (Lei nº 7/15)",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="attendance">
          <ModuleSection
            title="Controle de Ponto e Jornada de Trabalho"
            description="Gestão completa da jornada de trabalho em conformidade com a Lei Geral do Trabalho de Angola (Lei nº 7/15)."
            icon={<Clock className="h-6 w-6 text-primary" />}
            features={[
              "Registro de ponto via biometria, cartão RFID, aplicativo mobile ou web",
              "Controle de escalas e turnos adaptados ao mercado angolano (incluindo turnos especiais para setores como petróleo e mineração)",
              "Gestão de banco de horas conforme regulamentações locais",
              "Controle de horas extras com cálculos automáticos baseados na legislação angolana",
              "Integração com dispositivos de controle de acesso físico",
              "Mapa de ausências e atrasos com indicadores de departamento",
              "Geolocalização para registro de ponto remoto (especialmente útil para setores como construção e mineração)",
            ]}
            differential="Algoritmo de previsão de horas extras baseado em inteligência artificial, que antecipa necessidades de recursos humanos e auxilia na programação de escalas, reduzindo custos com horas extras desnecessárias em até 30%."
            integrations={[
              {
                module: "Folha de Pagamento",
                description: "Cálculo automático de horas extras, adicional noturno e faltas para processamento salarial",
              },
              {
                module: "Gestor de Projetos",
                description: "Alocação de horas trabalhadas em projetos específicos para análise de custos",
              },
              {
                module: "Dashboard Gerencial",
                description: "Indicadores de absenteísmo, pontualidade e custo de horas extras por departamento",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="payroll">
          <ModuleSection
            title="Folha de Pagamento"
            description="Processamento da folha de pagamento em Kwanza (AOA), com todos os impostos e encargos específicos de Angola."
            icon={<BadgeDollarSign className="h-6 w-6 text-primary" />}
            features={[
              "Cálculos automáticos de salários, impostos e benefícios em Kwanza (AOA)",
              "Implementação do IRT (Imposto sobre Rendimento do Trabalho) com as faixas atualizadas",
              "Gestão de contribuições para a Segurança Social de Angola (3% empregado, 8% empregador)",
              "Recibos de salário digitais em conformidade com a legislação angolana",
              "Provisão automática para 13º salário e férias conforme a Lei Geral do Trabalho",
              "Relatórios específicos para declarações fiscais angolanas",
              "Suporte a pagamentos via transferência bancária para os principais bancos angolanos (BFA, BAI, BIC, etc.)",
            ]}
            differential="Sistema de auditoria preventiva que verifica inconsistências antes do fechamento da folha, reduzindo erros em até 98% e oferecendo comparativos automáticos com períodos anteriores para identificar variações significativas."
            integrations={[
              {
                module: "Contabilidade",
                description: "Geração automática de lançamentos contábeis relacionados à folha de pagamento",
              },
              {
                module: "Financeiro",
                description: "Programação de pagamentos e integração com bancos angolanos para transferências",
              },
              {
                module: "Fiscal",
                description: "Geração de relatórios para declarações fiscais e previdenciárias",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="benefits">
          <ModuleSection
            title="Gestão de Benefícios"
            description="Administração completa de benefícios comuns no mercado angolano, como transporte, alimentação e planos de saúde."
            icon={<Gift className="h-6 w-6 text-primary" />}
            features={[
              "Gestão de subsídio de transporte (comum em Angola para colaboradores)",
              "Controle de subsídio de alimentação e cestas básicas",
              "Administração de planos de saúde privados (comum para executivos em Angola)",
              "Gestão de seguros de vida e acidentes de trabalho",
              "Controle de benefícios como telefonia móvel corporativa e combustível",
              "Políticas de empréstimos a funcionários com controle de parcelas",
              "Gestão de benefícios flexíveis adaptados à realidade angolana",
            ]}
            differential="Plataforma de benefícios flexíveis que permite aos colaboradores escolherem entre diferentes opções dentro de um orçamento pré-definido, com simulador de impacto no salário líquido, aumentando a satisfação dos funcionários em até 40%."
            integrations={[
              {
                module: "Folha de Pagamento",
                description: "Cálculo automático do impacto dos benefícios na remuneração e impostos",
              },
              {
                module: "Contabilidade",
                description: "Contabilização de benefícios conforme plano de contas angolano",
              },
              {
                module: "Portal do Colaborador",
                description: "Interface para seleção e acompanhamento de benefícios pelo próprio funcionário",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="recruitment">
          <ModuleSection
            title="Recrutamento e Seleção"
            description="Ferramentas completas para recrutamento, seleção e onboarding adaptadas ao mercado de trabalho angolano."
            icon={<UserPlus className="h-6 w-6 text-primary" />}
            features={[
              "Portal de vagas integrado ao site da empresa e plataformas de emprego angolanas",
              "Gestão do processo seletivo com controle de etapas e candidatos",
              "Triagem de currículos com filtros personalizáveis",
              "Agendamento de entrevistas presenciais ou online",
              "Aplicação de testes técnicos e comportamentais",
              "Processo de onboarding estruturado com checklist de documentação angolana",
              "Análise de conformidade com leis de contratação locais",
              "Geração automática de contratos seguindo a legislação trabalhista angolana",
            ]}
            differential="Sistema de recrutamento com IA que identifica candidatos locais ideais com base em análise preditiva de sucesso na função, considerando experiências anteriores em setores relevantes para a economia angolana (petróleo, mineração, telecomunicações, etc.)."
            integrations={[
              {
                module: "Cadastro de Colaboradores",
                description: "Aproveitamento dos dados do processo seletivo para cadastro inicial do colaborador",
              },
              {
                module: "Treinamento",
                description: "Identificação de necessidades de capacitação durante o processo seletivo",
              },
              {
                module: "Portal Corporativo",
                description: "Publicação automática de vagas no site da empresa e intranet para recrutamento interno",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="training">
          <ModuleSection
            title="Treinamento e Desenvolvimento"
            description="Plataforma completa para gestão de capacitações focada no desenvolvimento de profissionais angolanos."
            icon={<GraduationCap className="h-6 w-6 text-primary" />}
            features={[
              "Levantamento de necessidades de treinamento (LNT) estruturado",
              "Catálogo de cursos com opções presenciais e online",
              "Controle de orçamento de treinamento por departamento",
              "Ambiente de aprendizado virtual (EAD) com conteúdos em português",
              "Gestão de certificações e validades",
              "Avaliação de eficácia dos treinamentos",
              "Controle de instrutores internos e externos",
              "Integração com programas de angolanização (desenvolvimento de talentos locais)",
            ]}
            differential="Plano de desenvolvimento automatizado que mapeia competências existentes e necessárias, gerando trilhas de aprendizagem personalizadas para cada colaborador angolano, com ênfase em habilidades estratégicas para o crescimento econômico local."
            integrations={[
              {
                module: "Avaliação de Desempenho",
                description: "Identificação de gaps de competências para planos de desenvolvimento",
              },
              {
                module: "Financeiro",
                description: "Gestão de orçamento para treinamentos e controle de custos em Kwanza",
              },
              {
                module: "Recrutamento",
                description: "Alinhamento entre competências buscadas e programas de desenvolvimento interno",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="performance">
          <ModuleSection
            title="Avaliação de Desempenho"
            description="Sistema completo de gestão de desempenho com métricas e indicadores adaptados ao contexto empresarial angolano."
            icon={<BarChart className="h-6 w-6 text-primary" />}
            features={[
              "Configuração flexível de ciclos de avaliação (trimestral, semestral, anual)",
              "Definição de metas individuais e de equipe alinhadas aos objetivos estratégicos",
              "Avaliações por competências com pesos personalizáveis",
              "Feedback contínuo com registro de ocorrências positivas e pontos de melhoria",
              "Avaliação 360° com participação de gestores, pares e subordinados",
              "Planos de desenvolvimento individual (PDI) baseados nos resultados",
              "Painéis gerenciais com indicadores de desempenho por departamento e função",
            ]}
            differential="Sistema de calibração de avaliações que utiliza inteligência artificial para identificar inconsistências e vieses nos processos avaliativos, garantindo maior justiça e objetividade, com recomendações personalizadas para desenvolvimento profissional alinhadas ao mercado angolano."
            integrations={[
              {
                module: "Treinamento",
                description: "Direcionamento automático para capacitações baseadas em gaps identificados",
              },
              {
                module: "Cargos e Salários",
                description: "Subsídios para promoções e ajustes salariais baseados em meritocracia",
              },
              {
                module: "Recrutamento Interno",
                description: "Identificação de talentos para novas oportunidades dentro da organização",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="health">
          <ModuleSection
            title="Saúde e Segurança do Trabalho"
            description="Gerenciamento completo das atividades de saúde ocupacional e segurança do trabalho segundo normas angolanas."
            icon={<Heart className="h-6 w-6 text-primary" />}
            features={[
              "Controle de exames médicos ocupacionais conforme legislação angolana",
              "Gestão de EPIs (Equipamentos de Proteção Individual) com controle de entregas",
              "Registro e investigação de acidentes de trabalho",
              "Controle de CATs (Comunicações de Acidentes de Trabalho)",
              "Gestão de programas de saúde como PCMSO adaptados à realidade local",
              "Inspeções de segurança com checklists personalizáveis",
              "Controle de vacinações e campanhas de saúde",
              "Gestão de riscos ocupacionais específicos para setores relevantes em Angola (petróleo, mineração, construção)",
            ]}
            differential="Sistema de prevenção preditiva que utiliza dados históricos e fatores de risco para antecipar potenciais problemas de saúde e segurança, especialmente em setores de alto risco como petróleo e gás, mineração e construção civil, reduzindo acidentes em até 45%."
            integrations={[
              {
                module: "Gestão de Jornada",
                description: "Monitoramento de pausas obrigatórias e limites de horas trabalhadas em funções de risco",
              },
              {
                module: "Compras",
                description: "Solicitação automática de reposição de EPIs e materiais de segurança",
              },
              {
                module: "Jurídico",
                description: "Gestão de conformidade com normas de segurança angolanas e internacionais",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="positions">
          <ModuleSection
            title="Gestão de Cargos e Salários"
            description="Administração de estruturas salariais em Kwanza (AOA) e planos de carreira adaptados ao mercado angolano."
            icon={<BadgePercent className="h-6 w-6 text-primary" />}
            features={[
              "Estrutura de cargos e funções organizadas em carreiras",
              "Tabelas salariais em Kwanza com múltiplas faixas e steps",
              "Pesquisas salariais com benchmarks do mercado angolano",
              "Simuladores de impacto orçamentário para reajustes",
              "Gestão de promoções verticais (mudança de cargo) e horizontais (progressão na faixa)",
              "Controle de equiparação salarial para funções equivalentes",
              "Definição de requisitos e competências por cargo",
              "Planos de sucessão para posições-chave",
            ]}
            differential="Modelagem preditiva de carreira que projeta cenários de evolução profissional para cada colaborador, com simulações financeiras em longo prazo e recomendações de desenvolvimento específicas para o mercado angolano, considerando tendências econômicas locais."
            integrations={[
              {
                module: "Avaliação de Desempenho",
                description: "Critérios objetivos para promoções baseados em resultados",
              },
              {
                module: "Orçamento",
                description: "Projeções de custos com pessoal para planejamento financeiro",
              },
              {
                module: "Recrutamento",
                description: "Definição clara de requisitos e faixas salariais para novas contratações",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="portal">
          <ModuleSection
            title="Portal do Colaborador"
            description="Plataforma de autoatendimento acessível via web e aplicativo móvel em português, adaptada às necessidades dos colaboradores angolanos."
            icon={<MessageSquare className="h-6 w-6 text-primary" />}
            features={[
              "Acesso a contracheques e informe de rendimentos",
              "Solicitações de férias, licenças e benefícios",
              "Atualização de dados cadastrais e documentos",
              "Consulta a banco de horas e escalas de trabalho",
              "Espaço para feedback e comunicação com RH",
              "Divulgação de vagas internas e oportunidades de carreira",
              "Acesso a treinamentos online e certificados",
              "Agendamento de consultas ocupacionais",
            ]}
            differential="Portal responsivo com baixo consumo de dados, otimizado para redes móveis angolanas e com possibilidade de acesso offline a documentos essenciais, considerando as limitações de conexão em certas regiões do país."
            integrations={[
              {
                module: "Todos os Submódulos de RH",
                description: "Interface unificada para acesso às diversas funcionalidades do sistema",
              },
              {
                module: "Comunicação Interna",
                description: "Divulgação de notícias e comunicados importantes da empresa",
              },
              {
                module: "Gestão de Documentos",
                description: "Repositório de normas, procedimentos e documentos institucionais",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="reports">
          <ModuleSection
            title="Relatórios e Análises Estratégicas"
            description="Conjunto abrangente de relatórios e dashboards para suporte à tomada de decisão no contexto empresarial angolano."
            icon={<FileBarChart className="h-6 w-6 text-primary" />}
            features={[
              "Dashboard de indicadores-chave de RH (turnover, absenteísmo, headcount)",
              "Relatórios de custos com pessoal por centro de custo",
              "Análises de massa salarial e projeções orçamentárias",
              "Relatórios de produtividade e eficiência operacional",
              "Comparativos de performance entre departamentos e unidades",
              "Relatórios de conformidade legal e auditoria",
              "Análises de tendências e sazonalidades em indicadores de RH",
              "Exportação de dados em diversos formatos (PDF, Excel, CSV)",
            ]}
            differential="Analytics avançado com inteligência artificial que identifica padrões ocultos nos dados de RH, gerando insights estratégicos específicos para o mercado angolano, como fatores de retenção de talentos locais e correlações entre investimentos em treinamento e produtividade."
            integrations={[
              {
                module: "BI Corporativo",
                description: "Alimentação de indicadores de RH para dashboards executivos",
              },
              {
                module: "Planejamento Estratégico",
                description: "Subsídios para definição de metas e objetivos organizacionais",
              },
              {
                module: "Financeiro",
                description: "Análises de impacto de custos com pessoal nos resultados da empresa",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="compliance">
          <ModuleSection
            title="Conformidade Legal"
            description="Gestão completa da conformidade com a legislação trabalhista angolana e proteção de dados pessoais."
            icon={<Shield className="h-6 w-6 text-primary" />}
            features={[
              "Atualização constante da base legal com as normas trabalhistas de Angola",
              "Alertas automáticos para obrigações legais e prazos",
              "Controle de documentos obrigatórios por tipo de contrato",
              "Gestão de processos trabalhistas e administrativos",
              "Conformidade com a Lei Geral do Trabalho (Lei nº 7/15) e suas atualizações",
              "Proteção de dados pessoais conforme regulamentações angolanas",
              "Gestão de vistos de trabalho para estrangeiros",
              "Relatórios para órgãos fiscalizadores",
            ]}
            differential="Sistema de jurimetria que analisa decisões trabalhistas em Angola para identificar riscos potenciais e recomendar ações preventivas, reduzindo exposição a multas e contingências em até 60%, com atualizações automáticas quando há mudanças na legislação."
            integrations={[
              {
                module: "Jurídico",
                description: "Gerenciamento de processos e consultas relacionadas a questões trabalhistas",
              },
              {
                module: "Governança Corporativa",
                description: "Controles internos para garantir conformidade com normas e regulamentos",
              },
              {
                module: "Fiscal",
                description: "Alinhamento de práticas trabalhistas com obrigações fiscais",
              },
            ]}
          />
        </TabsContent>
      </Tabs>

      <Separator className="my-6" />

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Caso de Uso: Implementação na Empresa ABC Angola</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-4">
              A ABC Angola, uma empresa de médio porte do setor de serviços com sede em Luanda e 
              operações em Benguela e Huambo, implementou o módulo RH do ERP FOUR para centralizar 
              e otimizar seus processos de gestão de pessoas.
            </p>

            <h3 className="text-lg font-medium mb-2">Desafios Anteriores:</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex items-start">
                <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                <span>Controle manual de ponto gerando inconsistências frequentes no cálculo de horas extras</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                <span>Dificuldades no cálculo do IRT (Imposto sobre Rendimentos do Trabalho) e frequentes refazimentos da folha</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                <span>Processos de recrutamento descentralizados e sem padronização</span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                <span>Dificuldade em manter a conformidade com as frequentes atualizações da legislação trabalhista angolana</span>
              </li>
            </ul>

            <h3 className="text-lg font-medium mb-2">Resultados após Implementação:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="border rounded-md p-3">
                <h4 className="font-medium text-primary">Redução de Custos</h4>
                <p className="text-sm">Diminuição de 22% nos custos operacionais de RH através da automação de processos e redução de horas extras desnecessárias.</p>
              </div>
              <div className="border rounded-md p-3">
                <h4 className="font-medium text-primary">Aumento de Produtividade</h4>
                <p className="text-sm">Ganho de 15 dias/homem por mês com a eliminação de tarefas manuais e retrabalho na folha de pagamento.</p>
              </div>
              <div className="border rounded-md p-3">
                <h4 className="font-medium text-primary">Conformidade Legal</h4>
                <p className="text-sm">Eliminação de multas por não conformidade com a Lei Geral do Trabalho de Angola e redução do risco trabalhista.</p>
              </div>
              <div className="border rounded-md p-3">
                <h4 className="font-medium text-primary">Retenção de Talentos</h4>
                <p className="text-sm">Redução de 35% na rotatividade de pessoal através de avaliações estruturadas e planos de desenvolvimento.</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground italic">
              "O FOUR transformou nossa gestão de pessoas, proporcionando controle e visibilidade 
              que nunca tivemos antes. Especialmente o módulo de folha de pagamento, que agora 
              calcula automaticamente o IRT conforme as faixas atualizadas, nos economiza horas 
              de trabalho todos os meses e eliminou erros que geravam insatisfação nos colaboradores."
            </p>
            <p className="text-sm font-medium mt-1">— Maria Joaquina, Diretora de RH da ABC Angola</p>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <Button size="lg" className="gap-2">
            <BookOpen className="h-5 w-5" />
            Solicitar uma Demonstração
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HRModuleDocumentation; 