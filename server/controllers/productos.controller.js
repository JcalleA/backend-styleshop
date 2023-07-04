

const Productos = require("../models/productos");
const { ObjectId } = require('mongodb')




exports.registrarProducto = async (req, res) => {
    const { nombre, categoria, precio, descripcion, img } = req.body;

    const nuevoProducto = new Productos({
        nombre,
        categoria,
        precio,
        img,
        descripcion,
    });
    nuevoProducto.save().then((producto) => {
        res.json({
            mensaje: "Producto registrado correctamente", producto
        });
    }).catch((error) => console.error('Error al guardar el producto', error));
}

exports.getCategoria = async (req, res) => {
    const categoria = req.params.categoria

    Productos.find({ "categoria": categoria }, (err, datos))
        .then(res.json(datos))
        .catch(res.json(err))
}


exports.getProductos = (req, res) => {
    Productos.find((err, productos) => {
        res.json(productos)
    }, console.error("error al consultar los productos"));
}
exports.removerProducto = async (req, res) => {
    const id = req.params.id

    const result = await Productos.deleteOne({ "_id": id });
    if (result.deletedCount === 1) {
        res.json({mensaje:"Elimiado"});
    } else {
        res.json({mensaje:"No documents matched the query. Deleted 0 documents."});
    }
}
    //Negocio.findOneAndDelete( {correo:email} ).then((negocio) => {
    //    if (negocio) {
    //        return res.json({ mensaje: "Negocio Eliminado ",negocio })
    //    } else  {
    //        res.json({ mensaje: "Error Al Eliminar Negocio" });
    //    }
    //}).catch((error) => console.error('Error al guardar el usuario', error));

