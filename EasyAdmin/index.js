const ComponenteLogin ={
    template: `
        <div class="container">
            <div class="componente1">
                <h1>EasyAdmin</h1>
                <input placeholder="Email" type="email"></input><br><br>
                <input placeholder="Senha" type="password"></input><br><br>
                <button @click="login">Entrar</button><br><br>
                <button @click="$emit('cadastro')">Cadastre-se</button>
            </div>
        </div>
    `
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
            <input placeholder="Senha" type="password"></input><br><br>
            <button @click="$emit('cadastro')">Cadastrar</button>
        </div>
    `
}

const {createApp} = Vue;

createApp({
    data() {
        return {
            componenteAtual: "ComponenteLogin"
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