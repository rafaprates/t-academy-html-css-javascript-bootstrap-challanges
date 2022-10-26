var marcas = [];
var produtos = [];
var usuariosRegistrados = [];

usuario = {
  userName: "admin",
  password: "admin",
};

usuariosRegistrados.push(usuario);
localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));

function autenticarUsuario() {
  document.getElementById("btn-login").checkValidity();
  document.getElementById("btn-login").reportValidity();

  var userName = document.getElementById("userName").value;
  var password = document.getElementById("password").value;

  let acessoGarantido = false;
  let usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios"));

  for (ur of usuariosRegistrados) {
    if (userName == ur.userName && password == ur.password) {
      window.location.href =
        "http://127.0.0.1:5500/pages/challange-15/gerenciar-marcas.html";
      acessoGarantido = true;
      break;
    }
  }

  if (!acessoGarantido) {
    document
      .getElementById("usuario-nao-encontrado")
      .classList.remove("invisible");
    document.getElementById("usuario-nao-encontrado").classList.add("visible");
    if (localStorage.getItem("tentativasLogin") == null) {
      localStorage.setItem("tentativasLogin", 1);
    } else {
      var tentativasLogin = localStorage.getItem("tentativasLogin");
      localStorage.setItem("tentativasLogin", ++tentativasLogin);
    }

    if (tentativasLogin >= 3) {
      document.getElementById("btn-login").classList.add("disabled");
      setTimeout(() => {
        document.getElementById("btn-login").classList.remove("disabled");
        localStorage.setItem("tentativasLogin", 0);
      }, 3000);
    }
  }
}

function cadastrarMarca() {
  // carregar o array marcas com os items do localStorage
  console.log("storageMarcas: " + localStorage.getItem("marcas"));
  if (localStorage.getItem("marcas") != null) {
    console.log("entrou aqui!");
    marcas = JSON.parse(localStorage.getItem("marcas"));
    console.log(produtos);
  }

  document.getElementById("btn-cadastrar-marca").checkValidity();
  document.getElementById("btn-cadastrar-marca").reportValidity();

  var nomeMarca = document.getElementById("nomeMarca").value;

  if (validarNomeMarca(nomeMarca)) {
    marcas.push({
      nomeMarca: nomeMarca,
    });
    localStorage.setItem("marcas", JSON.stringify(marcas));
  }

  adicionarMarcaATabela();
}

function cadastrarProduto() {
  // carregar o array produtos com os items do localStorage
  if (localStorage.getItem("produtos") != null) {
    produtos = JSON.parse(localStorage.getItem("produtos"));
  }

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
  if (nomeMarca.length > 2 && !existeMarca(nomeMarca)) {
    return true;
  }
  return false;
}

function adicionarMarcaATabela() {
  if (localStorage.getItem("marcas") != null) {
    marcas = JSON.parse(localStorage.getItem("marcas"));
  }
  // var storageMarcas = localStorage.getItem("marcas");
  // storageMarcas = JSON.parse(storageMarcas);

  var dados = "";
  for (m of marcas) {
    dados += `<tr>
              <td>${m.nomeMarca}</td>
              <td><button onclick="excluirMarca(${marcas.indexOf(
                m
              )})" class="btn btn-outline-danger btn-sm">Excluir</button></td>
              </tr>`;
  }

  document.getElementsByTagName("tbody")[0].innerHTML = dados;
}

function adicionarProdutoATabela() {
  if (localStorage.getItem("produtos") != null) {
    produtos = JSON.parse(localStorage.getItem("produtos"));
  }
  // var storageProdutos = localStorage.getItem("produtos");
  // storageProdutos = JSON.parse(storageProdutos);

  var dados = "";
  for (p of produtos) {
    dados += `<tr>
              <td>${p.nome}</td>
              <td>${p.marca}</td>
              <td>${p.preco}</td>
              <td><button onclick="excluirProduto(${produtos.indexOf(
                p
              )})" class="btn btn-outline-danger btn-sm">Excluir</button></td>
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

function excluirMarca(index) {
  // Validar se existe produto associado
  marcas = JSON.parse(localStorage.getItem("marcas"));

  let nomeMarca = marcas[index].nomeMarca;
  if (!existeProdutoAssociadoMarca(nomeMarca)) {
    marcas.splice(index, 1);
    localStorage.setItem("marcas", JSON.stringify(marcas));
    adicionarMarcaATabela();
  } else {
    alert("Marca associada a produto.");
  }
}

function excluirProduto(index) {
  produtos.splice(index, 1);
  localStorage.setItem("produtos", JSON.stringify(produtos));
  adicionarProdutoATabela();
}

function existeMarca(nome) {
  for (m of marcas) {
    if (m.nomeMarca == nome) {
      return true;
    }
  }
  return false;
}

function existeProdutoAssociadoMarca(nomeMarca) {
  marcas = JSON.parse(localStorage.getItem("marcas"));
  produtos = JSON.parse(localStorage.getItem("produtos"));
  for (p of produtos) {
    console.log(p.marca);
    if (p.marca == nomeMarca) {
      return true;
    }
  }
  return false;
}
