console.log('Script carregado!')

async function removeProduct(id) {
    const response = await fetch(`/product/remove/${id}`, { method: 'POST' })
    const json = await response.json()
    if (json.success) {
        window.location.href = '/product'
    } else {
        window.alert('Erro ao remover o produto')
    }
    
}

async function increaseItem(id) {
    const response = await fetch(`/purchaseItem/increase/${id}`, { method: 'POST' })
    const json = await response.json()
    if (json.success) {
        window.location.href = '/purchase/cart'
    } else {
        window.alert('Erro ao remover o produto')
    }
    
}

async function decreaseItem(id) {
    const response = await fetch(`/purchaseItem/decrease/${id}`, { method: 'POST' })
    const json = await response.json()
    if (json.success) {
        window.location.href = '/purchase/cart'
    } else {
        window.alert('Erro ao decrementar o produto')
    }
}

async function removeItem(id) {
    const response = await fetch(`/purchaseItem/remove/${id}`, { method: 'POST' })
    const json = await response.json()
    if (json.success) {
        window.location.href = '/purchase/cart'
    } else {
        window.alert('Erro ao remover o produto')
    }
}
