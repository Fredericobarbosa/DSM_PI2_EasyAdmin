# EasyAdmin &copy;  ⚙️🕴🏻
---
## Descrição:
### O projeto EasyAdmin é um sistema web integrado para a gestão empresarial, no qual foi projetado para facilitar a gestão de vendas, produtos e finanças. 
---
## Tecnologias Utilizadas 🛠️:
### Frontend: HTML, CSS, JavaScript, frameworks de ícones Font Awesome e Vue.js.

### Backend: Node.js (framework Express ) e SQL Server para gerenciamento do banco de dados.

### <a href="https://azure.microsoft.com/pt-br/get-started/azure-portal">Microsoft Azure</a> para a hospedagem do banco de dados. 
---
## Imagens da aplicação:
### Tela inicial:
<img src="https://github.com/Fredericobarbosa/DSM_PI2_EasyAdmin/blob/main/Img_EasyAdmin/TelaInicial.PNG" alt="Tela incial"  width="95%">

### Tela de login:
<img src="https://github.com/Fredericobarbosa/DSM_PI2_EasyAdmin/blob/main/Img_EasyAdmin/TelaLogin.PNG" alt="Tela de login" width="95%">

### Tela de cadastro:
<img src="https://github.com/Fredericobarbosa/DSM_PI2_EasyAdmin/blob/main/Img_EasyAdmin/TelaCadastro.PNG" alt="Tela de cadastro" width="95%">

### Home:
<img src="https://github.com/Fredericobarbosa/DSM_PI2_EasyAdmin/blob/main/Img_EasyAdmin/Home.PNG" alt="Home" width="95%">

### Tela de gerenciamento produtos:
<img src="https://github.com/Fredericobarbosa/DSM_PI2_EasyAdmin/blob/main/Img_EasyAdmin/Produtos.PNG" alt=" Gerenciamento Produtos" width="95%">

### Tela registro de vendas:
<img src="https://github.com/Fredericobarbosa/DSM_PI2_EasyAdmin/blob/main/Img_EasyAdmin/Vendas.PNG" alt=" Registro Vendas" width="95%">

### Tela cadastro cliente:
<img src="https://github.com/Fredericobarbosa/DSM_PI2_EasyAdmin/blob/main/Img_EasyAdmin/CadastroCliente.PNG" alt="Cadastro Cliente"  width="95%">

### Tela lançamento financeiro:
<img src="https://github.com/Fredericobarbosa/DSM_PI2_EasyAdmin/blob/main/Img_EasyAdmin/Financeiro.PNG" alt="Registro financeiro"  width="95%">

### Tela estátistica:
<img src="https://github.com/Fredericobarbosa/DSM_PI2_EasyAdmin/blob/main/Img_EasyAdmin/Estatistica.PNG" alt="Registro financeiro"  width="95%">

---
## Banco de dados:
### Modelo Conceitual (DER):
<img src="https://github.com/Fredericobarbosa/DSM_PI2_EasyAdmin/blob/main/Img_EasyAdmin/Diagrama%20Entidade-Relacionamento(Der).PNG" alt="DER"  width="95%">

### Modelo Lógico (MER):
<img src="https://github.com/Fredericobarbosa/DSM_PI2_EasyAdmin/blob/main/Img_EasyAdmin/Modelo%20Entidade%20Relacionamento(Mer).PNG" alt="MER"  width="95%">

