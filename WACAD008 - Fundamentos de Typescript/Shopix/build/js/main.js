"use strict";
var _a, _b, _c;
class ProdutoBase {
    constructor(modelo, fabricante, valor, imagem) {
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.valor = valor;
        this.imagem = imagem;
    }
    getModelo() {
        return this.modelo;
    }
    getFabricante() {
        return this.fabricante;
    }
    getValor() {
        return this.valor;
    }
    getImagem() {
        return this.imagem;
    }
}
class TV extends ProdutoBase {
    constructor(modelo, fabricante, valor, imagem, tamanho) {
        super(modelo, fabricante, valor, imagem);
        this.tamanho = tamanho;
    }
    descricao() {
        return `${this.fabricante} ${this.modelo} - ${this.tamanho}"`;
    }
}
class Celular extends ProdutoBase {
    constructor(modelo, fabricante, valor, imagem, armazenamento) {
        super(modelo, fabricante, valor, imagem);
        this.armazenamento = armazenamento;
    }
    descricao() {
        return `${this.fabricante} ${this.modelo} - ${this.armazenamento}GB`;
    }
}
class Bicicleta extends ProdutoBase {
    constructor(modelo, fabricante, valor, imagem, tipo) {
        super(modelo, fabricante, valor, imagem);
        this.tipo = tipo;
    }
    descricao() {
        return `${this.fabricante} ${this.modelo} - ${this.tipo}`;
    }
}
class Carrinho {
    constructor() {
        this.itens = [];
    }
    adicionar(item) {
        this.itens.push(item);
        console.log("Produto adicionado:", item.descricao(), " | Valor:", item.getValor());
    }
    remover(index) {
        const removido = this.itens[index];
        this.itens.splice(index, 1);
        console.log("Produto removido:", removido.descricao());
    }
    listar() {
        return this.itens;
    }
    calcularTotal() {
        const total = this.itens.reduce((total, item) => total + item.getValor(), 0);
        console.log("Total calculado:", total);
        return total;
    }
}
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}
class CarrinhoUI {
    constructor(carrinho) {
        this.carrinho = carrinho;
        this.lista = document.getElementById("lista-produtos");
        this.total = document.getElementById("total");
        this.template = document.getElementById("template-item");
    }
    atualizar() {
        console.log("Atualizando carrinho...");
        this.lista.innerHTML = "";
        this.carrinho.listar().forEach((p, i) => {
            const fragment = this.template.content.cloneNode(true);
            fragment.querySelector(".produto-img").src = p.getImagem();
            fragment.querySelector(".produto-img").alt = p.getModelo();
            fragment.querySelector(".produto-desc").textContent = p.descricao();
            fragment.querySelector(".produto-preco").textContent = formatarPreco(p.getValor());
            // Botão remover
            const btnRemover = fragment.querySelector(".btn-remove");
            btnRemover.addEventListener("click", () => {
                this.carrinho.remover(i);
                this.atualizar();
            });
            this.lista.appendChild(fragment);
        });
        this.total.textContent = formatarPreco(this.carrinho.calcularTotal());
    }
}
const carrinho = new Carrinho();
const ui = new CarrinhoUI(carrinho);
(_a = document.getElementById("btn-tv")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const tv = new TV("Smart TV LG", "LG", 3500, "https://a-static.mlcdn.com.br/800x560/smart-tv-lg-55-4k-uhd-pro-hdr-thinq-ai-wi-fi-bluetooth-55ut801c0sa-bwz/inpower4/7207/c4a760eb3a5a316412f632c61e0c4b3c.jpeg", 55);
    carrinho.adicionar(tv);
    ui.atualizar();
});
(_b = document.getElementById("btn-celular")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    const celular = new Celular("Galaxy S22", "Samsung", 2800, "https://infostore.vtexassets.com/arquivos/ids/267943-1200-auto?v=638888841073070000&width=1200&height=auto&aspect=true", 128);
    carrinho.adicionar(celular);
    ui.atualizar();
});
(_c = document.getElementById("btn-bicicleta")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    const bike = new Bicicleta("Speedster", "Caloi", 1200, "https://imgs.extra.com.br/1536505942/1xg.jpg?imwidth=1000", "Aro 29");
    carrinho.adicionar(bike);
    ui.atualizar();
});
