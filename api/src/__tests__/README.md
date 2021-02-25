# Testes Automatizados

Observaçoes sobre testes

Desenvolvimento orientado a teste (TDD)
A partir dos testes começa a desenvolver o projeto

Tipos de testes

- Testes unitários
  Não tem acesso a banco de dados e a apis externas

- Testes de integração
  Testa todo o fluxo do programa
  request -> routes -> controller -> repository -|
  response <- controller <- repository <---------|

- Ponta a Ponta (E2E)
  Testa a ação do usuário na aplicação, geralmente usado em aplicações frontend