### Código do utilizado no banco:
```
CREATE TABLE Usuario (
    Id_Usuario INT PRIMARY KEY IDENTITY(1,1),
    Nome VARCHAR(60),
    Email VARCHAR(60),
    Nome_Empresa VARCHAR(60),
    Tipo_Empresa VARCHAR(60),
    Senha VARCHAR(20)
);

CREATE TABLE Financeiro (
    Id_Financeiro INT PRIMARY KEY IDENTITY(1,1),
    Tipo_Transacao VARCHAR(10),
    Descricao VARCHAR(200),
    Valor DECIMAL(10,2),
    Categoria VARCHAR(45),
    Id_Usuario INT,
    FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id_Usuario)
);

CREATE TABLE Telefone_Usuario (
    Id_Telefone_Usuario INT IDENTITY(1,1) PRIMARY KEY,
    Numero_Telefone VARCHAR(25),
    Id_Usuario INT,
    FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id_Usuario)
);

CREATE TABLE Produtos (
    Id_Produtos INT IDENTITY(1,1) PRIMARY KEY,
    Nome_Produto VARCHAR(60),
    Descricao VARCHAR(200),
    Quantidade INT,
    Preco DECIMAL(10,2),
    Id_Usuario INT,
    FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id_Usuario)
);

CREATE TABLE Vendas (
    Id_Vendas INT IDENTITY(1,1) PRIMARY KEY,
    Data DATE,
    Valor_Total DECIMAL(10,2)
);

CREATE TABLE Venda_Produtos (
    Id_Vendas INT,
    Id_Produtos INT,
    PRIMARY KEY (Id_Vendas, Id_Produtos),
    FOREIGN KEY (Id_Vendas) REFERENCES Vendas(Id_Vendas),
    FOREIGN KEY (Id_Produtos) REFERENCES Produtos(Id_Produtos)
);

CREATE TABLE Clientes (
    Id_Clientes INT IDENTITY(1,1) PRIMARY KEY,
    Nome VARCHAR(60),
    Cpf VARCHAR(15)
);

CREATE TABLE Email_Cliente (
    Id_Email_Cliente INT IDENTITY(1,1) PRIMARY KEY, 
    Email VARCHAR(60),
    Id_Clientes INT,
    FOREIGN KEY (Id_Clientes) REFERENCES Clientes(Id_Clientes)
);

CREATE TABLE Telefone_Cliente (
    Id_Telefone_Cliente INT IDENTITY(1,1) PRIMARY KEY,
    Numero_Telefone VARCHAR(25),
    Id_Clientes INT,
    FOREIGN KEY (Id_Clientes) REFERENCES Clientes(Id_Clientes)
);

CREATE TABLE Endereco_Cliente(
     Id_Endereco_Cliente INT IDENTITY(1,1) PRIMARY KEY,
     Rua VARCHAR(60),
     Numero INT,
     Complemento VARCHAR (40),
     Bairro VARCHAR (40),
     Cidade VARCHAR (20),
     Estado VARCHAR (10),
     Cep VARCHAR (10),
	 Id_Clientes INT, 
     FOREIGN KEY (Id_Clientes) REFERENCES Clientes(Id_Clientes)
);

CREATE TABLE Cliente_Venda(
     Id_Clientes INT,
     Id_Vendas INT,
     PRIMARY KEY (Id_Clientes, Id_Vendas),
     FOREIGN KEY (Id_Clientes) REFERENCES Clientes(Id_Clientes),
     FOREIGN KEY (Id_Vendas) REFERENCES Vendas(Id_Vendas)
);
```
---
### Vídeo da aplicação rodando:
<img src="" alt="DER"  width="95%">

---
### Como rodar o projeto:
### 1º Instalar todas as dependencias indicada pelo package.json (caso já tenha o node instalado)
	npm install ou npm i
 ### 2º Iniciar o servidor rodando o comando:
 
 ```
 node server.js

 ```

### 3º colocar na url de seu navegador:
```
http://localhost:3000/
```
### já que não foi feita o deploy do sistema.

### Observação: para a criação deste projeto e das rotas no arquivo package.json foi adicionado as dependencias do Express:
```
"mssql": "10.0.2",
"vue": "3.4.27"
```
---
## Link do elevator pitch 🔗:
### https://youtu.be/EqD2igeww2A
----
# 📝Observação importante: nem todo o sistema está funcional ainda, somente as rotas para faze a validação, cadastro de usário, e as referentes a produtos e financeiro. 
----
##  Descrição final🗒️:
### O projeto desse jogo foi desenvolvido como parte de um trabalho acadêmico envolvendo a disciplina de "Engenharia de Software","Desenvolvimento Web II" e "Banco de Dados Relacional".

