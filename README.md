# FOUR - Empresa Management System

## Descrição do Projeto

FOUR é um sistema de gestão empresarial abrangente, desenvolvido com tecnologias modernas para proporcionar uma solução completa de gerenciamento organizacional.

## Módulos

- Recursos Humanos
  - Folha de Pagamento
  - Gestão de Tempo e Presença
  - Solicitações de Ausência
  - Avaliação de Desempenho

## Tecnologias Utilizadas

- **Frontend**
  - React.js (18.x)
  - TypeScript
  - Vite
  - Tailwind CSS
  - Radix UI
  - React Router
  - Shadcn UI

- **Backend**
  - (Planejado) Node.js
  - (Planejado) Express.js ou NestJS
  - (Planejado) PostgreSQL

## Funcionalidades

- Gerenciamento de Recursos Humanos
- Controle de Folha de Pagamento
- Registro de Ponto e Presença
- Solicitações de Férias e Ausências
- Avaliação de Desempenho

## Configuração do Projeto

### Pré-requisitos

- Node.js (v18+)
- npm ou yarn

### Instalação

1. Clone o repositório
   ```bash
   git clone https://github.com/ninjamacosso/FOUR.git
   cd FOUR
   ```

2. Instale as dependências
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento
   ```bash
   npm run dev
   ```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Compila o projeto para produção
- `npm run preview`: Pré-visualiza a build de produção
- `npm run test`: Executa os testes

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça um push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

- Desenvolvedor: @ninjamacosso
- Email: contato@four.com.br

## Roadmap

- [ ] Implementar módulo de RH completo
- [ ] Desenvolver backend
- [ ] Adicionar autenticação robusta
- [ ] Implementar testes unitários e de integração
- [ ] Criar documentação detalhada

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
