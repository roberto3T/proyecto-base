const pool = require('../config/bd');

class clientesModelo {

    static async obtenerTodo()
    {
        const [rows] = await pool.query('SELECT * FROM clientes');
        return rows;
    }

    static async obtenerPorID(id)
    {
        const [rows] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ?', [id]);
        return rows[0];
    }

    static async crearCliente(nombre, ciudad, fecha_registro)
    {
        const [[{ siguiente }]] = await pool.query('SELECT IFNULL(MAX(id_cliente), 0) + 1 AS siguiente FROM clientes');
        await pool.query(
            'INSERT INTO clientes (id_cliente, nombre, ciudad, fecha_registro) VALUES (?, ?, ?, ?)',
            [siguiente, nombre, ciudad, fecha_registro]
        );
        return { id_cliente: siguiente, nombre, ciudad, fecha_registro };
    }

    static async actualizarCliente(id, nombre, ciudad, fecha_registro)
    {
        const [result] = await pool.query(
            'UPDATE clientes SET nombre = ?, ciudad = ?, fecha_registro = ? WHERE id_cliente = ?',
            [nombre, ciudad, fecha_registro, id]
        );
        return result.affectedRows;
    }

    static async eliminarCliente(id)
    {
        const [result] = await pool.query('DELETE FROM clientes WHERE id_cliente = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = clientesModelo;