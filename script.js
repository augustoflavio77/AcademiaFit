const clientForm = document.getElementById('clientForm');
const clientList = document.getElementById('clientList');
const editIndex = document.getElementById('editIndex');
const formTitle = document.getElementById('form-title');
const searchInput = document.getElementById('search');
const totalClients = document.getElementById('totalClients');

function getClients() {
  return JSON.parse(localStorage.getItem('clients')) || [];
}

function saveClients(clients) {
  localStorage.setItem('clients', JSON.stringify(clients));
}

function renderClients(filter = "") {
  const clients = getClients();
  const filteredClients = clients.filter(c => c.nome.toLowerCase().includes(filter.toLowerCase()));

  clientList.innerHTML = '';
  filteredClients.forEach((client, index) => {
    clientList.innerHTML += `
      <tr>
        <td>${client.nome}</td>
        <td>${client.idade}</td>
        <td>${client.plano}</td>
        <td>${client.contato}</td>
        <td class="text-center">
          <button class="btn btn-warning btn-sm me-2" onclick="editClient(${index})">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteClient(${index})">
            <i class="bi bi-trash-fill"></i>
          </button>
        </td>
      </tr>
    `;
  });

  totalClients.textContent = filteredClients.length;
}

clientForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const plano = document.getElementById('plano').value;
  const contato = document.getElementById('contato').value;

  let clients = getClients();

  if (editIndex.value === '') {
    clients.push({ nome, idade, plano, contato });
  } else {
    clients[editIndex.value] = { nome, idade, plano, contato };
    editIndex.value = '';
    formTitle.innerHTML = `<i class="bi bi-person-plus-fill"></i> Cadastrar Cliente`;
  }

  saveClients(clients);
  renderClients();
  clientForm.reset();
});

function editClient(index) {
  const client = getClients()[index];
  document.getElementById('nome').value = client.nome;
  document.getElementById('idade').value = client.idade;
  document.getElementById('plano').value = client.plano;
  document.getElementById('contato').value = client.contato;
  editIndex.value = index;
  formTitle.innerHTML = `<i class="bi bi-pencil-fill"></i> Editar Cliente`;
}

function deleteClient(index) {
  if (confirm('Deseja realmente excluir este cliente?')) {
    let clients = getClients();
    clients.splice(index, 1);
    saveClients(clients);
    renderClients();
  }
}

searchInput.addEventListener('input', (e) => {
  renderClients(e.target.value);
});

renderClients();
