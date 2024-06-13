// produto.js
const { createApp } = Vue;
const API_URL = 'http://localhost:3000/';

createApp({
    data() {
        return {
            nome_produto: '',
            descricao: '',
            qtd: 0,
            preco: 0,
            id_usuario: 1,
            produtos: []
        };
    },
    methods: {
        cadastrar() {
            this.cadastrar_produto(this.nome_produto, this.descricao, this.qtd, this.preco, this.id_usuario)
            this.limparFormulario();
            this.buscar_produtos();
        },
        limparFormulario() {
            this.nome_produto = '';
            this.descricao = '';
            this.qtd = 0;
            this.preco = 0;
            this.id_usuario = 1;
        },
        async removerProduto(codigo) {
            try {
                const response = await fetch(`${API_URL}deletar_produto/${codigo}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Erro ao remover produto do banco de dados.');
                }
                this.produtos = this.produtos.filter(produto => produto.codigo !== codigo);
                console.log('Produto removido com sucesso!');                                           
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async cadastrar_produto(nome, descricao, quantidade, preco, id_usuario) {
            try {
                const response = await fetch(`${API_URL}cadastrar_produto`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nome, descricao, quantidade, preco, id_usuario })
                });
                if (!response.ok) {
                    throw new Error('Erro ao cadastrar produto no banco de dados.');
                }
                console.log('Produto cadastrado com sucesso!');
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async buscar_produtos() {
            try {
                const response = await fetch(`${API_URL}buscar_produtos`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar produtos do banco de dados.');
                }
                
                const datas = await response.json();
                
                for (const data of datas){
                const novoProduto = {
                    codigo: data.Id_Produtos,
                    nome: data.Nome_Produto,
                    descricao: data.Descricao,
                    quantidade: data.Quantidade,
                    preco: data.Preco
                };
                this.produtos.push(novoProduto);
            }
                
            } catch (error) {
                console.error('Error:', error);
            }
        }
    },
    mounted() {
        this.buscar_produtos();
    }
}).mount('#app');
