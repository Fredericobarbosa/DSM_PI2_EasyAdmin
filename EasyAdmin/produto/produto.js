document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productTable = document.getElementById('productTable').querySelector('tbody');

    // Função para carregar produtos
    const loadProductData = async () => {
        const response = await fetch('/produtos');
        const data = await response.json();

        productTable.innerHTML = '';
        data.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.Id_Produtos}</td>
                <td>${product.Nome_Produto}</td>
                <td>${product.Descricao}</td>
                <td>${product.Quantidade}</td>
                <td>${product.Preco.toFixed(2)}</td>
                <td>
                    <button class="delete-btn" data-id="${product.Id_Produtos}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            productTable.appendChild(row);
        });

        // Adicionar evento de exclusão aos botões de lixeira
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.currentTarget.dataset.id;
                await deleteProductRecord(id);
                loadProductData();
            });
        });
    };

    // Função para deletar um produto
    const deleteProductRecord = async (id) => {
        await fetch(`/produto/${id}`, {
            method: 'DELETE'
        });
    };

    // Função para adicionar um novo produto
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(productForm);
        const data = {
            Nome_Produto: formData.get('productName'),
            Descricao: formData.get('productDescription'),
            Quantidade: parseInt(formData.get('productQuantity')),
            Preco: parseFloat(formData.get('productPrice')),
            Id_Usuario: 1 // Substitua pelo ID do usuário autenticado
        };

        await fetch('/produto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        productForm.reset();
        loadProductData();
    });

    // Carregar dados dos produtos ao carregar a página
    loadProductData();
});
