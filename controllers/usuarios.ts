import { Request, Response } from 'express';
import { json } from 'sequelize/types';
import Usuario from '../models/usuario';


//Traerme todos los usuarios
export const getUsuarios = async(req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json({usuarios});  
};


//Traerme un usuario en particular
export const getUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if( usuario ) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
};


//Crearme un usuario
export const postUsuario = async(req: Request, res: Response) => {

    const { body } = req;

    try {
        
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.email
            });
        }


        const usuario = Usuario.build(body); 
        await usuario.save();

        res.json(usuario);


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }
};


//Actualizar un usuario
export const putUsuario = async(req: Request, res: Response) => {

    const { id }   = req.params;
    const { body } = req;

    try {
        
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

        await usuario.update(body);

        res.json(usuario);


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })    
    }   
};


//Eliminar un usuario
export const deleteUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }

    //Eliminacion lógica de un usuario en la base de datos(Recomendable)
    await usuario.update({estado: false});

     //Eliminacion física de un usuario en la base de datos(No Recomendable)
    // await usuario.destroy();

    res.json(usuario); 
};
