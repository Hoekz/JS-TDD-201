
function attach(target, ...body) {
    for (const child of body) {
        if (child instanceof HTMLElement) {
            target.appendChild(child);
        } else {
            target.insertAdjacentHTML('beforeend', child.toString());
        }
    }
}

function remove(target) {
    target.parentElement.removeChild(target);
}

function empty(target) {
    target.innerHTML = '';
}

function setAttr(target, attr, value) {
    if (!value) {
        target.removeAttribute(attr);
    } else {
        target.setAttribute(attr, value);
    }
}

function listItem(label, active, onSelect, onDelete) {
    const item = document.createElement('div');
    const del = document.createElement('button');

    del.innerHTML = del.className = 'delete';
    del.onclick = onDelete;

    item.onclick = onSelect;
    item.innerHTML = label;
    item.className = active ? 'active item' : 'item';
    item.appendChild(del);

    return item;
}

const byCSS = (css) => document.querySelector(css);

async function app({ apiUrl }) {
    async function api(method, url, body) {
        const request = await fetch(`${apiUrl}${url}`, {
            method,
            body: body ? JSON.stringify(body) : null,
            headers: { 'content-type': 'application/json' },
        });

        const data = await request.json();

        if (!request.ok) {
            throw data;
        } else {
            return data;
        }
    }

    const DOM = {
        lists: {
            section: byCSS('#lists'),
            list: byCSS('#lists .list'),
            name: byCSS('#list-name'),
            add: byCSS('#list-add'),
        },
        todos: {
            section: byCSS('#todos'),
            list: byCSS('#todos .list'),
            details: byCSS('#todo-details'),
            add: byCSS('#todo-add'),
        },
    };

    const lists = await api('GET', '/lists');
    let selected = null;

    const selectList = (list) => async (e) => {
        if (selected === list.id) return;

        const data = await api('GET', `/lists/${list.id}`);
        selected = data.id;
        [...DOM.lists.list.querySelectorAll('.active')].forEach(e => e.classList.remove('active'));
        e.target.classList.add('active');
        showTodos(data.tasks);
    };

    const deleteList = (list) => async (e) => {
        e.stopPropagation();
        if (selected === list.id) {
            selected = null;
            DOM.todos.section.classList.add('hide');
        }

        await api('DELETE', `/lists/${list.id}`);

        remove(e.target.parentElement);
    };

    attach(DOM.lists.list, ...lists.map(list => listItem(
        list.name, false, selectList(list), deleteList(list)
    )));

    const toggleTodo = (todo) => async (e) => {
        await api('PUT', `/lists/${selected}/task/${todo.id}`, {
            details: todo.details,
            status: !todo.status,
        });

        todo.status = !todo.status;
        e.target.classList.toggle('active');
    };

    const deleteTodo = (todo) => async (e) => {
        e.stopPropagation();

        await api('DELETE', `/lists/${selected}/task/${todo.id}`);

        remove(e.target.parentElement);
    };

    function showTodos(todos) {
        empty(DOM.todos.list);
        attach(DOM.todos.list, ...todos.map(todo => listItem(
            todo.details, !todos.status, toggleTodo(todo), deleteTodo(todo)
        )));
        DOM.todos.section.classList.remove('hide');
    }

    DOM.lists.name.oninput = (e) => setAttr(DOM.lists.add, 'disabled', !e.target.value);
    DOM.todos.details.oninput = (e) => setAttr(DOM.todos.add, 'disabled', !e.target.value);

    DOM.lists.add.onclick = async () => {
        const list = await api('POST', '/lists', { name: DOM.lists.name.value });
        DOM.lists.name.value = '';
        setAttr(DOM.lists.add, 'disabled', true);

        attach(DOM.lists.list, listItem(list.name, false, selectList(list), deleteList(list)));
    };

    DOM.todos.add.onclick = async () => {
        const todo = await api('POST', `/lists/${selected}/task`, { details: DOM.todos.details.value });
        DOM.todos.details.value = '';
        setAttr(DOM.lists.add, 'disabled', true);

        attach(DOM.todos.list, listItem(todo.details, !todo.status, toggleTodo(todo), deleteTodo(todo)));
    };
}

async function run() {
    const res = await fetch('/config.json');
    const config = await res.json();

    app(config);
}

window.onload = run;
