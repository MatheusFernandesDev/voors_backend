# voors_backend

Projeto Voors: Este é o backend do projeto que consiste em criar uma API, que seja possível montar, pedir, e personalizar um pedido de pizza com Node e+ TYPESCRIPT

## Tecnologias Utilizadas

- Node
- TypeScript
- Sequelize-Typescript
- Docker
- PostgreSQL

## Pré-requisitos

- Docker e Node instalado em sua máquina (versão 18.19.1 ou superior recomendada)

## Configuração e Execução

### Clonando o Repositório

```bash
git clone https://github.com/MatheusFernandesDev/voors_backend
```

### 2. Navegue até o Diretório do Projeto

```bash
cd voors_backend
```

### 3. Configure as Variáveis de Ambiente

Copie o arquivo .env.development para criar seu arquivo de variáveis de ambiente:

```bash
.env.example -> .env
```

Edite o arquivo .env para adicionar suas variáveis de ambiente:

```bash
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
```

### 4. Construa e Execute a Aplicação com Docker

Utilize o comando abaixo para construir a imagem Docker e iniciar os containers:

```bash
docker-compose up --build
```

## Migração

As migrations serão rodadas autocamentimente com docker.

Para executar migrações, execute:

yarn migrate:run

### 5. Acesse a Aplicação

A API estará disponível em http://localhost:5001

### 5. Descrição das Rotas

### USE O INSOMMIA

### PARA LISTAR TAMANHOS

Rota: GET /sizes
Descrição: Retorna uma lista de todos os tamanhos disponíveis.

### PARA LISTAR SABORES

Rota: GET /flavors
Descrição: Retorna uma lista de todos os sabores disponíveis.

### PARA LISTAR PERSONALIZAÇÕES

Rota: GET /customizations
Descrição: Retorna uma lista de todas as personalizações disponíveis.

### PARA LISTAR PEDIDOS

Rota: GET /orders
Descrição: Retorna uma lista de todos os pedidos realizados.

### PARA CRIAR UM NOVO PEDIDO

Rota: POST /order
Descrição: Cria um novo pedido.

## ORIENTAÇÕES GERAIS

### Testes back-end:

Para candidatos a vaga de desenvolvedor back-end (typescript + node), será avaliado a sua capacidade de criar uma solução Rest ou Graphql, sem necessidade de desenvolver o front da aplicação.  
_Desejáveis:_ documentação da API, testes automatizados, uso de docker.

---

## REQUISITOS

### Requisito: Montar pizza

**Estória:**  
Sendo um cliente do sistema da pizzaria , eu quero montar uma pizza ideal de acordo com o meu gosto, com objetivo de saciar a minha fome em um bom tempo de preparo e que caiba no meu bolso.

**Comportamento:**

#### Entrada de dados

1. Para conseguir montar a pizza ideal, o cliente deve primeiramente fazer a escolha do tamanho da pizza e em seguida do seu sabor.

   | **Descrição** | **Tipo**                                      | **Obrigatoriedade** | **Objetivo**                                           |
   | ------------- | --------------------------------------------- | ------------------- | ------------------------------------------------------ |
   | Tamanho       | Seleção (pequena, média ou grande)            | Sim                 | Definir o tempo de preparo e preço da pizza.           |
   | Sabor         | Seleção (calabresa, marguerita ou portuguesa) | Sim                 | Escolher o sabor e saber o tempo adicional de preparo. |

#### Processamento de dados

1. O cliente deve ser capaz de escolher uma das opções dadas de tamanho. Cada uma destas opções possui um preço único e um tempo de preparo específico.
   - pequena: a pizza pequena tem o valor de R$ 20,20 e um tempo de preparo de 15 minutos.
   - média: a pizza média tem o valor de R$ 30,30 e um tempo de preparo de 20 minutos.
   - grande: a pizza grande tem o valor de R$ 40,00 e um tempo de preparo de 25 minutos.
2. O cliente, após escolha do tamanho, deve selecionar o sabor de sua pizza.
   - calabresa ou marguerita: as pizzas não possuem comportamento específico.
   - portuguesa: a pizza de portuguesa tem um adicional de 5 minutos no seu tempo de preparo.
