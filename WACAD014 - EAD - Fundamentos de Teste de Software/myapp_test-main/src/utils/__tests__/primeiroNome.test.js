const { primeiroNome } = require('../validacoes')

describe('Função primeiroNome', () => {
  it('deve retornar o primeiro nome quando receber um nome completo', () => {
    expect(primeiroNome('Maria Fernanda Souza')).toBe('Maria')
  })

  it('deve retornar o nome original quando não houver espaços', () => {
    expect(primeiroNome('Maria')).toBe('Maria')
  })

  it('deve considerar apenas o primeiro nome mesmo com múltiplos espaços', () => {
    expect(primeiroNome('Carlos Eduardo Silva')).toBe('Carlos')
  })
})

