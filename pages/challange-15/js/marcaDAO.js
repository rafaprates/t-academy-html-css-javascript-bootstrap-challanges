var marcas = [{}];

export function cadastrar(nome) {
  marcas.push({
    nome: nome,
  });
  localStorage.setItem("marcas", JSON.stringify(marcas));
}

// function remover(nome) {}

// function existe(nome) {}
