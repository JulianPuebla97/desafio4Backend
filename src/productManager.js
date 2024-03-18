import fs from 'fs';

class ProductManager {
    static ultId = 0;

    constructor() {
        this.path = ".src/data/products.json";
        this.products = this.#leerProductosInFile() || [];
    }

    #asignarIdProducto() {
        let id = 1;
        if (this.products && this.products.length > 0) {
            id = this.products[this.products.length - 1].id + 1;
        }
        return id;
    }

    #leerProductosInFile() {
        try {
            if (fs.existsSync(this.path)) {
                return JSON.parse(fs.readFileSync(this.path, "utf-8"));
            }
            return [];
        } catch (error) {
            console.log(`Ocurrió un error al leer los productos: ${error}`);
            return [];
        }
    }

    #guardarArchivo() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        } catch (error) {
            console.log(`Ocurrió un error al guardar el archivo de productos: ${error}`);
        }
    }

    addProduct(title, description, price, img, code, stock) {
        if (!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        if (this.products.some(item => item.code === code)) {
            console.log("El código debe ser único.. o todos moriremos!");
            return;
        }
        
        ProductManager.ultId += 1;
        const id = this.#asignarIdProducto();

        const newProduct = {
            id: ProductManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock
        };

        this.products.push(newProduct);
        this.#guardarArchivo();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(item => item.id === id);
        if (!product) {
            console.error("Producto no encontrado!");
            return null;
        } else {
            return product;
        }
    }

    updateProduct(id, objetoUpdate) {
        let msg = `El producto con ID ${id} no existe`;

        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            const { id, ...rest } = objetoUpdate;
            this.products[index] = { ...this.products[index], ...rest };
            this.#guardarArchivo();
            msg = "Producto actualizado!";
        }
        return msg;
    }

    deleteProduct(id) {
        let msg = `El producto con ID ${id} no existe`;

        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.#guardarArchivo();
            msg = "¡Producto eliminado!";
        }

        return msg;
    }
}

export default ProductManager;