3. Ao selecionar os dois valores, o cliente está apto a avançar de passo, conseguindo escolher os adicionais de sua pizza.

#### Saída de dados

1. Após a escolha do tamanho e do sabor, o sistema deve armazenar o tempo de preparo, o valor final do pedido e os detalhes do produto.

**Critérios de aceitação:**

1. Só deve ser possível a escolha de uma pizza ou mais para o pedido.
2. Não deve ser possível a escolha de meia pizza.

### Requisito: Personalizar pizza

**Estória:**  
Sendo um cliente do sistema da pizzaria Voors, eu quero personalizar a minha pizza. O objetivo da personalização é tornar a minha pizza única.

**Comportamento:**

#### Entrada de dados

1. Para conseguir personalizar a pizza, o cliente deve escolher os adicionais que serão usados como observações no preparo da pizza.

   | **Descrição**  | **Tipo**                                            | **Obrigatoriedade** | **Objetivo**                                       |
   | -------------- | --------------------------------------------------- | ------------------- | -------------------------------------------------- |
   | Personalização | Seleção (Extra bacon, sem cebola ou borda recheada) | Não                 | Personalizar a pizza, alterando o modo de preparo. |

#### Processamento de dados

1. O cliente deve ser capaz de escolher uma ou mais porém não deve repetir das opções de personalização. Cada uma destas opções pode possuir um preço único e um tempo de preparo específico.
   - extra bacon: a personalização de extra bacon deve ter um valor adicional de R$ 3,00.
   - sem cebola: a pizza sem cebola não possui comportamento específico.
   - borda recheada: a borda recheada deve ter um valor adicional de R$ 5,00 e um tempo adicional de preparo de 5 minutos.
2. Sendo uma personalização não obrigatória, o cliente pode avançar para a finalização do pedido.

#### Saída de dados

1. O sistema deve salvar todas as personalizações escolhidas ao pedido, bem como qualquer adicional de preço ou tempo de preparo.

**Critérios de aceitação:**

1. É possível criar uma pizza sem personalização.
2. É possível criar uma pizza com mais de uma personalização.
3. Os valores e tempos adicionais devem ser somados no total do pedido.

### Requisito: Montar pedido

**Estória:**  
Sendo um cliente do sistema da pizzaria Voors, eu quero visualizar os detalhes do meu pedido e saber o preço final e o tempo de preparo. O objetivo é saber o quanto irei gastar e em quanto tempo a(s) pizza(s) ficará(am) pronta(s).

**Comportamento:**

#### Entrada de dados

1. Para visualização dos detalhes do pedido, devem ser exibidas as seguintes informações:

   | **Descrição**    | **Tipo**         | **Obrigatoriedade** | **Objetivo**                         |
   | ---------------- | ---------------- | ------------------- | ------------------------------------ |
   | Tamanho          | Texto            | Sim                 | Saber o tamanho selecionado.         |
   | Sabor            | Texto            | Sim                 | Saber o sabor selecionado.           |
   | Personalizações  | Texto            | Não                 | Saber as personalizações escolhidas. |
   | Valor total      | Valor financeiro | Sim                 | Saber o total a ser pago.            |
   | Tempo de preparo | Tempo em minutos | Sim                 | Saber o tempo total de preparo.      |

#### Processamento de dados

1. Devem ser somados os valores referentes ao tamanho da pizza(s) escolhida(s) e dos adicionais, caso selecionados ao campo de “valor total”.
2. Devem ser somados os valores referentes ao tamanho da(s) pizza(s), sabor e personalizações, caso haja, no campo “tempo de preparo”.

#### Saída de dados

1. Apresentar ao cliente o resumo do pedido, listando o tamanho e sabor da pizza escolhida, juntamente com o preço deste item.
2. Apresentar ao cliente a lista de personalização, exibindo o que foi selecionado e seu valor, individualmente.
3. Apresentar o valor total do pedido e seu tempo de preparo.

**Critérios de aceitação:**

1. Todos os valores devem ser discriminados no resumo do pedido.
2. Somente exibir o tempo total de preparo no resumo do pedido.
