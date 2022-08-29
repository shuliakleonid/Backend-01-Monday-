const products = [{id: 1, title: "tomato"}, {id: 2, title: 'orange'}]

export const productsRepository = {
    findProducts(title: string | null | undefined) {
        if (title) {
            const responseProducts = products.filter(product => product.title.includes(title as string))
            return responseProducts
        } else {
            return products
        }
    },
    createProduct(title: string) {
        const id = products.length + 1
        const product = {
            id,
            title
        }
        products.push(product)
        return product
    },
    getProductById(id: number) {
        return products.find(product => product.id === id)
    },
    deleteProduct(id: number) {
        products.forEach((product, i) => {
            if (product.id === id) {
                products.splice(i, 1)
                return true
            }
        })
        return false
    },
    updateProduct(id: number, title: string) {
        const product = products.find(p => p.id === id);
        if (product) {
            product.title = title
            return true;
        } else {
            return false
        }

    }


}