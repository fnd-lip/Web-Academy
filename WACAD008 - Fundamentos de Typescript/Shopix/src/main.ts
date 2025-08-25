interface Produto {
  getModelo(): string
  getFabricante(): string
  getValor(): number
  getImagem(): string
  descricao(): string
}

abstract class ProdutoBase implements Produto {
  constructor(
    protected modelo: string,
    protected fabricante: string,
    protected valor: number,
    protected imagem: string
  ) {}

  getModelo(): string {
    return this.modelo
  }

  getFabricante(): string {
    return this.fabricante
  }

  getValor(): number {
    return this.valor
  }

  getImagem(): string {
    return this.imagem
  }

  abstract descricao(): string
}

class TV extends ProdutoBase {
  constructor(
    modelo: string,
    fabricante: string,
    valor: number,
    imagem: string,
    private tamanho: number
  ) {
    super(modelo, fabricante, valor, imagem)
  }

  descricao(): string {
    return `${this.fabricante} ${this.modelo} - ${this.tamanho}"`
  }
}

class Celular extends ProdutoBase {
  constructor(
    modelo: string,
    fabricante: string,
    valor: number,
    imagem: string,
    private armazenamento: number
  ) {
    super(modelo, fabricante, valor, imagem)
  }

  descricao(): string {
    return `${this.fabricante} ${this.modelo} - ${this.armazenamento}GB`
  }
}

class Bicicleta extends ProdutoBase {
  constructor(
    modelo: string,
    fabricante: string,
    valor: number,
    imagem: string,
    private tipo: string
  ) {
    super(modelo, fabricante, valor, imagem)
  }

  descricao(): string {
    return `${this.fabricante} ${this.modelo} - ${this.tipo}`
  }
}

class Carrinho<T extends Produto> {
  private itens: T[] = []

  adicionar(item: T): void {
    this.itens.push(item)
    console.log("Produto adicionado:", item.descricao(), " | Valor:", item.getValor())
  }

  remover(index: number): void {
    const removido = this.itens[index]
    this.itens.splice(index, 1)
    console.log("Produto removido:", removido.descricao())
  }

  listar(): T[] {
    return this.itens
  }

  calcularTotal(): number {
    const total = this.itens.reduce((total, item) => total + item.getValor(), 0)
    console.log("Total calculado:", total)
    return total
  }
}

function formatarPreco(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
}

class CarrinhoUI {
  private lista = document.getElementById("lista-produtos") as HTMLElement
  private total = document.getElementById("total") as HTMLElement
  private template = document.getElementById("template-item") as HTMLTemplateElement

  constructor(private carrinho: Carrinho<Produto>) {}

  atualizar() {
    console.log("Atualizando carrinho...")
    this.lista.innerHTML = ""

    this.carrinho.listar().forEach((p, i) => {
      const fragment = this.template.content.cloneNode(true) as DocumentFragment

      // Preenche os campos
      ;(fragment.querySelector(".produto-img") as HTMLImageElement).src = p.getImagem()
      ;(fragment.querySelector(".produto-img") as HTMLImageElement).alt = p.getModelo()
      ;(fragment.querySelector(".produto-desc") as HTMLElement).textContent = p.descricao()
      ;(fragment.querySelector(".produto-preco") as HTMLElement).textContent = formatarPreco(p.getValor())

      // Botão remover
      const btnRemover = fragment.querySelector(".btn-remove") as HTMLButtonElement
      btnRemover.addEventListener("click", () => {
        this.carrinho.remover(i)
        this.atualizar()
      })

      this.lista.appendChild(fragment)
    })

    this.total.textContent = formatarPreco(this.carrinho.calcularTotal())
  }
}

const carrinho = new Carrinho<Produto>()
const ui = new CarrinhoUI(carrinho)

document.getElementById("btn-tv")?.addEventListener("click", () => {
  const tv = new TV(
    "Smart TV LG",
    "LG",
    3500,
    "https://a-static.mlcdn.com.br/800x560/smart-tv-lg-55-4k-uhd-pro-hdr-thinq-ai-wi-fi-bluetooth-55ut801c0sa-bwz/inpower4/7207/c4a760eb3a5a316412f632c61e0c4b3c.jpeg",
    55
  )
  carrinho.adicionar(tv)
  ui.atualizar()
})

document.getElementById("btn-celular")?.addEventListener("click", () => {
  const celular = new Celular(
    "Galaxy S22",
    "Samsung",
    2800,
    "https://infostore.vtexassets.com/arquivos/ids/267943-1200-auto?v=638888841073070000&width=1200&height=auto&aspect=true",
    128
  )
  carrinho.adicionar(celular)
  ui.atualizar()
})

document.getElementById("btn-bicicleta")?.addEventListener("click", () => {
  const bike = new Bicicleta(
    "Speedster",
    "Caloi",
    1200,
    "https://imgs.extra.com.br/1536505942/1xg.jpg?imwidth=1000",
    "Aro 29"
  )
  carrinho.adicionar(bike)
  ui.atualizar()
})
