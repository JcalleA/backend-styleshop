const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productosSchema = new Schema({
    nombre: String,
    categoria: String,
    url: String,
    precio:Number,
    descripcion:String
});

module.exports = mongoose.model("Productos", productosSchema);