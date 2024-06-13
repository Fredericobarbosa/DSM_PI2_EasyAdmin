// Incluir as bibliotecas
const express = require('express');
const path = require('path');
const sql = require('mssql');

// Chamar a função express
const app = express();
const PORT = 3000;

// Configuração do banco de dados
const config = {
    user: 'dsmpidois',
    password: 'DSMp!002',
    server: 'dsmpidois.database.windows.net',
    database: 'dbdsmpi2',
    options: {
        encrypt: true // Necessário para conexões com Azure
    }
};

app.use(express.json());
// Servir arquivos estáticos (como index.html)
app.use(express.static(path.join(__dirname)));

// Criação das rotas do tipo GET direcionando para as páginas da aplicação
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index-login/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'index-login/login.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home/home.html'));
});

app.get('/produto', (req, res) => {
    res.sendFile(path.join(__dirname, 'produto/cadastroProduto.html'));
});

app.get('/venda', (req, res) => {
    res.sendFile(path.join(__dirname, 'venda/cadastroVenda.html'));
});

app.get('/cliente', (req, res) => {
    res.sendFile(path.join(__dirname, 'venda/cadastroVenda.html'));
});

app.get('/financeiro', (req, res) => {
    res.sendFile(path.join(__dirname, 'financeiro/financeiro.html'));
});

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

//Rotas para Vendas
// Rota para obter todas as vendas
app.get('/venda', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM Vendas');
        res.json(result.recordset);
    } catch (err) {
        console.error('Erro ao buscar as vendas:', err);
        res.status(500).json({ error: 'Erro ao buscar as vendas.' });
    }
});

// Rota para adicionar uma nova venda
app.post('/venda', async (req, res) => {
    const { Data, Valor_Total } = req.body;
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('Data', sql.Date, Data)
            .input('Valor_Total', sql.Decimal(10, 2), Valor_Total)
            .query('INSERT INTO Vendas (Data, Valor_Total) VALUES (@Data, @Valor_Total)');
        res.status(201).json({ message: 'Venda adicionada com sucesso.' });
    } catch (err) {
        console.error('Erro ao adicionar venda:', err);
        res.status(500).json({ error: 'Erro ao adicionar venda.' });
    }
});

// Rota para excluir uma venda
app.delete('/venda/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('Id_Vendas', sql.Int, id)
            .query('DELETE FROM Vendas WHERE Id_Vendas = @Id_Vendas');
        res.status(200).json({ message: 'Venda excluída com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir venda:', err);
        res.status(500).json({ error: 'Erro ao excluir venda.' });
    }
});

//Rotas para Cliente
// Rota para adicionar um novo cliente
app.post('/cliente', async (req, res) => {
    const { Nome, Cpf, Email, Numero_Telefone, Rua, Numero, Complemento, Bairro, Cidade, Estado, Cep } = req.body;
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('Nome', sql.VarChar(60), Nome)
            .input('Cpf', sql.VarChar(15), Cpf)
            .query('INSERT INTO Clientes (Nome, Cpf) VALUES (@Nome, @Cpf)');
        const Id_Clientes = result.recordset[0].Id_Clientes;

        // Adicionar email
        await pool.request()
            .input('Email', sql.VarChar(60), Email)
            .input('Id_Clientes', sql.Int, Id_Clientes)
            .query('INSERT INTO Email_Cliente (Email, Id_Clientes) VALUES (@Email, @Id_Clientes)');

        // Adicionar telefone
        await pool.request()
            .input('Numero_Telefone', sql.VarChar(25), Numero_Telefone)
            .input('Id_Clientes', sql.Int, Id_Clientes)
            .query('INSERT INTO Telefone_Cliente (Numero_Telefone, Id_Clientes) VALUES (@Numero_Telefone, @Id_Clientes)');

        // Adicionar endereço
        await pool.request()
            .input('Rua', sql.VarChar(60), Rua)
            .input('Numero', sql.Int, Numero)
            .input('Complemento', sql.VarChar(40), Complemento)
            .input('Bairro', sql.VarChar(40), Bairro)
            .input('Cidade', sql.VarChar(20), Cidade)
            .input('Estado', sql.VarChar(10), Estado)
            .input('Cep', sql.VarChar(10), Cep)
            .input('Id_Clientes', sql.Int, Id_Clientes)
            .query('INSERT INTO Endereco_Cliente (Rua, Numero, Complemento, Bairro, Cidade, Estado, Cep, Id_Clientes) VALUES (@Rua, @Numero, @Complemento, @Bairro, @Cidade, @Estado, @Cep, @Id_Clientes)');

        res.status(201).json({ message: 'Cliente adicionado com sucesso.' });
    } catch (err) {
        console.error('Erro ao adicionar cliente:', err);
        res.status(500).json({ error: 'Erro ao adicionar cliente.' });
    }
});

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

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor Express rodando na porta ${PORT}`);
});
