const { verificarDisponibilidadeEstoque } = require('../validacoes')

describe("Função verificarDisponibilidadeEstoque", () => {
  it("deve confirmar quando há estoque suficiente para o produto", () => {
    expect(verificarDisponibilidadeEstoque("laptop", 5)).toBe(true)
  })

  it("deve indicar indisponibilidade quando o estoque for menor que o pedido", () => {
    expect(verificarDisponibilidadeEstoque("headphone", 6)).toBe(false)
  })

  it("deve retornar false quando o produto não existir no estoque", () => {
    expect(verificarDisponibilidadeEstoque("camera", 1)).toBe(false)
  })

  it("deve retornar false quando o produto existir mas estiver sem unidades", () => {
    expect(verificarDisponibilidadeEstoque("livro", 1)).toBe(false)
  })

  it("deve retornar false quando a quantidade solicitada for zero ou negativa", () => {
    expect(verificarDisponibilidadeEstoque("tablet", 0)).toBe(false)
    expect(verificarDisponibilidadeEstoque("tablet", -2)).toBe(false)
  })
})
