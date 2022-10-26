// solução professor

const produtos = [{}];

function add(cDisplay) {
  let descricao = document.querySelector("input[name=descricao]").value;
  let preco = parseFloat(document.querySelector("input[name=preco]").value);
  let estoque = parseInt(document.querySelector("input[name=estoque]").value);
  let unMedida = document.querySelector("input[name=unidade-medida]").value;

  if (dadosValidos()) {
    item = {
      descricao: descricao,
      preco: preco,
      estoque: estoque,
      unMedida: unMedida,
    };
    produtos.push(item);
    cDisplay();
  }

  console.log(produtos);
}

function dadosValidos() {
  let descricao = document.querySelector("input[name=descricao]").value;
  let preco = parseFloat(document.querySelector("input[name=preco]").value);
  let estoque = parseInt(document.querySelector("input[name=estoque]").value);
  let unMedida = document.querySelector("input[name=unidade-medida]").value;

  if (descricao == "") {
    alert("Descrição deve ser informada.");
    document.querySelector("input[name=descricao]").focus();
    return false;
  }
  return true;
}

function showTable() {
  var txt = "";

  for (let i = 0; i < produtos.length; i++) {
    txt += `<tr>
              <td>${produtos[i].descricao}
              <td>${produtos[i].preco}
              <td>${produtos[i].estoque}
              <td>${produtos[i].unMedida}
            </tr>`;
  }

  document.getElementsByTagName("tbody")[0].innerHTML = txt;
}
