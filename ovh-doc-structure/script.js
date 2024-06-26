/*
document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('nestedListContainer');
            container.appendChild(createList(data));
        })
        .catch(error => console.error('Error loading the JSON data: ', error));
});
*/

document.addEventListener('DOMContentLoaded', function() {
    fetchAndDisplay('data0.json', 'nestedListContainer0');
    fetchAndDisplay('data1.json', 'nestedListContainer1');
    fetchAndDisplay('data2.json', 'nestedListContainer2');
    fetchAndDisplay('data3.json', 'nestedListContainer3');
    fetchAndDisplay('data4.json', 'nestedListContainer4');
    fetchAndDisplay('data5.json', 'nestedListContainer5');

     const expandButton = document.getElementById('expandAllButton');
    expandButton.addEventListener('click', function() {
        try {
            expandAllNodes(document.getElementById('nestedListContainer0'));
        } catch (error) {
            console.log("ERROR: expandAllNodes(document.getElementById('nestedListContainer0'));")
        }

        try {
            expandAllNodes(document.getElementById('nestedListContainer1'));
        } catch (error) {
            console.log("ERROR: expandAllNodes(document.getElementById('nestedListContainer1'));")
        }

        try {
            expandAllNodes(document.getElementById('nestedListContainer2'));
        } catch (error) {
            console.log("ERROR: expandAllNodes(document.getElementById('nestedListContainer2'));")
        }

        try {
            expandAllNodes(document.getElementById('nestedListContainer3'));
        } catch (error) {
            console.log("ERROR: expandAllNodes(document.getElementById('nestedListContainer3'));")
        }

        try {
            expandAllNodes(document.getElementById('nestedListContainer4'));
        } catch (error) {
            console.log("ERROR: expandAllNodes(document.getElementById('nestedListContainer4'));")
        }

        try {
            expandAllNodes(document.getElementById('nestedListContainer5'));
        } catch (error) {
            console.log("ERROR: expandAllNodes(document.getElementById('nestedListContainer5'));")
        }


        
        
    });
    
});

function fetchAndDisplay(jsonFile, containerId) {
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById(containerId);
            container.appendChild(createList(data));
        })
        .catch(error => console.error('Error loading the JSON data from ' + jsonFile + ': ', error));
}

function createList(items) {
    const ul = document.createElement('ul');
    items.forEach(item => {
        const li = document.createElement('li');
        const text = document.createElement('span');
        const link = document.createElement('a');
        link.href = item.link;
        link.title = item.title;
        link.textContent = item.name;
        text.appendChild(link);
        li.appendChild(text);
        li.classList.add('list-item');

        if (item.children && item.children.length > 0) {
            const childUl = createList(item.children);
            childUl.style.display = 'none'; // Initially hide the children
            li.appendChild(childUl);
            li.classList.add('has-children');
            text.classList.add('folder-icon');
            link.addEventListener('click', function(event) {
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

function expandAllNodes(container) {
    const nestedLists = container.querySelectorAll('ul');
    nestedLists.forEach(ul => ul.style.display = 'block');
}
