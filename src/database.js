const mongoose = require("mongoose"); 

//2) Crear una conexión con la base de datos. 

mongoose.connect("mongodb+srv://julianpuebla97:coderhouse@cluster0.fbnrglq.mongodb.net/tienda")
    .then(() => console.log("Conexión exitosa"))
    .catch((error) => console.log("Error en la conexión", error))