import { ClienteRepository } from "./cliente";

async function main() {
  //criar
  const novo = await ClienteRepository.create({
    nome: "Ana Souza",
    cpf: "11122233344",
    email: "ana@email.com",
    celular: "11988887777",
    data_nascimento: new Date("1995-03-20"),
  });
  console.log("Criado:", novo);
  //ler
  const todos = await ClienteRepository.findAll();
  console.log("Todos os clientes:", todos);

  const unico = await ClienteRepository.findById(novo.id_cliente);
  console.log("Encontrado por ID:", unico);

  //atualizar
  const atualizado = await ClienteRepository.update(novo.id_cliente, {
    nome: "Ana Maria Souza",
  });
  console.log("Atualizado:", atualizado);

  //deletar
  const deletado = await ClienteRepository.delete(novo.id_cliente);
  console.log("Deletado:", deletado);

  
}

main()
  .catch((e) => console.error(e))
  .finally(() => process.exit(0));
