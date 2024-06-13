//financeiro.js
const { createApp } = Vue;
const API_URL = 'http://localhost:3000/';

createApp({
    data() {
        return {
            data_financeiro: '',
            tipo_transacao: '',
            descricao: '',
            valor_financeiro: 0,
            categoria_financeiro: '',
            id_usuario: 1,
            financeiros: []
        };
    },
    methods: {
        salvar() {
            this.salvar_financeiro(this.data_financeiro, this.tipo_transacao, this.descricao, this.valor_financeiro, this.categoria_financeiro, this.id_usuario)
            this.limparFormulario();
            this.buscar_financeiro();
        },
        limparFormulario() {
            this.data_financeiro = '';
            this.tipo_transacao = '';
            this.descricao = '';
            this.valor_financeiro = 0;
            this.categoria_financeiro = '';
            this.id_usuario = 1;
        },
        async removerFinanceiro(lancamento) {
            try {
                const response = await fetch(`${API_URL}deletar_financeiro/${lancamento}`, {
                    method: 'DELETE',
                    headrs: {
                        'Cotent-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Erro ao remover produto do banco de dados.');
                }
                this.financeiros = this.financeiros.filter(financeiro => financeiro.lancamento != lancamento);
                console.log('Produto removido com sucesso!');
            } catch (error) {
                console.error('Erro:', error);
            }
        },
        async salvar_financeiro(data, tipo, descricao, valor, categoria, id_usuario) {
            try {
                const response = await fetch(`${API_URL}salvar_financeiro`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ data, tipo, descricao, valor, categoria, id_usuario })
                });
                if (!response.ok) {
                    throw new Error('Erro ao cadastrar o lançamento no banco de dados.');
                }
                console.log('Lançamento cadastrado com sucesso!');
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async buscar_financeiro() {
            try{
                const response = await fetch (`${API_URL}buscar_financeiro`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar lançamento no banco de dados.');
                }
                

                const datas = await response.json();

                for (const data of datas){
                const novoFinanceiro={
                    lancamento: data.Id_Financeiro,
                    data: data.Data_Transacao,
                    tipo: data.Tipo_Transacao,
                    descricao: data.Descricao,
                    valor: data.Valor,
                    categoria: data.Categoria
                };
                this.financeiros.push(novoFinanceiro);
            }

            }catch (error){
                console.error('Error:', error);
            }
        }
    },
    mounted(){
        this.buscar_financeiro();
    }
}).mount('#app');