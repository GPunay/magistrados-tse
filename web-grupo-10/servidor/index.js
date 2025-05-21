const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json()); // Habilitar JSON en las solicitudes
const corsOptions = {
    origin: 'http://localhost:3000', // Dirección de React
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));

// Configuración de la base de datos
const dbConfig = {  
    server: 'localhost',
    database: 'DepMagistrados',
    user: 'sa',
    password: 'sqlgeo',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};  

// Conectar a la base de datos
sql.connect(dbConfig)
    .then(() => console.log('Conexión exitosa a la base de datos...'))
    .catch(err => console.error('Detalles del error:', JSON.stringify(err, null, 2)));

// Ruta de login
app.post('/api/login', async (req, res) => {
    try {
        const { correo, pass } = req.body;
        const pool = await sql.connect(dbConfig);

        // Obtener la contraseña cifrada desde la base de datos
        const result = await pool.request()
            .input('correo', sql.VarChar, correo)
            .query('SELECT idUsuario, primer_nombre, primer_apellido, pass FROM Usuario WHERE correo = @correo');

        if (result.recordset.length > 0) {
            const usuario = result.recordset[0];

            // Comparar la contraseña ingresada con la versión cifrada
            const esValida = bcrypt.compareSync(pass, usuario.pass);

            if (esValida) {
                res.json({ success: true, user: { id: usuario.idUsuario, nombre: usuario.primer_nombre, apellido: usuario.primer_apellido } });
            } else {
                res.status(401).json({ success: false, message: 'Correo o contraseña incorrectos' });
            }
        } else {
            res.status(401).json({ success: false, message: 'Correo no encontrado' });
        }
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Obtener lista de cargos
app.get('/api/cargos', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT id_cargo, nombre FROM Cargo');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener cargos:', err);
        res.status(500).json({ error: 'Error al obtener cargos' });
    }
});

// Obtener lista de departamentos
app.get('/api/departamentos', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT id_departamento, departamento FROM Departamento');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener departamentos:', err);
        res.status(500).json({ error: 'Error al obtener departamentos' });
    }
});

