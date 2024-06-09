document.addEventListener('DOMContentLoaded', () => {
    const vendaForm = document.getElementById('vendaForm');
    const vendaTable = document.getElementById('vendaTable').querySelector('tbody');

    // Função para carregar vendas
    const loadVendaData = async () => {
        const response = await fetch('/vendas');
        const data = await response.json();

        vendaTable.innerHTML = '';
        data.forEach(venda => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${venda.Id_Vendas}</td>
                <td>${new Date(venda.Data).toLocaleDateString()}</td>
                <td>${venda.Valor_Total.toFixed(2)}</td>
                <td>
                    <button class="delete-btn" data-id="${venda.Id_Vendas}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            vendaTable.appendChild(row);
        });

        // Adicionar evento de exclusão aos botões de lixeira
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.currentTarget.dataset.id;
                await deleteVendaRecord(id);
                loadVendaData();
            });
        });
    };

    // Função para deletar uma venda
    const deleteVendaRecord = async (id) => {
        await fetch(`/vendas/${id}`, {
            method: 'DELETE'
        });
    };

    // Função para adicionar uma nova venda
    vendaForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(vendaForm);
        const data = {
            Data: formData.get('vendaDate'),
            Valor_Total: parseFloat(formData.get('totalValue'))
        };

        await fetch('/vendas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        vendaForm.reset();
        loadVendaData();
    });

    // Carregar dados das vendas ao carregar a página
    loadVendaData();
});



document.addEventListener('DOMContentLoaded', () => {
    const clienteForm = document.getElementById('clienteForm');
    const clienteTable = document.getElementById('clienteTable').querySelector('tbody');

    // Função para carregar clientes
    const loadClienteData = async () => {
        const response = await fetch('/clientes');
        const data = await response.json();

        clienteTable.innerHTML = '';
        data.forEach(cliente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cliente.Id_Clientes}</td>
                <td>${cliente.Nome}</td>
                <td>${cliente.Cpf}</td>
                <td>
                    <button class="delete-btn" data-id="${cliente.Id_Clientes}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            clienteTable.appendChild(row);
        });

        // Adicionar evento de exclusão aos botões de lixeira
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.currentTarget.dataset.id;
                await deleteClienteRecord(id);
                loadClienteData();
            });
        });
    };

    // Função para deletar um cliente
    const deleteClienteRecord = async (id) => {
        await fetch(`/clientes/${id}`, {
            method: 'DELETE'
        });
    };

    // Função para adicionar um novo cliente
    clienteForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(clienteForm);
        const data = {
            Nome: formData.get('clientName'),
            Cpf: formData.get('clientCpf')
        };

        await fetch('/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        clienteForm.reset();
        loadClienteData();
    });

    // Carregar dados dos clientes ao carregar a página
    loadClienteData();
});
