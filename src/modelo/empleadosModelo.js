const pool = require('../config/bd');

class empleadosModelo {

    static async obtenerTodo()
    {
        const [rows] = await pool.query('SELECT * FROM empleados');
        return rows;
    }

    static async obtenerPorID(id)
    {
        const [rows] = await pool.query('SELECT * FROM empleados WHERE id_empleado = ?', [id]);
        return rows[0];
    }

    static async crearEmpleado(nombre, area)
    {
        // La tabla no tiene AUTO_INCREMENT, así que calculamos el siguiente id
        const [[{ siguiente }]] = await pool.query('SELECT IFNULL(MAX(id_empleado), 0) + 1 AS siguiente FROM empleados');
        await pool.query('INSERT INTO empleados (id_empleado, nombre, area) VALUES (?, ?, ?)', [siguiente, nombre, area]);
        return { id_empleado: siguiente, nombre, area };
    }

    static async actualizarEmpleado(id, nombre, area)
    {
        const [result] = await pool.query('UPDATE empleados SET nombre = ?, area = ? WHERE id_empleado = ?', [nombre, area, id]);
        return result.affectedRows;
    }

    static async eliminarEmpleado(id)
    {
        const [result] = await pool.query('DELETE FROM empleados WHERE id_empleado = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = empleadosModelo;