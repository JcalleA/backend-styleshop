const Negocio = require("../models/negocio");
const Usuario = require("../models/usuarios");
const jwt = require("jsonwebtoken");
const parseId = (id) => {
    return mongoose.Types.ObjectId(id)
}


exports.registrar = async (req, res) => {
    const { nombre, ciudad, correo, telefono, id, imagenUrl } = req.body;

    Negocio.findOne({ correo }).then((negocio) => {
        if (negocio) {
            return res.json({ mensaje: "Este correo ya tiene asociado un negocio" })
        } else if (!nombre || !ciudad || !correo || !telefono) {
            res.json({ mensaje: "Hay datos por ingresar" });
        } else {
            const nuevoNegocio = new Negocio({
                nombre,
                ciudad,
                correo,
                telefono,
                imagenUrl,
            });
            nuevoNegocio.save().then((negocio) => {
                const datos = negocio
                const idNegocio = datos.id
                const idUsuario = id
                const usuario = {
                    negocio: idNegocio,
                }
                Usuario.findByIdAndUpdate(idUsuario, { $set: usuario }, (err) => {
                    if (err) {
                        console.error("Error:", err);
                        response.exito = false;
                        response.msg = "Error al actualizar  el usuario";
                        res.json(response)
                        return;
                    }
                });
                res.json({
                    mensaje: "Negocio registrado correctamente", negocio
                });
            }).catch((error) => console.error('Error al guardar el usuario', error));
        }
    });
}
exports.getNegocio = async (req, res) => {
    const decoded = jwt.verify(req.token, "__secret__");
    const id = decoded.id;
    try {
        if (id.length === 24) {
            Usuario.findById(id)
                .then((usuario) => {
                    if (!usuario) {
                        return res.json({
                            mensaje: "No se encontro el usuario con id"
                        });
                    } else {
                        Negocio.findById(usuario.negocio)
                            .then((negocio) => {
                                if (!negocio) {
                                    return res.json({
                                        mensaje: "No se encontro Negocio"
                                    });
                                } else {
                                    res.json(negocio)
                                }
                            })

                    }
                });
        } else {
            res.json({ mensaje: "Contraseña incorrecta" });
        }
    }
    catch (error) {
        res.json({ mensaje: req.token })
    }

};

exports.getNegocios = (req, res) => {
    Negocio.find((err, negocios) => {
        res.json(negocios)
    }, console.error("error al consultar los negocios"));
}
exports.removerNegocio = async (req, res) => {
    const email = req.params.correo
      Negocio.findOneAndDelete({correo:email}),(err)=>{
            if(err){
              res.json({ mensaje: "Error Al Eliminar Negocio "})
             }
              res.json({ mensaje: "Negocio Eliminado "});
      }

    //Negocio.findOneAndDelete( {correo:email} ).then((negocio) => {
    //    if (negocio) {
    //        return res.json({ mensaje: "Negocio Eliminado ",negocio })
    //    } else  {
    //        res.json({ mensaje: "Error Al Eliminar Negocio" });
    //    }
    //}).catch((error) => console.error('Error al guardar el usuario', error));
}
