const Sequelize = require('sequelize');

const Controller = require('./Controller.js');
const MatriculaServices = require('../services/MatriculaServices.js');

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor() {
    super(matriculaServices);
  }

  async pegaMatriculasPorEstudante(req, res) {
    const { estudante_id } = req.params;
 
    try {
      const listaMatriculasPorEstudantes = await matriculaServices.pegaEContaRegistros(
        {
          where: {
            estudante_id: Number(estudante_id),
            status: 'matriculado'
          },
          lilmit: 2,
          order: ['id', 'ASC']
        }
      );
      return res.status(200).json(listaMatriculasPorEstudantes);
    } catch (erro) {
      return res.status(500).json({erro: erro.message});
    }
  }

  async pegaCursosLoados(req, res) {
    const lotacaoCurso = 2;
 
    try {
      const cursosLotados = await matriculaServices.pegaEContaRegistros({
        where: {
          status: 'matriculado'
        },
        attributes: ['curso_id'],
        group: ['curso_id'],
        having: Sequelize.literal(`count(curso_id) >= ${lotacaoCurso}`)
      });
      return res.status(200).json(cursosLotados.count);
    } catch (erro) {
      return res.status(500).json({erro: erro.message});
    }
  }
}

module.exports = MatriculaController;