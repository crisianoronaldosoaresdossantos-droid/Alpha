// Pegamos os elementos do HTML para poder usá-los no JavaScript.
const formulario = document.querySelector('#form-item');
const campoNome = document.querySelector('#nome');
const campoId = document.querySelector('#id-item');
const listaItens = document.querySelector('#lista-itens');
const mensagem = document.querySelector('#mensagem');

// Este array guarda os itens enquanto a página está aberta.
// Cada objeto terá o formato: { nome: 'Caderno', id: '001' }.
const itens = [];

// A função recebe um texto e define se ele é de sucesso ou de erro.
function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = tipo;
}

// A função desenha novamente a lista sempre que um item é adicionado.
function renderizarItens() {
  listaItens.innerHTML = '';

  itens.forEach((item) => {
    const linha = document.createElement('li');
    const nome = document.createElement('strong');
    const id = document.createElement('span');

    // textContent exibe somente texto e evita que algo digitado vire código HTML.
    nome.textContent = item.nome;
    id.textContent = `ID: ${item.id}`;

    linha.append(nome, id);
    listaItens.appendChild(linha);
  });
}

// O evento submit acontece quando o botão do formulário é clicado.
formulario.addEventListener('submit', (evento) => {
  // Impede a página de recarregar, que é o comportamento padrão de um formulário.
  evento.preventDefault();

  // trim() remove espaços antes e depois do texto digitado.
  const nome = campoNome.value.trim();
  const id = campoId.value.trim();

  // Verifica se já existe algum item com o mesmo ID.
  const idJaExiste = itens.some((item) => item.id === id);

  if (idJaExiste) {
    mostrarMensagem('Este ID já está cadastrado. Escolha outro.', 'erro');
    return;
  }

  // Cria o novo objeto, adiciona-o ao array e atualiza a tela.
  itens.push({ nome, id });
  renderizarItens();
  mostrarMensagem('Item adicionado com sucesso!', 'sucesso');

  // Limpa os campos e devolve o foco ao primeiro campo.
  formulario.reset();
  campoNome.focus();
});
