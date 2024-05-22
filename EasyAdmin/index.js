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
            <h1>Cadastre-se</h1>
            <label>Nome*</label>
            <input placeholder="Nome" type="text"></input><br><br>
            <label>Sobrenome*</label>
            <input placeholder="Sobrenome" type="text"></input><br><br>
            <label>Telefone*</label>
            <input placeholder="Telefone (XX) XXXXXXXXX" type="text"></input><br><br>
            <label>Email*</label>
            <input placeholder="Email" type="email"></input><br><br>
            <label>Senha*</label>
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