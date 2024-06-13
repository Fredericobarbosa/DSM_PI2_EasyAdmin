# EasyAdmin &copy;  ⚙️🕴🏻
---
### <a href="https://github.com/Fredericobarbosa/DSM_PI2_EasyAdmin/tree/main/DocumentcaoPI2">Documentação PI</a>

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

### Rotas Criadas(CRUD):
```
//Login
app.post('/validar_usuario', async (req, res) => {
    let { email, senha } = req.body;

    email = email.trim()
    senha = senha.trim()

    try {
        await sql.connect(config);
        const request = new sql.Request();

        request.input('Email', sql.VarChar, email);
        request.input('Senha', sql.VarChar, senha);

        const result = await request.query(`
        SELECT * FROM Usuario WHERE Email = @email AND Senha = @senha`);

        if (result.recordset.length > 0) {
            res.status(200).send('Usuário encontrado!');
        } else {
            res.status(401).send('Email ou senha inválidos.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Ocorreu um erro no servidor.');
    }
});

app.post('/cadastrar_usuario', async (req, res) => {
    let { nome, email, nomeEmpresa, telefone, tipoEmpresa, senha } = req.body;

    nome = nome.trim()
    email = email.trim()
    nomeEmpresa= nomeEmpresa.trim()
    telefone=telefone.trim()
    tipoEmpresa= tipoEmpresa.trim()
    senha = senha.trim()

    try {
        await sql.connect(config);
        const request = new sql.Request();

        request.input('Nome', sql.VarChar, nome);
        request.input('Email', sql.VarChar, email);
        request.input('Nome_Empresa', sql.VarChar, nomeEmpresa);
        request.input('Numero_Telefone', sql.VarChar, telefone);
        request.input('Tipo_Empresa', sql.VarChar, tipoEmpresa);
        request.input('Senha', sql.VarChar, senha);

        await request.query(`
        MERGE INTO Usuario AS target
        USING (VALUES (@Nome, @Email, @Nome_Empresa, @Numero_Telefone, @Tipo_Empresa, @Senha)) 
            AS source (Nome, Email, Nome_Empresa, Numero_Telefone, Tipo_Empresa, Senha)
            ON target.Email = source.Email
        WHEN NOT MATCHED THEN
            INSERT (Nome, Email, Nome_Empresa, Numero_Telefone, Tipo_Empresa, Senha) VALUES (source.Nome, source.Email, source.Nome_Empresa, source.Numero_Telefone, source.Tipo_Empresa, source.Senha);
        `);
        res.status(200).send('Cadastro realizado com sucesso.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor.');
    }
});

```
```
// Rotas para Produto
// Rota para obter todos os produtos
app.get('/buscar_produtos', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const produto_resultado = await request.query("SELECT * FROM Produtos");
        // const produto = produto_resultado.recordset[1];
        res.json(produto_resultado.recordset);
    } catch (error) {
        console.error('Erro ao buscar os produtos:', err);
        res.status(500).json({ error: 'Erro ao buscar os produtos.' });
    }
});

// Rota para adicionar um novo produto
app.post('/cadastrar_produto', async (req, res) => {
    let { nome, descricao, quantidade, preco, id_usuario } = req.body;

    nome = nome.trim()
    descricao = descricao.trim()

    try {
        await sql.connect(config);
        const request = new sql.Request();

        request.input('Nome_Produto', sql.VarChar, nome);
        request.input('Descricao', sql.VarChar, descricao);
        request.input('Quantidade', sql.Int, quantidade);
        request.input('Preco', sql.Float, preco);
        request.input('Id_Usuario', sql.Int, id_usuario);

        await request.query(`
            INSERT INTO Produtos (Nome_Produto, Descricao, Quantidade, Preco, Id_Usuario)
            VALUES (@Nome_Produto, @Descricao, @Quantidade, @Preco, @Id_Usuario);
        `);
        res.status(200).send('Cadastro realizado com sucesso.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor.');
    }
});

// Rota para excluir um produto
app.delete('/deletar_produto/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('Id_Produtos', sql.Int, id)
            .query('DELETE FROM Produtos WHERE Id_Produtos = @Id_Produtos');
        res.status(200).json({ message: 'Produto excluído com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir produto:', err);
        res.status(500).json({ error: 'Erro ao excluir produto.' });
    }
});
```

```
// Rotas para o Financeiro
// Rota para obter dados financeiros
app.get('/buscar_financeiro', async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const financeiro_resultado = await new sql.Request().query('SELECT * FROM Financeiro');
        res.json(financeiro_resultado.recordset);
    } catch (error) {
        console.error('Erro ao obter dados financeiros:', err);
        res.status(500).json({ error: 'Erro ao obter dados financeiros.' });
    }
});

// Rota para criar um novo lançamento financeiro
app.post('/salvar_financeiro', async (req, res) => {
    let { data, tipo, descricao, valor, categoria, id_usuario } = req.body;

    descricao = descricao.trim()

    try {
        await sql.connect(config);
        const request = new sql.Request();

        request.input('Data_Transacao', sql.Date, data)
        request.input('Tipo_Transacao', sql.VarChar, tipo);
        request.input('Descricao', sql.VarChar, descricao);
        request.input('Valor', sql.Float, valor);
        request.input('Categoria', sql.VarChar, categoria);
        request.input('Id_Usuario', sql.Int, id_usuario);
 
        await request.query(`
            INSERT INTO Financeiro (Data_Transacao,Tipo_Transacao, Descricao, Valor, Categoria, Id_Usuario)
            VALUES (@Data_Transacao,@Tipo_Transacao, @Descricao, @Valor, @Categoria, @Id_Usuario)
        `);

        res.status(200).json({ message: 'Lançamento financeiro realizado com sucesso.' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro no servidor.');
    }
});

// Rota para excluir um lançamento financeiro
app.delete('/deletar_financeiro/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('Id_Financeiro', sql.Int, id)
            .query('DELETE FROM Financeiro WHERE Id_Financeiro = @Id_Financeiro');
        res.status(200).json({ message: 'Lançamento financeiro excluído com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir lançamento financeiro:', err);
        res.status(500).json({ error: 'Erro ao excluir lançamento financeiro.' });
    }
});
```
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

### Link da aplicação rodando:
### https://youtu.be/e59qvenHVeI

----
# 📝Observação importante: nem todo o sistema está funcional ainda, somente as rotas para faze a validação, cadastro de usuário, e as referentes a produtos e financeiro. 
# E caso haja erro em relação ao Banco de dados, ele pode estar desativado na Azure por conta de cobranças relacionadas ao serviços de hospedagem.
----
##  Descrição final🗒️:
### O projeto desse jogo foi desenvolvido como parte de um trabalho acadêmico envolvendo a disciplina de "Engenharia de Software","Desenvolvimento Web II" e "Banco de Dados Relacional".

