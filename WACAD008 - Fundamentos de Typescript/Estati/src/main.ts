type Aluno = {
  id: number
  nome: string
  idade: number
  altura: number
  peso: number
};

class Turma {
  private alunos: Aluno[] = []

  constructor(public readonly id: number, public nome: string) {
    console.log(`Turma criada: id=${id}, nome=${nome}`)
  }

  adicionar(aluno: Aluno) {
    console.log("Adicionando aluno:", aluno)
    this.alunos.push(aluno)
    this.atualizar()
  }

  editar(id: number, dados: Partial<Aluno>) {
    console.log(`Editando aluno com id=${id}`, dados)
    const aluno = this.alunos.find(a => a.id === id)
    if (aluno) {
      Object.assign(aluno, dados)
      console.log("Aluno atualizado:", aluno) 
    }
    this.atualizar()
  }

  remover(id: number) {
    console.log(`Removendo aluno com id=${id}`)
    this.alunos = this.alunos.filter(a => a.id !== id)
    this.atualizar()
  }

  get qtd() { return this.alunos.length; }
  get mediaIdade() { return this.media("idade"); }
  get mediaAltura() { return this.media("altura"); }
  get mediaPeso() { return this.media("peso"); }
  get lista() { return [...this.alunos]; } 

  private media(prop: keyof Aluno): number {
    const valores = this.alunos.map(a => a[prop] as number);
    return valores.length
      ? valores.reduce((s, v) => s + v, 0) / valores.length
      : 0;
  }

  private atualizar() {
    console.log("Atualizando dados da turma...", this.qtd);
    (document.getElementById("numAlunos") as HTMLElement).innerText = this.qtd.toString();
    (document.getElementById("mediaIdades") as HTMLElement).innerText = this.mediaIdade.toFixed(1);
    (document.getElementById("mediaAlturas") as HTMLElement).innerText = this.mediaAltura.toFixed(2);
    (document.getElementById("mediaPesos") as HTMLElement).innerText = this.mediaPeso.toFixed(1);

    const tabela = document.getElementById("tabela-alunos") as HTMLElement;
    tabela.innerHTML = ""; 

    this.alunos.forEach(a => {
      const tr = document.createElement("tr");

      const tdNome = document.createElement("td");
      tdNome.innerText = a.nome;

      const tdIdade = document.createElement("td");
      tdIdade.innerText = a.idade.toString();

      const tdAltura = document.createElement("td");
      tdAltura.innerText = a.altura.toFixed(2);

      const tdPeso = document.createElement("td");
      tdPeso.innerText = a.peso.toFixed(1);

      const tdAcoes = document.createElement("td");
      tdAcoes.classList.add("text-center");

      const btnEditar = document.createElement("button");
      btnEditar.className = "btn btn-sm btn-warning me-1";
      btnEditar.innerText = "Editar";
      btnEditar.addEventListener("click", () => this.abrirEdicao(a));

      const btnRemover = document.createElement("button");
      btnRemover.className = "btn btn-sm btn-danger";
      btnRemover.innerText = "Remover";
      btnRemover.addEventListener("click", () => this.remover(a.id));

      tdAcoes.appendChild(btnEditar);
      tdAcoes.appendChild(btnRemover);

      tr.appendChild(tdNome);
      tr.appendChild(tdIdade);
      tr.appendChild(tdAltura);
      tr.appendChild(tdPeso);
      tr.appendChild(tdAcoes);

      tabela.appendChild(tr);
    });
  }
  private abrirEdicao(a: Aluno) {
    console.log("Abrindo edição do aluno:", a);
    (document.getElementById("editId") as HTMLInputElement).value = a.id.toString();
    (document.getElementById("editNome") as HTMLInputElement).value = a.nome;
    (document.getElementById("editIdade") as HTMLInputElement).value = a.idade.toString();
    (document.getElementById("editAltura") as HTMLInputElement).value = a.altura.toString();
    (document.getElementById("editPeso") as HTMLInputElement).value = a.peso.toString();

    new (window as any).bootstrap.Modal(document.getElementById("modalEditar")).show();
  }
}

async function gerarAlunoAleatorio(): Promise<Aluno> {
  const res = await fetch("https://randomuser.me/api/?nat=br");
  const { results } = await res.json();
  const u = results[0];

  return {
    id: Date.now(), 
    nome: `${u.name.first} ${u.name.last}`,
    idade: Math.floor(Math.random() * 10) + 15, 
    altura: 1.5 + Math.random() * 0.5,          
    peso: Math.floor(50 + Math.random() * 50)   
  };
}

const turma = new Turma(1, "X");

document.getElementById("add")?.addEventListener("click", async () => {
  turma.adicionar(await gerarAlunoAleatorio());
});

document.getElementById("formEditar")?.addEventListener("submit", (e) => {
  e.preventDefault()

  const id = Number((document.getElementById("editId") as HTMLInputElement).value);
  turma.editar(id, {
    nome: (document.getElementById("editNome") as HTMLInputElement).value,
    idade: Number((document.getElementById("editIdade") as HTMLInputElement).value),
    altura: Number((document.getElementById("editAltura") as HTMLInputElement).value),
    peso: Number((document.getElementById("editPeso") as HTMLInputElement).value),
  });
  
  (window as any).bootstrap.Modal.getInstance(document.getElementById("modalEditar")).hide();
});

