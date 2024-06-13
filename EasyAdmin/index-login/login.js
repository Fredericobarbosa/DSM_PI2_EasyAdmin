const ComponenteLogin ={
    template: `
        <div class="container">
            <div class="componente1">
                <h1>EasyAdmin</h1>
                <input placeholder="Email" type="email"></input><br><br>
                <input placeholder="Senha" type="password"></input><br><br>
                <button @click="entrar(email, senha)">Entrar</button><br><br>
                <button @click="$emit('cadastro')">Cadastre-se</button><br><br>
                <button onclick="window.location.href='index-login/index.html'">Voltar</button>
            </div>
        </div>
    `,
    data(){
        return{
            email:'',
            senha:''
        }
    },
    methods: {
        entrar(email, senha) {
            this.email = email;
            this.senha = senha;
            this.validarUsuario(this.email, this.senha)
        },
        async validarUsuario(email, senha) {
            try {
                const response = await fetch(`${API_URL}validar_usuario`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, senha })
                });
                if (!response.ok) {
                    throw new Error('Email ou senha incorretos.');
                }else{
                    alert('Login realizado com Sucesso!')
                    window.location.href=`${API_URL}home/home.html`
                }
            } catch (error) {
                console.error('Erro ao validar o usuário no banco de dados:', error);
            }
        }
    }
}
const ComponenteCadastro ={
    template: `
        <div class="componente2">
            <h1>EasyAdmin</h1>
            <h2>Cadastre-se</h2>
            <input placeholder="Nome" type="text"></input><br><br>
            <input placeholder="Email" type="email"></input><br><br>
            <input placeholder="Nome da Empresa" type="text"></input><br><br>
            <input placeholder="Telefone" type="text"></input><br><br>
            <input placeholder="Tipo de Empresa" type="text"></input><br><br>
            <input placeholder="Crie sua senha" type="password"></input><br><br>
            <button @click="cadastrar(nome, email, nomeEmpresa, telefone, tipoEmpresa,senha)">Cadastrar</button><br><br>
            <button onclick="window.location.href='index-login/login.html'">Voltar</button>
        </div>
    `,
    data() {
        return {
            nome: '',
            email: '',
            nomeEmpresa:'',
            telefone:'',
            tipoEmpresa:'',
            senha: ''
        };
    },
    methods: {
        async cadastrar(nome, email, nomeEmpresa, telefone, tipoEmpresa, senha) {
            this.nome = nome.trim()
            this.email = email.trim()
            this.nomeEmpresa= nomeEmpresa.trim()
            this.telefone=telefone.trim()
            this.tipoEmpresa= tipoEmpresa.trim()
            this.senha = senha.trim()
            try {
                const response = await fetch(`${API_URL}cadastrar_usuario`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nome: this.nome, email: this.email,nomeEmpresa: this.nomeEmpresa, telefone: this.telefone, tipoEmpresa:this.tipoEmpresa, senha: this.senha })
                });
                if (!response.ok) {
                    throw new Error('Erro ao cadastrar usuário.');
                } else {
                    alert('Cadastro realizado com sucesso!');
                    this.$emit('cadastro');
                }
            } catch (error) {
                console.error('Erro ao cadastrar o usuário no banco de dados:', error);
                alert('Erro ao cadastrar o usuário no banco de dados.');
            }
        }
    }
}

const {createApp} = Vue;
const API_URL = 'http://localhost:3000/';

createApp({
    data() {
        return {
            componenteAtual: "ComponenteLogin",
        }
    },
    methods: {
        
        alterarComponentes() {
            this.componenteAtual = (this.componenteAtual === "ComponenteLogin") ? "ComponenteCadastro" : "ComponenteLogin"
        }
    },
    components: {
        ComponenteLogin,
        ComponenteCadastro
    }
}).mount("#app");