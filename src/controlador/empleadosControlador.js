const empleadosModelo = require('../modelo/empleadosModelo');

class empleadosControlador {

    static async obtenerEmpleados(req, res)
    {
        try
        {
            const empleados = await empleadosModelo.obtenerTodo();
            return res.status(200).json({ exito: true, datos: empleados });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener empleados' });
        }
    }

    static async obtenerEmpleadoPorID(req, res)
    {
        try
        {
            const empleado = await empleadosModelo.obtenerPorID(req.params.id);
            if (!empleado)
                return res.status(404).json({ exito: false, mensaje: 'Empleado no encontrado' });

            return res.status(200).json({ exito: true, datos: empleado });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener empleado' });
        }
    }

    static async crearEmpleado(req, res)
    {
        const { nombre, area } = req.body;

        if (!nombre || !area)
            return res.status(400).json({ exito: false, mensaje: 'nombre y area son obligatorios' });

        try
        {
            const empleado = await empleadosModelo.crearEmpleado(nombre, area);
            return res.status(201).json({ exito: true, datos: empleado });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al crear empleado' });
        }
    }

    static async actualizarEmpleado(req, res)
    {
        const { nombre, area } = req.body;

        if (!nombre || !area)
            return res.status(400).json({ exito: false, mensaje: 'nombre y area son obligatorios' });

        try
        {
            const filas = await empleadosModelo.actualizarEmpleado(req.params.id, nombre, area);
            if (filas === 0)
                return res.status(404).json({ exito: false, mensaje: 'Empleado no encontrado' });

            return res.status(200).json({ exito: true, mensaje: 'Empleado actualizado' });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al actualizar empleado' });
        }
    }

    static async eliminarEmpleado(req, res)
    {
        try
        {
            const filas = await empleadosModelo.eliminarEmpleado(req.params.id);
            if (filas === 0)
                return res.status(404).json({ exito: false, mensaje: 'Empleado no encontrado' });

            return res.status(200).json({ exito: true, mensaje: 'Empleado eliminado' });
        }
        catch (error)
        {
            if (error.code === 'ER_ROW_IS_REFERENCED_2')
                return res.status(409).json({ exito: false, mensaje: 'No se puede eliminar: el empleado tiene pedidos' });

            return res.status(500).json({ exito: false, mensaje: 'Error al eliminar empleado' });
        }
    }
}

module.exports = empleadosControlador;