// Obtener todos los usuarios - NUEVA RUTA
app.get('/api/usuarios', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query(`
            SELECT idUsuario, primer_nombre, segundo_nombre, primer_apellido, 
                  segundo_apellido, correo, telefono, id_cargo, id_departamento 
            FROM Usuario
            ORDER BY primer_apellido, primer_nombre
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Agregar nuevo usuario
app.post('/api/usuarios', async (req, res) => {
    try {
        const {
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            correo,
            telefono,
            pass,
            id_cargo,
            id_departamento
        } = req.body;

        // Validar que el correo no exista
        const pool = await sql.connect(dbConfig);
        const emailCheck = await pool.request()
            .input('correo', sql.VarChar, correo)
            .query('SELECT idUsuario FROM Usuario WHERE correo = @correo');

        if (emailCheck.recordset.length > 0) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }

        // Hash de la contraseña
        const hashedPassword = bcrypt.hashSync(pass, 10);

        // Insertar nuevo usuario
        const result = await pool.request()
            .input('primer_nombre', sql.VarChar, primer_nombre)
            .input('segundo_nombre', sql.VarChar, segundo_nombre || null)
            .input('primer_apellido', sql.VarChar, primer_apellido)
            .input('segundo_apellido', sql.VarChar, segundo_apellido || null)
            .input('correo', sql.VarChar, correo)
            .input('telefono', sql.VarChar, telefono || null)
            .input('pass', sql.VarChar, hashedPassword)
            .input('id_cargo', sql.Int, id_cargo)
            .input('id_departamento', sql.Int, id_departamento)
            .query(`
                INSERT INTO Usuario (
                    primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,
                    correo, telefono, pass, id_cargo, id_departamento
                ) 
                VALUES (
                    @primer_nombre, @segundo_nombre, @primer_apellido, @segundo_apellido,
                    @correo, @telefono, @pass, @id_cargo, @id_departamento
                )
                SELECT SCOPE_IDENTITY() AS idUsuario
            `);

        res.json({
            success: true,
            idUsuario: result.recordset[0].idUsuario
        });
    } catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});

// Buscar usuario por correo
app.get('/api/usuarios/buscar', async (req, res) => {
    try {
        const { correo } = req.query;
        if (!correo) {
            return res.status(400).json({ error: 'Se requiere el parámetro correo' });
        }

        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('correo', sql.VarChar, correo)
            .query(`
                SELECT idUsuario, primer_nombre, segundo_nombre, primer_apellido, 
                       segundo_apellido, correo, telefono, id_cargo, id_departamento 
                FROM Usuario 
                WHERE correo = @correo
            `);

        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        console.error('Error al buscar usuario:', err);
        res.status(500).json({ error: 'Error al buscar usuario' });
    }
});

// Actualizar usuario
app.put('/api/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            correo,
            telefono,
            id_cargo,
            id_departamento,
            pass // Añadido para manejar la actualización de contraseña
        } = req.body;

        // Validar campos obligatorios
        if (!primer_nombre || !primer_apellido || !correo || !id_cargo || !id_departamento) {
            return res.status(400).json({ message: 'Todos los campos obligatorios deben ser proporcionados' });
        }

        const pool = await sql.connect(dbConfig);

        // Verificar que el correo no esté siendo usado por otro usuario
        const emailCheck = await pool.request()
            .input('correo', sql.VarChar, correo)
            .input('idUsuario', sql.Int, id)
            .query('SELECT idUsuario FROM Usuario WHERE correo = @correo AND idUsuario != @idUsuario');

        if (emailCheck.recordset.length > 0) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado por otro usuario' });
        }

        // Crear la consulta base para actualizar el usuario
        let query = `
            UPDATE Usuario SET
                primer_nombre = @primer_nombre,
                segundo_nombre = @segundo_nombre,
                primer_apellido = @primer_apellido,
                segundo_apellido = @segundo_apellido,
                correo = @correo,
                telefono = @telefono,
                id_cargo = @id_cargo,
                id_departamento = @id_departamento
        `;

        // Añadir actualización de contraseña si se proporciona
        if (pass) {
            query += `, pass = @pass`;
        }

        query += ` WHERE idUsuario = @idUsuario`;

        // Configurar la solicitud
        const request = pool.request()
            .input('idUsuario', sql.Int, id)
            .input('primer_nombre', sql.VarChar, primer_nombre)
            .input('segundo_nombre', sql.VarChar, segundo_nombre || null)
            .input('primer_apellido', sql.VarChar, primer_apellido)
            .input('segundo_apellido', sql.VarChar, segundo_apellido || null)
            .input('correo', sql.VarChar, correo)
            .input('telefono', sql.VarChar, telefono || null)
            .input('id_cargo', sql.Int, id_cargo)
            .input('id_departamento', sql.Int, id_departamento);

        // Añadir parámetro de contraseña si se proporciona
        if (pass) {
            const hashedPassword = bcrypt.hashSync(pass, 10);
            request.input('pass', sql.VarChar, hashedPassword);
        }

        // Ejecutar la consulta
        await request.query(query);

        res.json({ success: true, message: 'Usuario actualizado correctamente' });
    } catch (err) {
        console.error('Error al actualizar usuario:', err);
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
});

// Eliminar usuario
app.delete('/api/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const pool = await sql.connect(dbConfig);
        
        // Verificar si el usuario existe
        const userCheck = await pool.request()
            .input('idUsuario', sql.Int, id)
            .query('SELECT idUsuario FROM Usuario WHERE idUsuario = @idUsuario');
            
        if (userCheck.recordset.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        // Eliminar el usuario
        await pool.request()
            .input('idUsuario', sql.Int, id)
            .query('DELETE FROM Usuario WHERE idUsuario = @idUsuario');
            
        res.json({ success: true, message: 'Usuario eliminado correctamente' });
    } catch (err) {
        console.error('Error al eliminar usuario:', err);
        res.status(500).json({ error: 'Error al eliminar usuario', detalles: err.message });
    }
});

// Obtener todos los usuarios para reportes (incluyendo toda la información)
app.get('/api/reportes/usuarios', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        
        // Obtenemos todos los usuarios con todos los campos
        // Nota: las contraseñas seguirán siendo hasheadas por seguridad
        const result = await pool.request().query(`
            SELECT 
                U.idUsuario, 
                U.primer_nombre, 
                U.segundo_nombre, 
                U.primer_apellido, 
                U.segundo_apellido, 
                U.correo, 
                U.telefono,
                U.pass, 
                U.id_cargo, 
                C.nombre AS cargo_nombre,
                U.id_departamento,
                D.departamento AS departamento_nombre
            FROM 
                Usuario U
            LEFT JOIN 
                Cargo C ON U.id_cargo = C.id_cargo
            LEFT JOIN 
                Departamento D ON U.id_departamento = D.id_departamento
            ORDER BY 
                U.idUsuario ASC
        `);
        
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener reporte de usuarios:', err);
        res.status(500).json({ error: 'Error al obtener reporte de usuarios' });
    }
});


// Obtener reporte de solicitudes
app.get('/api/reportes/solicitudes', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);

    // Obtener el conteo de solicitudes agrupado por departamento y estado
    const solicitudes = await pool.request().query(`
      SELECT 
        NombreDep, 
        [Estado de la Solicitud] AS estado, 
        COUNT(*) AS total
      FROM dbo.ExpedienteSolicitud
      GROUP BY NombreDep, [Estado de la Solicitud]
      ORDER BY NombreDep, estado
    `);

    // Obtener los departamentos distintos para filtro
    const departamentos = await pool.request().query(`
      SELECT DISTINCT NombreDep FROM dbo.ExpedienteSolicitud ORDER BY NombreDep
    `);

    // Obtener los estados distintos para filtro
    const estados = await pool.request().query(`
      SELECT DISTINCT [Estado de la Solicitud] AS estado FROM dbo.ExpedienteSolicitud ORDER BY estado
    `);

    res.json({
      solicitudes: solicitudes.recordset,
      departamentos: departamentos.recordset.map(d => d.NombreDep),
      estados: estados.recordset.map(e => e.estado)
    });
  } catch (err) {
    console.error('Error al obtener reporte de solicitudes:', err);
    res.status(500).json({ error: 'Error al obtener reporte de solicitudes' });
  }
});

// Obtener reporte de votaciones del pleno
app.get('/api/reportes/votaciones', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        
        // Obtener todos los datos de la vista
        const result = await pool.request().query(`
            SELECT 
                NombreCompleto,
                correo,
                telefono,
                CargoNombre,
                DepartamentoNombre,
                voto,
                CONVERT(varchar, fecha_sesion, 120) as fecha_sesion,
                estado
            FROM Vista_VotacionEmpleadoPleno
            ORDER BY fecha_sesion DESC, NombreCompleto
        `);
        
        // Obtener valores únicos para los filtros
        const cargos = await pool.request().query(`
            SELECT DISTINCT CargoNombre FROM Vista_VotacionEmpleadoPleno ORDER BY CargoNombre
        `);
        
        const departamentos = await pool.request().query(`
            SELECT DISTINCT DepartamentoNombre FROM Vista_VotacionEmpleadoPleno ORDER BY DepartamentoNombre
        `);
        
        const votos = await pool.request().query(`
            SELECT DISTINCT voto FROM Vista_VotacionEmpleadoPleno WHERE voto IS NOT NULL ORDER BY voto
        `);
        
        const estados = await pool.request().query(`
            SELECT DISTINCT estado FROM Vista_VotacionEmpleadoPleno WHERE estado IS NOT NULL ORDER BY estado
        `);
        
        res.json({
            votaciones: result.recordset,
            filtros: {
                cargos: cargos.recordset.map(c => c.CargoNombre),
                departamentos: departamentos.recordset.map(d => d.DepartamentoNombre),
                votos: votos.recordset.map(v => v.voto),
                estados: estados.recordset.map(e => e.estado)
            }
        });
    } catch (err) {
        console.error('Error al obtener reporte de votaciones:', err);
        res.status(500).json({ error: 'Error al obtener reporte de votaciones' });
    }
});

// Obtener reporte de citas e invitaciones
app.get('/api/reportes/citas-invitaciones', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        
        // Obtener todos los datos de la vista
        const result = await pool.request().query(`
            SELECT 
                [Nombre de la Corporación] as nombreCorporacion,
                Municipio,
                Departamento,
                CONVERT(varchar, [Fecha de Solicitud], 120) as fechaSolicitud,
                [Motivo de la Solicitud] as motivoSolicitud,
                CONVERT(varchar, [Fecha de Creación del Proyecto], 120) as fechaCreacionProyecto,
                CONVERT(varchar, [Fecha de Resolución], 120) as fechaResolucion,
                [Empleado Responsable] as empleadoResponsable
            FROM Vista_ReporteMunicipalidadResoluciones
            ORDER BY [Fecha de Solicitud] DESC
        `);
        
        // Obtener valores únicos para los filtros
        const municipios = await pool.request().query(`
            SELECT DISTINCT Municipio FROM Vista_ReporteMunicipalidadResoluciones ORDER BY Municipio
        `);
        
        const departamentos = await pool.request().query(`
            SELECT DISTINCT Departamento FROM Vista_ReporteMunicipalidadResoluciones ORDER BY Departamento
        `);
        
        const motivos = await pool.request().query(`
            SELECT DISTINCT [Motivo de la Solicitud] FROM Vista_ReporteMunicipalidadResoluciones 
            WHERE [Motivo de la Solicitud] IS NOT NULL 
            ORDER BY [Motivo de la Solicitud]
        `);
        
        const empleados = await pool.request().query(`
            SELECT DISTINCT [Empleado Responsable] FROM Vista_ReporteMunicipalidadResoluciones 
            WHERE [Empleado Responsable] IS NOT NULL 
            ORDER BY [Empleado Responsable]
        `);
        
        res.json({
            citasInvitaciones: result.recordset,
            filtros: {
                municipios: municipios.recordset.map(m => m.Municipio),
                departamentos: departamentos.recordset.map(d => d.Departamento),
                motivos: motivos.recordset.map(m => m['Motivo de la Solicitud']),
                empleados: empleados.recordset.map(e => e['Empleado Responsable'])
            }
        });
    } catch (err) {
        console.error('Error al obtener reporte de citas e invitaciones:', err);
        res.status(500).json({ error: 'Error al obtener reporte de citas e invitaciones' });
    }
});

// Obtener reporte de asignaciones del pleno con filtros
app.get('/api/reportes/asignaciones-pleno', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        
        // Obtener todos los datos de la vista
        const result = await pool.request().query(`
            SELECT 
                [ID Asignación] as idAsignacion,
                [Empleado Asignado] as empleadoAsignado,
                Correo,
                Teléfono as telefono,
                [Motivo de la Solicitud] as motivoSolicitud,
                CONVERT(varchar, [Fecha de Asignación], 120) as fechaAsignacion,
                CONVERT(varchar, [Fecha de Sesión del Pleno], 120) as fechaSesionPleno
            FROM Reporte_ReporteAgendaAsignacionesPleno
            ORDER BY [Fecha de Sesión del Pleno] DESC
        `);
        
        // Obtener valores únicos para filtros
        const empleados = await pool.request().query(`
            SELECT DISTINCT [Empleado Asignado] FROM Reporte_ReporteAgendaAsignacionesPleno ORDER BY [Empleado Asignado]
        `);
        
        const motivos = await pool.request().query(`
            SELECT DISTINCT [Motivo de la Solicitud] FROM Reporte_ReporteAgendaAsignacionesPleno 
            WHERE [Motivo de la Solicitud] IS NOT NULL 
            ORDER BY [Motivo de la Solicitud]
        `);
        
        res.json({
            asignaciones: result.recordset,
            filtros: {
                empleados: empleados.recordset.map(e => e['Empleado Asignado']),
                motivos: motivos.recordset.map(m => m['Motivo de la Solicitud'])
            }
        });
    } catch (err) {
        console.error('Error al obtener reporte de asignaciones del pleno:', err);
        res.status(500).json({ error: 'Error al obtener reporte de asignaciones del pleno' });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));