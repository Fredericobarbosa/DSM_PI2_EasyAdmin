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
