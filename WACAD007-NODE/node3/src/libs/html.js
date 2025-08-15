export function template(body,p) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/styles.css" />
        <title>Gerador de Lorem Ipsum</title>
    </head>
    <body>
        <h1>GERADOR DE LOREM IPSUM!</h1>
        <form method = "get" action = "/" class = "form-lorem">
            <label for="p">Parágrafos:</label>
            <input type = "text" name = "p" value = "${p}" />
            <button type = "submit">Gerar</button>
        </form>
        ${body}
    </body>
    </html>`
}