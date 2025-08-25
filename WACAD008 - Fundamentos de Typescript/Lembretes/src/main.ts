type Lembrete = [number, string, Date, string?]
let lembretes: Lembrete[] = []

const form = document.getElementById("form") as HTMLFormElement
const lista = document.getElementById("lista") as HTMLElement

form.onsubmit = e => {
  e.preventDefault()
  const titulo = (document.getElementById("titulo") as HTMLInputElement).value.trim()
  const descricao = (document.getElementById("descricao") as HTMLInputElement).value.trim()
  if (!titulo) return
  lembretes.push([Date.now(), titulo, new Date(), descricao || undefined])
  renderizar(); form.reset()
}

function criarElemento(tag: string, classes: string, html?: string) {
  const el = document.createElement(tag)
  if (classes) el.className = classes
  if (html) el.innerHTML = html
  return el
}

function renderizar() {
  lista.innerHTML = ""
  lembretes.forEach(([id, titulo, criadoEm, descricao]) => {
    const card = criarElemento("div","card shadow h-100")
    card.append(
      criarElemento("div","card-header fw-bold text-truncate", titulo),
      (() => {
        const body = criarElemento("div","card-body")
        if (descricao) body.appendChild(criarElemento("p","card-text",descricao));
        body.appendChild(criarElemento("p","card-subtitle text-muted small","Criado em: "+criadoEm.toLocaleString()))
        return body
      })(),
      (() => {
        const footer = criarElemento("div","card-footer d-flex justify-content-between")
        const btn = (c:string, i:string, f:()=>void) => { 
          const b = criarElemento("button",c,i) as HTMLButtonElement
          b.onclick=f; return b
        }
        footer.append(btn("btn btn-sm btn-outline-warning","<i class='bi bi-pencil-square'></i> Editar",()=>editar(id)))
        footer.append(btn("btn btn-sm btn-outline-danger","<i class='bi bi-trash'></i> Excluir",()=>excluir(id)))
        return footer
      })()
    )
    const col = criarElemento("div","col"); col.appendChild(card); lista.appendChild(col)
  })
}

const excluir = (id:number) => (lembretes=lembretes.filter(([i])=>i!==id),renderizar())
const editar = (id:number) => {
  const l=lembretes.find(([i])=>i===id); if(!l) return
  (document.getElementById("titulo") as HTMLInputElement).value = l[1];
  (document.getElementById("descricao") as HTMLInputElement).value = l[3]||""
  excluir(id)
}
