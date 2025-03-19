# Módulo de Recursos Humanos - ERPFOUR

Este módulo fornece uma solução completa para gestão de recursos humanos, incluindo gestão de funcionários, folha de pagamento, licenças/férias, avaliações de desempenho e relatórios.

## Funcionalidades

### Gestão de Funcionários
- Cadastro completo de funcionários com informações pessoais e profissionais
- Gestão de contratos e documentos
- Visualização de histórico de funcionários
- Importação e exportação de dados

### Folha de Pagamento
- Cálculo automático de folha de pagamento com base nas leis angolanas
- Suporte a diferentes tipos de remuneração e benefícios
- Cálculo de impostos (IRT) e contribuições sociais
- Geração de relatórios e recibos de pagamento

### Licenças e Férias
- Solicitação e aprovação de férias e licenças
- Calendário de ausências
- Controle de saldo de férias
- Diferentes tipos de licença (férias, médica, maternidade, etc.)

### Avaliação de Desempenho
- Criação de ciclos de avaliação
- Formulários personalizáveis
- Histórico de avaliações
- Relatórios de desempenho

### Relatórios
- Relatórios de folha de pagamento
- Relatórios de presença e ausência
- Relatórios de custos de pessoal
- Exportação em diferentes formatos (PDF, Excel)

## Configuração do Banco de Dados

O módulo utiliza o Supabase como banco de dados. Para configurar o banco de dados, siga os passos abaixo:

1. Crie um projeto no Supabase (https://supabase.com)
2. Obtenha as credenciais de acesso (URL e chave anônima)
3. Configure as variáveis de ambiente no arquivo `.env`:
   ```
   VITE_SUPABASE_URL=sua_url_do_supabase
   VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
   ```
4. Execute o script SQL para criar as tabelas necessárias:
   - Acesse o Editor SQL no painel do Supabase
   - Cole o conteúdo do arquivo `sql/hr_tables.sql`
   - Execute o script

## Estrutura de Arquivos

```
src/
├── components/
│   └── hr/
│       ├── dashboard/         # Componentes do dashboard de RH
│       ├── employee/          # Gestão de funcionários
│       ├── payroll/           # Processamento de folha de pagamento
│       ├── leave/             # Gestão de licenças e férias
│       ├── performance/       # Avaliação de desempenho
│       ├── reporting/         # Relatórios
│       ├── HRHeader.tsx       # Cabeçalho do módulo
│       ├── HRSidebar.tsx      # Barra lateral do módulo
│       └── HRModule.tsx       # Componente principal do módulo
├── types/
│   └── hr.types.ts            # Tipos e interfaces para o módulo de RH
└── lib/
    ├── supabase.ts            # Configuração do Supabase
    └── currency.ts            # Funções para formatação de moeda
```

## Cálculos de Folha de Pagamento

O módulo implementa os seguintes cálculos para a folha de pagamento:

### Imposto de Rendimento do Trabalho (IRT)
Implementa a tabela progressiva de IRT conforme a legislação angolana:
- Até 70.000 Kz: Isento
- De 70.001 a 100.000 Kz: 10%
- De 100.001 a 150.000 Kz: 13%
- De 150.001 a 200.000 Kz: 16%
- De 200.001 a 300.000 Kz: 18%
- De 300.001 a 500.000 Kz: 19%
- De 500.001 a 1.000.000 Kz: 20%
- De 1.000.001 a 1.500.000 Kz: 21%
- De 1.500.001 a 2.000.000 Kz: 22%
- De 2.000.001 a 2.500.000 Kz: 23%
- De 2.500.001 a 5.000.000 Kz: 24%
- De 5.000.001 a 10.000.000 Kz: 25%
- Acima de 10.000.000 Kz: 25%

### Seguridade Social
- Contribuição do trabalhador: 3% do salário bruto
- Contribuição do empregador: 8% do salário bruto

### Horas Extras
- Cálculo baseado no salário-hora (salário mensal ÷ 176 horas)
- Taxa padrão: 1,5x para horas extras normais
- Taxas personalizáveis por funcionário

## Uso do Módulo

### Gestão de Funcionários
1. Acesse a aba "Funcionários"
2. Utilize o botão "Adicionar Funcionário" para cadastrar novos funcionários
3. Clique em um funcionário na lista para ver seus detalhes
4. Utilize as opções de ação para editar ou excluir funcionários

### Processamento de Folha de Pagamento
1. Acesse a aba "Folha de Pagamento"
2. Selecione o período de pagamento
3. Verifique e ajuste os valores conforme necessário
4. Clique em "Calcular" para processar a folha
5. Revise os resultados e clique em "Salvar Folha" para finalizar

### Gestão de Licenças
1. Acesse a aba "Licenças"
2. Utilize o botão "Nova Solicitação" para criar uma solicitação de licença
3. Preencha os dados da solicitação e envie
4. Aprove ou rejeite solicitações pendentes na lista

### Avaliação de Desempenho
1. Acesse a aba "Desempenho"
2. Crie ciclos de avaliação na aba "Ciclos"
3. Utilize o botão "Nova Avaliação" para avaliar um funcionário
4. Preencha o formulário de avaliação e salve

## Contribuição

Para contribuir com o desenvolvimento deste módulo:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este módulo é parte do sistema ERPFOUR e está licenciado sob a licença MIT. 