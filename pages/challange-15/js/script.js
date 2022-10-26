var marcas = [];
var produtos = [];

function authenticateUser() {
  var userName = document.getElementById("userName").value;
  var password = document.getElementById("password").value;

  user = {
    userName: userName,
    password: password,
  };

  localStorage.setItem("user", user);

  console.log(userName);
  console.log(password);
}

export function cadastrarMarca() {
  var nomeMarca = document.getElementById("nomeMarca").value;

  if (validarNomeMarca(nomeMarca)) {
    cadastrar(nomeMarca);
    // console.log(nomeMarca);
    // marcas.push({
    // nomeMarca: nomeMarca,
    // });
    // localStorage.setItem("marcas", JSON.stringify(marcas));
  }

  adicionarMarcaATabela();
}

function cadastrarProduto() {
  var nomeProduto = document.getElementById("nomeProduto").value;
  var marcaProduto = document.getElementById("marcaProduto").value;
  var precoProduto = document.getElementById("precoProduto").value;

  var produto = {
    nome: nomeProduto,
    marca: marcaProduto,
    preco: precoProduto,
  };

  produtos.push(produto);

  localStorage.setItem("produtos", JSON.stringify(produtos));

  adicionarProdutoATabela();

  console.log(produto);
}

function validarNomeMarca(nomeMarca) {
  let storageMarcas = JSON.parse(localStorage.getItem("marcas"));

  if (nomeMarca.length > 2) {
    return true;
  }
  return false;
}

function adicionarMarcaATabela() {
  var storageMarcas = localStorage.getItem("marcas");
  storageMarcas = JSON.parse(storageMarcas);

  var dados = "";
  for (m of storageMarcas) {
    dados += `<tr><td>${m.nomeMarca}</td></tr>`;
  }

  document.getElementsByTagName("tbody")[0].innerHTML = dados;
}

function adicionarProdutoATabela() {
  var storageProdutos = localStorage.getItem("produtos");
  storageProdutos = JSON.parse(storageProdutos);

  var dados = "";
  for (p of storageProdutos) {
    dados += `<tr>
              <td>${p.nome}</td>
              <td>${p.marca}</td>
              <td>${p.preco}</td>
              <td></td>
              </tr>`;
  }

  document.getElementsByTagName("tbody")[0].innerHTML = dados;
}

function addOpcoesDeMarcas() {
  var storageMarcas = localStorage.getItem("marcas");
  storageMarcas = JSON.parse(storageMarcas);

  var opcoes = `<option value=''>Selecione uma marca</option>`;
  for (m of storageMarcas) {
    opcoes += `<option value='${m.nomeMarca}'>${m.nomeMarca}</option>`;
  }

  document.getElementById("marcaProduto").innerHTML = opcoes;
}
