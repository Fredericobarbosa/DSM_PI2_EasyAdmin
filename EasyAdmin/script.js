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


