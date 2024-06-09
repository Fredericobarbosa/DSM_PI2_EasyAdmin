document.addEventListener('DOMContentLoaded', () => {
    const financeForm = document.getElementById('finance-form');
    const financeiroTable = document.getElementById('financeiroTable').querySelector('tbody');

    // Função para carregar lançamentos financeiros
    const loadFinanceiroData = async () => {
        const response = await fetch('/financeiro-data');
        const data = await response.json();

        financeiroTable.innerHTML = '';
        data.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.Id_Financeiro}</td>
                <td>${new Date(record.Data).toLocaleDateString()}</td>
                <td>${record.Tipo_Transacao}</td>
                <td>${record.Descricao}</td>
                <td>${record.Valor.toFixed(2)}</td>
                <td>${record.Categoria}</td>
                <td>
                    <button class="delete-btn" data-id="${record.Id_Financeiro}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            financeiroTable.appendChild(row);
        });

        // Adicionar evento de exclusão aos botões de lixeira
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.currentTarget.dataset.id;
                await deleteFinanceiroRecord(id);
                loadFinanceiroData();
            });
        });
    };

    // Função para deletar um registro financeiro
    const deleteFinanceiroRecord = async (id) => {
        await fetch(`/financeiro/${id}`, {
            method: 'DELETE'
        });
    };

    // Função para adicionar um novo lançamento financeiro
    financeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(financeForm);
        const data = {
            Data: formData.get('transactionDate'),
            Tipo_Transacao: formData.get('transactionType'),
            Descricao: formData.get('description'),
            Valor: parseFloat(formData.get('amount')),
            Categoria: formData.get('category'),
            Id_Usuario: 1 // Substitua pelo ID do usuário autenticado
        };

        await fetch('/financeiro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        financeForm.reset();
        loadFinanceiroData();
    });

    // Carregar dados financeiros ao carregar a página
    loadFinanceiroData();
});
