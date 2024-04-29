document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('nestedListContainer');
            container.appendChild(createList(data));
        })
        .catch(error => console.error('Error loading the JSON data: ', error));
});

function createList(items) {
    const ul = document.createElement('ul');
    items.forEach(item => {
        const li = document.createElement('li');
        const text = document.createElement('span');
        text.textContent = item.name;
        li.appendChild(text);
        li.classList.add('list-item');

        if (item.children && item.children.length > 0) {
            const childUl = createList(item.children);
            childUl.style.display = 'none'; // Initially hide the children
            li.appendChild(childUl);
            li.classList.add('has-children');
            text.classList.add('folder-icon');
            li.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent clicks from bubbling up to parent elements
                childUl.style.display = childUl.style.display === 'none' ? 'block' : 'none';
            });
        } else {
            text.classList.add('leaf-icon');
        }
        ul.appendChild(li);
    });
    return ul;
}
