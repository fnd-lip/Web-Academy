"use strict";
let lembretes = [];
const form = document.getElementById("form");
const lista = document.getElementById("lista");
form.onsubmit = e => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    if (!titulo)
        return;
    lembretes.push([Date.now(), titulo, new Date(), descricao || undefined]);
    renderizar();
    form.reset();
};
function criarElemento(tag, classes, html) {
    const el = document.createElement(tag);
    if (classes)
        el.className = classes;
    if (html)
        el.innerHTML = html;
    return el;
}
function renderizar() {
    lista.innerHTML = "";
    lembretes.forEach(([id, titulo, criadoEm, descricao]) => {
        const card = criarElemento("div", "card shadow h-100");
        card.append(criarElemento("div", "card-header fw-bold text-truncate", titulo), (() => {
            const body = criarElemento("div", "card-body");
            if (descricao)
                body.appendChild(criarElemento("p", "card-text", descricao));
            body.appendChild(criarElemento("p", "card-subtitle text-muted small", "Criado em: " + criadoEm.toLocaleString()));
            return body;
        })(), (() => {
            const footer = criarElemento("div", "card-footer d-flex justify-content-between");
            const btn = (c, i, f) => {
                const b = criarElemento("button", c, i);
                b.onclick = f;
                return b;
            };
            footer.append(btn("btn btn-sm btn-outline-warning", "<i class='bi bi-pencil-square'></i> Editar", () => editar(id)));
            footer.append(btn("btn btn-sm btn-outline-danger", "<i class='bi bi-trash'></i> Excluir", () => excluir(id)));
            return footer;
        })());
        const col = criarElemento("div", "col");
        col.appendChild(card);
        lista.appendChild(col);
    });
}
const excluir = (id) => (lembretes = lembretes.filter(([i]) => i !== id), renderizar());
const editar = (id) => {
    const l = lembretes.find(([i]) => i === id);
    if (!l)
        return;
    document.getElementById("titulo").value = l[1];
    document.getElementById("descricao").value = l[3] || "";
    excluir(id);
};
