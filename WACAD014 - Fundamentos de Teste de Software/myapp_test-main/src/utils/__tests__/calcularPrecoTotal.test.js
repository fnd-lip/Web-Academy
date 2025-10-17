const { calcularPrecoTotal } = require("../validacoes")

describe("Função calcularPrecoTotal", () => {
  it("deve somar corretamente o valor total dos produtos", () => {
    const produtos = [
      { nome: "Produto 1", preco: 10, quantidade: 2 },
      { nome: "Produto 2", preco: 15, quantidade: 2 },
      { nome: "Produto 3", preco: 20, quantidade: 1 },
    ]
    expect(calcularPrecoTotal(produtos)).toBe(70)
  })

  it("deve retornar 0 quando a lista de produtos estiver vazia", () => {
    expect(calcularPrecoTotal([])).toBe(0)
  })

  it("deve ignorar produtos com valores inválidos", () => {
    const produtos = [
      { nome: "Produto 1", preco: "abc", quantidade: 2 },
      { nome: "Produto 2", preco: 10, quantidade: null },
    ]
    expect(calcularPrecoTotal(produtos)).toBe(0)
  })

  it("deve calcular corretamente valores com preços decimais", () => {
    const produtos = [
      { nome: "Produto 1", preco: 9.99, quantidade: 3 },
      { nome: "Produto 2", preco: 14.5, quantidade: 2 },
    ];
    expect(calcularPrecoTotal(produtos)).toBeCloseTo(58.97)
  })
})
