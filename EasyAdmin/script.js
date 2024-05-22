document.getElementById('addProductButton').addEventListener('click', function() {
    var container = document.getElementById('productsSoldContainer');
    var productDiv = document.createElement('div');
    productDiv.className = 'product-input';

    var input = document.createElement('input');
    input.type = 'text';
    input.name = 'productsSold[]';
    input.required = true;

    var removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'removeProductButton';
    removeButton.textContent = 'Remover';
    removeButton.addEventListener('click', function() {
        container.removeChild(productDiv);
    });

    productDiv.appendChild(input);
    productDiv.appendChild(removeButton);
    container.appendChild(productDiv);
});

document.querySelectorAll('.removeProductButton').forEach(function(button) {
    button.addEventListener('click', function() {
        var container = document.getElementById('productsSoldContainer');
        var productDiv = button.parentElement;
        container.removeChild(productDiv);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('salesOverviewChart').getContext('2d');
    const salesOverviewChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Vendas',
                data: [3000, 2500, 4000, 3500, 5000, 4500, 6000],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Gráfico de Vendas Mensais
    const ctx1 = document.getElementById('monthlySalesChart').getContext('2d');
    const monthlySalesChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Vendas',
                data: [3000, 2500, 4000, 3500, 5000, 4500, 6000],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de Desempenho Financeiro
    const ctx2 = document.getElementById('financialPerformanceChart').getContext('2d');
    const financialPerformanceChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
                {
                    label: 'Receitas',
                    data: [5000, 4000, 4500, 3000, 7000, 6000, 8000],
                    backgroundColor: 'rgba(46, 204, 113, 0.5)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Despesas',
                    data: [2000, 1500, 3000, 2000, 3500, 4000, 3000],
                    backgroundColor: 'rgba(231, 76, 60, 0.5)',
                    borderColor: 'rgba(231, 76, 60, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de Produtos Mais Vendidos
    const ctx3 = document.getElementById('topProductsChart').getContext('2d');
    const topProductsChart = new Chart(ctx3, {
        type: 'pie',
        data: {
            labels: ['Produto A', 'Produto B', 'Produto C', 'Produto D', 'Produto E'],
            datasets: [{
                data: [300, 250, 200, 150, 100],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(155, 89, 182, 0.7)',
                    'rgba(241, 196, 15, 0.7)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(231, 76, 60, 1)',
                    'rgba(155, 89, 182, 1)',
                    'rgba(241, 196, 15, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
});
