"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
class Turma {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
        this.alunos = [];
        console.log(`Turma criada: id=${id}, nome=${nome}`);
    }
    adicionar(aluno) {
        console.log("Adicionando aluno:", aluno);
        this.alunos.push(aluno);
        this.atualizar();
    }
    editar(id, dados) {
        console.log(`Editando aluno com id=${id}`, dados);
        const aluno = this.alunos.find(a => a.id === id);
        if (aluno) {
            Object.assign(aluno, dados);
            console.log("Aluno atualizado:", aluno);
        }
        this.atualizar();
    }
    remover(id) {
        console.log(`Removendo aluno com id=${id}`);
        this.alunos = this.alunos.filter(a => a.id !== id);
        this.atualizar();
    }
    get qtd() { return this.alunos.length; }
    get mediaIdade() { return this.media("idade"); }
    get mediaAltura() { return this.media("altura"); }
    get mediaPeso() { return this.media("peso"); }
    get lista() { return [...this.alunos]; }
    media(prop) {
        const valores = this.alunos.map(a => a[prop]);
        return valores.length
            ? valores.reduce((s, v) => s + v, 0) / valores.length
            : 0;
    }
    atualizar() {
        console.log("Atualizando dados da turma...", this.qtd);
        document.getElementById("numAlunos").innerText = this.qtd.toString();
        document.getElementById("mediaIdades").innerText = this.mediaIdade.toFixed(1);
        document.getElementById("mediaAlturas").innerText = this.mediaAltura.toFixed(2);
        document.getElementById("mediaPesos").innerText = this.mediaPeso.toFixed(1);
        const tabela = document.getElementById("tabela-alunos");
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
    abrirEdicao(a) {
        console.log("Abrindo edição do aluno:", a);
        document.getElementById("editId").value = a.id.toString();
        document.getElementById("editNome").value = a.nome;
        document.getElementById("editIdade").value = a.idade.toString();
        document.getElementById("editAltura").value = a.altura.toString();
        document.getElementById("editPeso").value = a.peso.toString();
        new window.bootstrap.Modal(document.getElementById("modalEditar")).show();
    }
}
function gerarAlunoAleatorio() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("https://randomuser.me/api/?nat=br");
        const { results } = yield res.json();
        const u = results[0];
        return {
            id: Date.now(),
            nome: `${u.name.first} ${u.name.last}`,
            idade: Math.floor(Math.random() * 10) + 15,
            altura: 1.5 + Math.random() * 0.5,
            peso: Math.floor(50 + Math.random() * 50)
        };
    });
}
const turma = new Turma(1, "X");
(_a = document.getElementById("add")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    turma.adicionar(yield gerarAlunoAleatorio());
}));
(_b = document.getElementById("formEditar")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("editId").value);
    turma.editar(id, {
        nome: document.getElementById("editNome").value,
        idade: Number(document.getElementById("editIdade").value),
        altura: Number(document.getElementById("editAltura").value),
        peso: Number(document.getElementById("editPeso").value),
    });
    window.bootstrap.Modal.getInstance(document.getElementById("modalEditar")).hide();
});
