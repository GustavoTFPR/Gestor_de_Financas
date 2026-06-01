#  Gestor de Finanças Pessoais

## 1. Definição do Tema

- **Nome do Projeto:** Gestor de Finanças Pessoais  
- **Descrição:** A API permite que usuários organizem seus gastos e receitas pessoais, categorizando transações e acompanhando o saldo mensal.  

### Usuários

- **Usuário comum:** Permite cadastrar suas receitas e despesas, visualizar relatórios e saldo.  
- **Administrador (opcional):** Pode gerenciar usuários e verificar estatísticas gerais (em caso de multiusuário).  

---

## 2. Requisitos Funcionais (RF)

- **RF01:** O sistema deve permitir o cadastro de novos usuários.  
- **RF02:** O sistema deve permitir login e autenticação de usuários.  
- **RF03:** O sistema deve permitir o cadastro de receitas (ex: salário, vendas).  
- **RF04:** O sistema deve permitir o cadastro de despesas (ex: alimentação, transporte).  
- **RF05:** O sistema deve permitir a categorização de transações (alimentação, lazer, moradia etc.).  
- **RF06:** O sistema deve permitir a listagem de todas as transações do usuário logado.  
- **RF07:** O sistema deve calcular o saldo atual do usuário (receitas - despesas).  
- **RF08:** O sistema deve permitir exclusão e edição de transações.  
- **RF09:** O sistema deve gerar relatório mensal de gastos por categoria.  

---

## 3. Requisitos Não Funcionais (RNF)

- **RNF01:** A API deve ser desenvolvida em Node.js com TypeScript.  
- **RNF02:** O banco de dados pode ser PostgreSQL ou SQLite.  
- **RNF03:** As senhas devem ser armazenadas criptografadas.  
- **RNF04:** A autenticação deve ser feita via JWT.  
- **RNF05:** A API deve seguir o padrão RESTful.  
- **RNF06:** O sistema deve ter documentação das rotas com OpenAPI.  

---

## 4. Regras de Negócio (RN)

- **RN01:** O usuário só pode visualizar e gerenciar suas próprias transações.  
- **RN02:** O valor da transação deve ser maior que zero.  
- **RN03:** Cada transação deve obrigatoriamente pertencer a uma categoria.  
- **RN04:** O relatório mensal deve agrupar despesas por categoria e calcular totais.  
- **RN05:** O saldo nunca pode ser negativo em receitas (apenas em despesas).  
