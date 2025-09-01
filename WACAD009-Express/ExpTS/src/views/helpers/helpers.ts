import { Tech } from './helpersTypes'

export function listTechs(techs: Tech[]) {
  const nodeTechs = techs.filter((t) => t.poweredByNodejs)
  return `
    <p>Technologias baseadas no NodeJS:</p> 
    <ul>${nodeTechs.map((t) => `<li>${t.name} - ${t.type}</li>`).join('')}</ul>`
}

export default { listTechs }
