const pool = require('../config/bd');

class categoriasModelo {

    static async obtenerTodo()
    {
        const [rows] = await pool.query('SELECT * FROM categorias');
        return rows;
    }

    static async obtenerPorID(id)
    {
        const [rows] = await pool.query('SELECT * FROM categorias WHERE id_categoria = ?', [id]);
        return rows[0];
    }

    static async crearCategoria(nombre)
    {
        const [[{ siguiente }]] = await pool.query('SELECT IFNULL(MAX(id_categoria), 0) + 1 AS siguiente FROM categorias');
        await pool.query('INSERT INTO categorias (id_categoria, nombre) VALUES (?, ?)', [siguiente, nombre]);
        return { id_categoria: siguiente, nombre };
    }

    static async actualizarCategoria(id, nombre)
    {
        const [result] = await pool.query('UPDATE categorias SET nombre = ? WHERE id_categoria = ?', [nombre, id]);
        return result.affectedRows;
    }

    static async eliminarCategoria(id)
    {
        const [result] = await pool.query('DELETE FROM categorias WHERE id_categoria = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = categoriasModelo;