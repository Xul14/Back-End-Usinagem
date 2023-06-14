/******************************************************************************
 * Objetivo: API para integração entre back e banco de dados (GET, POST, PUT , DELETE)
 * Data: 22/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Import doss arquivos da controller que irá solicitar a model dos dados do banco.
var controllerAluno = require('./controller/controller_aluno.js')
var controllerCurso = require('./controller/controller_curso.js')
var controllerPeriodo = require('./controller/controller_periodo.js')
var controllerAno = require('./controller/controller_ano.js')
var controllerTurma = require('./controller/controller_turma')
var controllerMatricula = require('./controller/controller_matricula.js')
var controllerTipoAtividade = require('./controller/controller_tipo_atividade.js')
const controllerProfessor = require('./controller/controller_professor.js')
const controllerDisciplina = require('./controller/controller_disciplina.js')
const controllerCriterio = require('./controller/controller_criterio.js')
const controllerValorDesejado = require('./controller/controller_valor_desejado.js')
const controllerTempoPrevisto = require('./controller/controller_tempo_previsto.js')
const controllerAtividade = require('./controller/controller_atividade.js')
const controllerAtividadeValorDesejado = require('./controller/controller_atividade_valor_desejado.js')
const controllerTurmaDisciplinaProfessor = require('./controller/controller_turma_disciplina_professor.js')
const controllerTurmaDisciplinaProfessorAtividade = require('./controller/controller_turma_disciplina_professor_atividade.js')
const controllerRegistroDeTempo = require('./controller/controller_registro_tempo.js')
const controllerMatriculaAtividadeRegistroDeTempo = require('./controller/controller_matricula_atividade_registro_tempo.js')
const controllerAvaliacao = require('./controller/controller_avaliacao.js')


var message = require('./controller/modulo/config.js')

//Import das bibliotecas para API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { request, response } = require('express')

//Define que os dados que irão chegar no body da requisição serão nos padrões JSON
const bodyParserJSON = bodyParser.json()

//Cria  objeto app conforme a classe do express
const app = express()

app.use((request, response, next) => {

    //Define quem poderá acessar a API
    response.header('Access-Control-Allow-Origin', '*')

    //Define quais métodos serão ultilizaos na API
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    //Atribui permissões ao cors
    app.use(cors())

    next()
})

/******************************************************************************
 * Objetivo: API para integração entre back e banco de dados Aluno (CRUD).
 * Data: 22/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Endpoint que insere um aluno novo no banco
app.post('/v1/mecanica/aluno', cors(), bodyParserJSON, async function(request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body

        let resultDadosAluno = await controllerAluno.inserirAluno(dadosBody)

        response.status(resultDadosAluno.status)
        response.json(resultDadosAluno)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

})

//Endpoint que atualiza a senha do aluno
app.put('/v1/mecanica/aluno/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let idAluno = request.params.id

        let dadosBody = request.body

        let resultDadosAluno = await controllerAluno.atualizarAluno(dadosBody, idAluno)

        response.status(resultDadosAluno.status)
        response.json(resultDadosAluno)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

//Endpoint que exclui um aluno, filtrando pelo id
app.delete('/v1/mecanica/aluno/:id', cors(), async function(request, response) {
    let id = request.params.id

    let dadosAluno = await controllerAluno.deletarAluno(id)

    if (dadosAluno.length != 0) {
        response.status(dadosAluno.status)
        response.json(dadosAluno)
    } else {
        return message.ERROR_ID_NOT_FOUND
    }

})

//Endpoint que retorna todos os dados dos alunos
app.get('/v1/mecanica/aluno', cors(), async function(request, response) {

    let dadosAluno = await controllerAluno.getAlunos();

    response.status(dadosAluno.status)
    response.json(dadosAluno)

})
app.get('/', cors(), async function(request, response) {

    let dadosAluno = await controllerAluno.getAlunos();

    response.status(dadosAluno.status)
    response.json(dadosAluno)

})

//Endpoint que retorna o aluno filtrando pelo id
app.get('/v1/mecanica/aluno/:id', cors(), async function(request, response) {
    let id = request.params.id

    let dadosAluno = await controllerAluno.getBuscarAlunoId(id);

    response.status(dadosAluno.status)
    response.json(dadosAluno)

})

//Endpoint que retorna o aluno filtrando pelo nome
app.get('/v1/mecanica/aluno/nome/:nome', cors(), async function(request, response) {
    let nome = request.params.nome

    let dadosAluno = await controllerAluno.getBuscarAlunoNome(nome);

    response.status(dadosAluno.status)
    response.json(dadosAluno)

})

//Endpoint que retorna o email e a senha do aluno
app.get('/v1/mecanica/login/:email_institucional/:senha', cors(), async function(request, response) {
    let email_institucional = request.params.email_institucional
    let senha = request.params.senha

    let dadosAluno = await controllerAluno.getBuscarAlunosByEmailSenha(email_institucional, senha)

    response.status(dadosAluno.status)
    response.json(dadosAluno)
})

/******************************************************************************
 * Objetivo: API para integração entre back e banco de dados Curso (CRUD)
 * Data: 26/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Endpoint que insere um curso novo no banco
app.post('/v1/mecanica/curso', cors(), bodyParserJSON, async function(request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body

        let resultDadosCurso = await controllerCurso.inserirCurso(dadosBody)

        response.status(resultDadosCurso.status)
        response.json(resultDadosCurso)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

})

//Endpoint que atualiza um curso
app.put('/v1/mecanica/curso/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let idCurso = request.params.id

        let dadosBody = request.body

        let resultDadosCurso = await controllerCurso.atualizarCurso(dadosBody, idCurso)

        response.status(resultDadosCurso.status)
        response.json(resultDadosCurso)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

//Endpoint que deleta um curso
app.delete('/v1/mecanica/curso/:id', cors(), async function(request, response) {

    let id = request.params.id

    let dadosCurso = await controllerCurso.deletarCurso(id)

    if (dadosCurso.length != 0) {
        response.status(dadosCurso.status)
        response.json(dadosCurso)
    } else {
        return message.ERROR_ID_NOT_FOUND
    }
})

//Endpoint que retorna todos os cursos
app.get('/v1/mecanica/curso', cors(), async function(request, response) {

    let resultCursos = await controllerCurso.getBuscarCursos()

    response.status(resultCursos.status)
    response.json(resultCursos)
})

//Endpoint que retorna o curso filtrando pelo id
app.get('/v1/mecanica/curso/:id', cors(), async function(request, response) {
    let id = request.params.id

    let dadosCurso = await controllerCurso.getBuscarCursoId(id);

    response.status(dadosCurso.status)
    response.json(dadosCurso)

})

//Endpoint que retorna o curso filtrando pelo nome
app.get('/v1/mecanica/curso/nome/:nome', cors(), async function(request, response) {
    let nome = request.params.nome

    let dadosCurso = await controllerCurso.getBuscarCursoName(nome);

    response.status(dadosCurso.status)
    response.json(dadosCurso)

})


/******************************************************************************
 * Objetivo: API para integração entre back e banco de dados Período (CRUD)
 * Data: 28/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Endpoint que insere um periodo novo no banco
app.post('/v1/mecanica/periodo', cors(), bodyParserJSON, async function(request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body

        let resultDados = await controllerPeriodo.inserirPeriodo(dadosBody)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

})

//Endpoint que atualiza um periodo
app.put('/v1/mecanica/periodo/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let idPeriodo = request.params.id

        let dadosBody = request.body

        let resultDados = await controllerPeriodo.atualizarPeriodo(dadosBody, idPeriodo)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

//Endpoint que deleta um periodo
app.delete('/v1/mecanica/periodo/:id', cors(), async function(request, response) {

    let id = request.params.id

    let dadosPeriodo = await controllerPeriodo.deletarPeriodo(id)

    if (dadosPeriodo.length != 0) {
        response.status(dadosPeriodo.status)
        response.json(dadosPeriodo)
    } else {
        return message.ERROR_ID_NOT_FOUND
    }
})

//Endpoint que retorna todos os periodos
app.get('/v1/mecanica/periodo', cors(), async function(request, response) {

    let resultPeriodo = await controllerPeriodo.getPeriodos()

    response.status(resultPeriodo.status)
    response.json(resultPeriodo)
})

//Endpoint que retorna o periodo filtrando pelo id
app.get('/v1/mecanica/periodo/:id', cors(), async function(request, response) {
    let id = request.params.id

    let dadosPeriodo = await controllerPeriodo.getBuscarPeriodoId(id);

    response.status(dadosPeriodo.status)
    response.json(dadosPeriodo)

})

//Endpoint que retorna o periodo filtrando pelo nome
app.get('/v1/mecanica/periodo/nome/:nome', cors(), async function(request, response) {
    let nome = request.params.nome

    let dadosPeriodo = await controllerPeriodo.getBuscarPeriodoNome(nome);

    response.status(dadosPeriodo.status)
    response.json(dadosPeriodo)

})

/******************************************************************************
 * Objetivo: API para integração entre back e banco de dados Ano (CRUD)
 * Data: 29/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Endpoint que adiciona um ano no banco
app.post('/v1/mecanica/ano', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body
        let resultDados = await controllerAno.inserirAno(dadosBody)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que atualiza o ano
app.put('/v1/mecanica/ano/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let idAno = request.params.id
        let dadosBody = request.body
        let resultDados = await controllerAno.atualizarAno(dadosBody, idAno)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que deleta um ano do banco
app.delete('/v1/mecanica/ano/:id', cors(), async function(request, response) {
    let id = request.params.id

    let dadosAno = await controllerAno.deletarAno(id)

    if (dadosAno.length != 0) {
        response.status(dadosAno.status)
        response.json(dadosAno)

    } else {
        return message.ERROR_ID_NOT_FOUND
    }

})

//Endpoint que retorna todos os anos
app.get('/v1/mecanica/ano', cors(), async function(request, response) {
    let resultAno = await controllerAno.getAnos()

    response.status(resultAno.status)
    response.json(resultAno)
})

//Endpoint que retorna o ano pelo id
app.get('/v1/mecanica/ano/:id', cors(), async function(request, response) {
    let id = request.params.id

    let dadosAno = await controllerAno.getBuscarAnoId(id)

    response.status(dadosAno.status)
    response.json(dadosAno)
})

//Endpoint que retorna o ano pelo numero do ano
app.get('/v1/mecanica/ano/nome/:nome', cors(), async function(request, response) {
    let nome = request.params.nome

    let dadosAno = await controllerAno.getBuscarAnoYear(nome)

    response.status(dadosAno.status)
    response.json(dadosAno)
})

/******************************************************************************
 * Objetivo: API para integração entre back e banco de dados Turma (CRUD)
 * Data: 29/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Endpoint que adiciona uma turma no banco
app.post('/v1/mecanica/turma', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body
        let resultDados = await controllerTurma.inserirTurma(dadosBody)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que atualiza a turma
app.put('/v1/mecanica/turma/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let idTurma = request.params.id
        let dadosBody = request.body
        let resultDados = await controllerTurma.atualizarTurma(dadosBody, idTurma)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que deleta uma turma do banco
app.delete('/v1/mecanica/turma/:id', cors(), async function(request, response) {
    let id = request.params.id

    let dadosTurma = await controllerTurma.deletarTurma(id)

    if (dadosTurma.length != 0) {
        response.status(dadosTurma.status)
        response.json(dadosTurma)

    } else {
        return message.ERROR_ID_NOT_FOUND
    }

})

//Endpoint que retorna todos as turmas
app.get('/v1/mecanica/turma', cors(), async function(request, response) {
    let resultTurma = await controllerTurma.getTurmas()

    response.status(resultTurma.status)
    response.json(resultTurma)
})

//Endpoint que retorna a turma pelo id
app.get('/v1/mecanica/turma/:id', cors(), async function(request, response) {
    let id = request.params.id

    let dadosTurma = await controllerTurma.getBuscarTurmaId(id)

    response.status(dadosTurma.status)
    response.json(dadosTurma)
})

//Endpoint que retorna a turma pelo numero do ano
app.get('/v1/mecanica/turma/nome/:nome', cors(), async function(request, response) {
    let nome = request.params.nome

    let dadosTurma = await controllerTurma.getBuscarTurmaNome(nome)

    response.status(dadosTurma.status)
    response.json(dadosTurma)
})


/******************************************************************************
 * Objetivo: API para integração entre back e banco de dados Matricula (CRUD)
 * Data: 30/05/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Endpoint que adiciona uma matricula no banco
app.post('/v1/mecanica/matricula', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body
        let resultDados = await controllerMatricula.inserirMatricula(dadosBody)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que atualiza a matricula
app.put('/v1/mecanica/matricula/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let id = request.params.id
        let dadosBody = request.body
        let resultDados = await controllerMatricula.atualizarMatricula(dadosBody, id)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que deleta uma matricula do banco
app.delete('/v1/mecanica/matricula/:id', cors(), async function(request, response) {
    let id = request.params.id

    let dadosMatricula = await controllerMatricula.deletarMatricula(id)

    if (dadosMatricula.length != 0) {
        response.status(dadosMatricula.status)
        response.json(dadosMatricula)

    } else {
        return message.ERROR_ID_NOT_FOUND
    }

})

//Endpoint que retorna todos as turmas
app.get('/v1/mecanica/matricula', cors(), async function(request, response) {
    let resultMatricula = await controllerMatricula.getMatriculas()

    response.status(resultMatricula.status)
    response.json(resultMatricula)
})

//Endpoint que retorna a matricula do aluno filtrando pela matricula
app.get('/v1/mecanica/matricula/numero-matricula/:matricula', cors(), async function(request, response) {
    let matricula = request.params.matricula

    let resultMatricula = await controllerMatricula.getMatricula(matricula);

    response.status(resultMatricula.status)
    response.json(resultMatricula)

})

//Endpoint que retorna a matricula filtrando pelo id
app.get('/v1/mecanica/matricula/:id', cors(), async function(request, response) {
    let id = request.params.id

    let resultMatricula = await controllerMatricula.getMatriculaId(id);

    response.status(resultMatricula.status)
    response.json(resultMatricula)

})

/******************************************************************************
 * Objetivo: API para integração entre back e banco de dados Tipo de Atividade (CRUD)
 * Data: 01/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Endpoint que adiciona um tipo de atividade
app.post('/v1/mecanica/tipo-atividade', bodyParserJSON, cors(), async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body
        let resultDados = await controllerTipoAtividade.inserirTipoAtividade(dadosBody)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que atualiza o tipo de atividade
app.put('/v1/mecanica/tipo-atividade/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let id = request.params.id
        let dadosBody = request.body
        let resultDados = await controllerTipoAtividade.atualizarTipoAtividade(dadosBody, id)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que deleta um tipo de atividade do banco
app.delete('/v1/mecanica/tipo-atividade/:id', cors(), async function(request, response) {
    let id = request.params.id

    let dadosTipoAtividade = await controllerTipoAtividade.deletarTipoAtividade(id)

    if (dadosTipoAtividade.length != 0) {
        response.status(dadosTipoAtividade.status)
        response.json(dadosTipoAtividade)

    } else {
        return message.ERROR_ID_NOT_FOUND
    }

})

//Endpoint que retorna os tipos de atividades existentes
app.get('/v1/mecanica/tipo-atividade', cors(), async function(request, response) {
    let dadosAtividade = await controllerTipoAtividade.getTipoAtividade();

    response.status(dadosAtividade.status)
    response.json(dadosAtividade)

})

//Endpoint que retorna o tipo de atividade filtrando pelo id
app.get('/v1/mecanica/tipo-atividade/:id', cors(), async function(request, response) {
    let id = request.params.id

    let resultTipoAtividade = await controllerTipoAtividade.getBuscarTipoAtividadeId(id);

    response.status(resultTipoAtividade.status)
    response.json(resultTipoAtividade)

})

//Endpoint que retorna o tipo de atividade filtrando pelo nome
app.get('/v1/mecanica/tipo-atividade/nome/:nome', cors(), async function(request, response) {
    let nome = request.params.nome

    let resultTipoAtividade = await controllerTipoAtividade.getBuscarTipoAtividadeNome(nome);

    response.status(resultTipoAtividade.status)
    response.json(resultTipoAtividade)

})

/******************************************************************************
 * Objetivo: API para integração entre back e banco de dados dos criterios (CRUD)
 * Data: 02/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Endpoint que cria um novo criterio
app.post('/v1/mecanica/criterio', bodyParserJSON, cors(), async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body
        let resultDados = await controllerCriterio.inserirCriterio(dadosBody)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que atualiza o criterio  
app.put('/v1/mecanica/criterio/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let id = request.params.id
        let dadosBody = request.body
        let resultDados = await controllerCriterio.atualizarCriterio(dadosBody, id)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que deleta um criterio do banco
app.delete('/v1/mecanica/criterio/:id', cors(), async function(request, response) {
    let id = request.params.id

    let dadosCriterio = await controllerCriterio.deletarCriterio(id)

    if (dadosCriterio.length != 0) {
        response.status(dadosCriterio.status)
        response.json(dadosCriterio)

    } else {
        return message.ERROR_ID_NOT_FOUND
    }

})

//Endpoint que retorna os criterios existentes
app.get('/v1/mecanica/criterio', cors(), async function(request, response) {
    let dadosCriterio = await controllerCriterio.getBuscarCriterios();

    response.status(dadosCriterio.status)
    response.json(dadosCriterio)

})

//Endpoint que retorna o tipo de atividade filtrando pelo id
app.get('/v1/mecanica/criterio/:id', cors(), async function(request, response) {
    let id = request.params.id

    let resultCriterio = await controllerCriterio.getBuscarCriterioId(id);

    response.status(resultCriterio.status)
    response.json(resultCriterio)

})

//Endpoint que retorna o criterio filtrando pela descricao
app.get('/v1/mecanica/criterio/descricao/:descricao', cors(), async function(request, response) {
    let descricao = request.params.descricao

    let resultCriterio = await controllerCriterio.getBuscarCriterioDescricao(descricao);

    response.status(resultCriterio.status)
    response.json(resultCriterio)

})

/******************************************************************************
 * Objetivo: API para integração entre back e banco de dados das Turmas Disciplinas Professor (CRUD)
 * Data: 02/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Endpoint que cria um novo relacionamento entre as tabelas
app.post('/v1/mecanica/turma-disciplina-professor', bodyParserJSON, cors(), async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body
        let resultDados = await controllerTurmaDisciplinaProfessor.inserirTurmaDisciplinaProfessor(dadosBody)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que atualiza os dados da tabela  
app.put('/v1/mecanica/turma-disciplina-professor/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let id = request.params.id
        let dadosBody = request.body
        let resultDados = await controllerTurmaDisciplinaProfessor.AtualizarTurmaDisciplinaProfessor(dadosBody, id)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que deleta um dado da tabela  
app.delete('/v1/mecanica/turma-disciplina-professor/:id', cors(), async function(request, response) {
    let id = request.params.id

    let dados = await controllerTurmaDisciplinaProfessor.deletarTurmaDisciplinaProfessor(id)

    if (dados.length != 0) {
        response.status(dados.status)
        response.json(dados)

    } else {
        return message.ERROR_ID_NOT_FOUND
    }

})

//Endpoint que retorna os dados existentes
app.get('/v1/mecanica/turma-disciplina-professor', cors(), async function(request, response) {
    let dados = await controllerTurmaDisciplinaProfessor.getTurmaDisciplinaProfessor();

    response.status(dados.status)
    response.json(dados)

})

//Endpoint que retorna os dados existentes filtrando pelo id
app.get('/v1/mecanica/turma-disciplina-professor/:id', cors(), async function(request, response) {
    let id = request.params.id

    let dados = await controllerTurmaDisciplinaProfessor.getBuscarIdTurmaDisciplinaProfessor(id)

    response.status(dados.status)
    response.json(dados)

})


/******************************************************************************
 * Objetivo: API para integração entre back e banco de dados tempo previsto (CRUD)
 * Data: 01/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Endpoint que adiciona um tempo previsto
app.post('/v1/mecanica/tempo-previsto', bodyParserJSON, cors(), async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body
        let resultDados = await controllerTempoPrevisto.inserirTempoPrevisto(dadosBody)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que atualiza o tempo previsto
app.put('/v1/mecanica/tempo-previsto/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let id = request.params.id
        let dadosBody = request.body
        let resultDados = await controllerTempoPrevisto.atualizarTempoPrevisto(dadosBody, id)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que deleta um tempo previsto do banco
app.delete('/v1/mecanica/tempo-previsto/:id', cors(), async function(request, response) {
    let id = request.params.id

    let dadosTempo = await controllerTempoPrevisto.deletarTempoPrevisto(id)

    if (dadosTempo.length != 0) {
        response.status(dadosTempo.status)
        response.json(dadosTempo)

    } else {
        return message.ERROR_ID_NOT_FOUND
    }

})

//Endpoint que retorna os tempos previstos existentes
app.get('/v1/mecanica/tempo-previsto', cors(), async function(request, response) {
    let dadosTempo = await controllerTempoPrevisto.getTempoPrevisto()

    response.status(dadosTempo.status)
    response.json(dadosTempo)

})

//Endpoint que retorna o tempo previsto filtrando pelo id
app.get('/v1/mecanica/tempo-previsto/:id', cors(), async function(request, response) {
    let id = request.params.id

    let resultTipoAtividade = await controllerTempoPrevisto.getBuscarTempoPrevistoId(id)

    response.status(resultTipoAtividade.status)
    response.json(resultTipoAtividade)

})

//Endpoint que retorna o tempo previsto filtrando pelo tempo
app.get('/v1/mecanica/tempo-previsto/tempo/:tempo', cors(), async function(request, response) {
    let tempo = request.params.tempo

    let resultTempo = await controllerTempoPrevisto.getBuscarTempoPrevistoNome(tempo)

    response.status(resultTempo.status)
    response.json(resultTempo)

})

/******************************************************************************
 * Objetivo: API para integração entre back e banco de dados Turma Disciplina Professor Atividade (CRUD)
 * Data: 01/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Endpoint que adiciona uma Turma Disciplina Professor Atividade
app.post('/v1/mecanica/turma-disciplina-professor-atividade', bodyParserJSON, cors(), async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body
        let resultDados = await controllerTurmaDisciplinaProfessorAtividade.inserirTurmaDisciplinaProfessorAtividade(dadosBody)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que atualiza o Turma Disciplina Professor Atividade
app.put('/v1/mecanica/turma-disciplina-professor-atividade/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let id = request.params.id
        let dadosBody = request.body
        let resultDados = await controllerTurmaDisciplinaProfessorAtividade.atualizarTurmaDisciplinaProfessorAtividade(dadosBody, id)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que deleta uma Turma Disciplina Professor Atividade do banco
app.delete('/v1/mecanica/turma-disciplina-professor-atividade/:id', cors(), async function(request, response) {
    let id = request.params.id

    let dadosTempo = await controllerTurmaDisciplinaProfessorAtividade.deletarTurmaDisciplinaProfessorAtividade(id)

    if (dadosTempo.length != 0) {
        response.status(dadosTempo.status)
        response.json(dadosTempo)

    } else {
        return message.ERROR_ID_NOT_FOUND
    }

})

//Endpoint que retorna os tempos previstos existentes
app.get('/v1/mecanica/turma-disciplina-professor-atividade', cors(), async function(request, response) {
    let dadosTempo = await controllerTurmaDisciplinaProfessorAtividade.getTurmaDisciplinaProfessorAtividade()

    response.status(dadosTempo.status)
    response.json(dadosTempo)

})

//Endpoint que retorna o Turma Disciplina Professor Atividade filtrando pelo id
app.get('/v1/mecanica/turma-disciplina-professor-atividade/:id', cors(), async function(request, response) {
    let id = request.params.id

    let resultTipoAtividade = await controllerTurmaDisciplinaProfessorAtividade.getBuscarTurmaDisciplinaProfessorAtividadeId(id)

    response.status(resultTipoAtividade.status)
    response.json(resultTipoAtividade)

})


/******************************************************************************
 * Objetivo: API para integração entre back e banco de dados Atividade Valor Desejado (CRUD).
 * Data: 09/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Endpoint que insere um novo dado no banco
app.post('/v1/mecanica/atividade-valor-desejado', cors(), bodyParserJSON, async function(request, response) {

    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body

        let resultDados = await controllerAtividadeValorDesejado.inserirAtividadeValorDesejado(dadosBody)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }

})

//Endpoint que atualiza um dado no banco
app.put('/v1/mecanica/atividade-valor-desejado/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let id = request.params.id

        let dadosBody = request.body

        let resultDados = await controllerAtividadeValorDesejado.atualizarAtividadeValorDesejado(dadosBody, id)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)

    }
})

//Endpoint que exclui um dado, filtrando pelo id
app.delete('/v1/mecanica/atividade-valor-desejado/:id', cors(), async function(request, response) {
    let id = request.params.id

    let resultdados = await controllerAtividadeValorDesejado.deletarAtividadeValorDesejado(id)

    if (resultdados.length != 0) {
        response.status(resultdados.status)
        response.json(resultdados)
    } else {
        return message.ERROR_ID_NOT_FOUND
    }

})

//Endpoint que retorna todos os dados 
app.get('/v1/mecanica/atividade-valor-desejado', cors(), async function(request, response) {

    let resultdados = await controllerAtividadeValorDesejado.getAtividadeValorDesejado();

    response.status(resultdados.status)
    response.json(resultdados)

})

//Endpoint que retorna um dado filtrando pelo id
app.get('/v1/mecanica/atividade-valor-desejado/:id', cors(), async function(request, response) {
    let id = request.params.id

    let resultdados = await controllerAtividadeValorDesejado.getBuscarAtividadeValorDesejadoId(id);

    response.status(resultdados.status)
    response.json(resultdados)

})

/*************************************************************************************
 * 
 * ENDPOINT PROFESSOR
 * 
 ***************************************************************************************/
//ENDPOINT PARA AUTENTICAR
app.get('/v1/mecanica/login/professor/:email/:senha', cors(), async(request, response) => {
    let email = request.params.email
    let senha = request.params.senha
    console.log(email);


    let dadosProfessor = await controllerProfessor.autenticarProfessor(email, senha)

    response.status(dadosProfessor.status)
    response.json(dadosProfessor)
    console.log(dadosProfessor);


})

//ENDPOINT PARA TRAZER TODOS PROFESSORES
app.get('/v1/mecanica/professor', cors(), async(request, response) => {
    let dadosProfessor = await controllerProfessor.getProfessores()
    response.status(dadosProfessor.status)
    response.json(dadosProfessor)

})

//ENDPOINT PARA TRAZER O PROFESSOR PELO ID
app.get('/v1/mecanica/professor/:id', cors(), async(request, response) => {
    let id = request.params.id

    let dadosProfessor = await controllerProfessor.getProfessorId(id)
    response.status(dadosProfessor.status)
    response.json(dadosProfessor)

})


/*************************************************************************************
 * 
 * ENDPOINT DISCIPLINA
 * 
 ***************************************************************************************/
app.get('/v1/mecanica/disciplina', cors(), async(request, response) => {
    let dadosDisciplina = await controllerDisciplina.getDisciplinas()
    response.status(dadosDisciplina.status)
    response.json(dadosDisciplina)

})

app.get('/v1/mecanica/disciplina/:id', cors(), async(request, response) => {
    let id = request.params.id
    let dadosDisciplina = await controllerDisciplina.getDisciplinaId(id)
    response.status(dadosDisciplina.status)
    response.json(dadosDisciplina)
})

app.post('/v1/mecanica/disciplina', cors(), bodyParserJSON, async(request, response) => {
    let contentType = request.headers['content-type']

    if (String(contentType).toLocaleLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body;

        let resultDadosDisciplina = await controllerDisciplina.inserirDisciplina(dadosBody)

        response.status(resultDadosDisciplina.status);
        response.json(resultDadosDisciplina)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.put('/v1/mecanica/disciplina/:id', cors(), bodyParserJSON, async(request, response) => {
    let contentType = request.headers['content-type']

    if (String(contentType).toLocaleLowerCase() == 'application/json') {

        let disciplinaId = request.params.id;

        let dadosBody = request.body

        let resultDadosDisciplina = await controllerDisciplina.atualizarDisciplina(dadosBody, disciplinaId)

        response.status(resultDadosDisciplina.status)
        response.json(resultDadosDisciplina)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.delete('/v1/mecanica/disciplina/:id', cors(), async(request, response) => {
    let id = request.params.id
    let resultDados = await controllerDisciplina.deletarDisciplina(id)

    response.status(resultDados.status)
    response.json(resultDados)
})

/******************************************************************************
 * Objetivo: API para integração entre back e banco de dados valor desejado (CRUD)
 * Data: 08/06/2023
 * Autor: Claudio
 * Versão: 1.0
 *******************************************************************************/
app.get('/v1/mecanica/valor-desejado', cors(), async(request, response) => {
    let dadosValorDesejado = await controllerValorDesejado.getValorDesejado()
    response.status(dadosValorDesejado.status)
    response.json(dadosValorDesejado)

})

app.get('/v1/mecanica/valor-desejado/:id', cors(), async(request, response) => {
    let id = request.params.id
    let dadosValorDesejado = await controllerValorDesejado.getValorDesejadoByID(id)
    response.status(dadosValorDesejado.status)
    response.json(dadosValorDesejado)

})

app.post('/v1/mecanica/valor-desejado', cors(), bodyParserJSON, async(request, response) => {
    let contentType = request.headers['content-type']

    if (String(contentType).toLocaleLowerCase() == 'application/json') {
        let dadosBody = request.body;

        let dadosValorDesejado = await controllerValorDesejado.inserirValorDesejado(dadosBody)

        response.status(dadosValorDesejado.status);
        response.json(dadosValorDesejado)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.put('/v1/mecanica/valor-desejado/:id', cors(), bodyParserJSON, async(request, response) => {
    let contentType = request.headers['content-type']

    if (String(contentType).toLocaleLowerCase() == 'application/json') {
        let id = request.params.id;

        let dadosBody = request.body
        let dadosValorDesejado = await controllerValorDesejado.atualizarValorDesejado(dadosBody, id)
        response.status(dadosValorDesejado.status);
        response.json(dadosValorDesejado)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.delete('/v1/mecanica/valor-desejado/:id', cors(), async(request, response) => {
    let id = request.params.id
    let resultDados = await controllerValorDesejado.deletarValorDesejado(id)

    response.status(resultDados.status)
    response.json(resultDados)
})

/******************************************************************************
 * Objetivo: API para integração entre back e banco de dados atividade (CRUD)
 * Data: 08/06/2023
 * Autor: Claudio
 * Versão: 1.0
 *******************************************************************************/

app.get('/v1/mecanica/atividade', cors(), async(request, response) => {

    let dados = await controllerAtividade.getAtividade()

    response.status(dados.status)
    response.json(dados)

})

app.get('/v1/mecanica/atividade/:id', cors(), async(request, response) => {

    let id = request.params.id
    let dados = await controllerAtividade.getAtividadeById(id)

    response.status(dados.status)
    response.json(dados)

})

app.post('/v1/mecanica/atividade', cors(), bodyParserJSON, async(request, response) => {
    let contentType = request.headers['content-type']

    if (String(contentType).toLocaleLowerCase() == 'application/json') {

        let dadosBody = request.body;

        let dados = await controllerAtividade.inserirAtividade(dadosBody)

        response.status(dados.status);
        response.json(dados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.put('/v1/mecanica/atividade/:id', cors(), bodyParserJSON, async(request, response) => {
    let contentType = request.headers['content-type']

    if (String(contentType).toLocaleLowerCase() == 'application/json') {

        let id = request.params.id;

        let dadosBody = request.body
        let dados = await controllerAtividade.atualizarAtividade(dadosBody, id)
        response.status(dados.status);
        response.json(dados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

/******************************************************************************
 * Objetivo: API para integração entre back e banco de dados Registro de Tempo (CRUD)
 * Data: 09/06/2023
 * Autor: Nicole
 * Versão: 1.0
 *******************************************************************************/

// end-point que retorna o registro de tempo com base no id
app.get('/v1/mecanica/registroTempo/:id', cors(), async function(request, response) {

    let id = request.params.id

    let dados = await controllerRegistroDeTempo.selectedTimeRecordrByIdInDb(id)

    response.status(dados.status)
    response.json(dados)

})

// end-point que insere um novo registro de tempo
app.post('/v1/mecanica/registroTempo', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {
        let dateTimer = request.body
        console.log(dateTimer)

        let dados = await controllerRegistroDeTempo.insertTimeRecordInDb(dateTimer)

        response.status(dados.status)
        response.json(dados)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }

})

// end-point que retorna todos os registros de tempo
app.get('/v1/mecanica/registroTempo', cors(), async function(request, response) {

    let dados = await controllerRegistroDeTempo.getTimeRecords()
    console.log(dados)

    response.status(dados.status)
    response.json(dados)
})

// end-point que deleta um registro de tempo
app.delete('/v1/mecanica/registroTempo/:id', cors(), async function(request, response) {

    let id = request.params.id

    let dados = await controllerRegistroDeTempo.deleteTimeRecordInDb(id)

    response.status(dados.status)
    response.json(dados)

})

// end-point que atualiza registros de tempo
app.put('/v1/mecanica/registroTempo/:id', cors(), bodyParserJSON, async function(request, response) {

    let id = request.params.id

    let dadosTimeRecordBody = request.body
    console.log(dadosTimeRecordBody)

    let dados = await controllerRegistroDeTempo.updateTimerRecordInDb(dadosTimeRecordBody, id)

    response.status(dados.status)
    response.json(dados)

})


/******************************************************************************
 * Objetivo: API para integração entre back e banco de dados das Matricula Atividade Registro de Tempo (CRUD)
 * Data: 11/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Endpoint que cria um novo relacionamento entre as tabelas
app.post('/v1/mecanica/matricula-atividade-registroTempo', bodyParserJSON, cors(), async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body
        let resultDados = await controllerMatriculaAtividadeRegistroDeTempo.inserirMatriculaAtividadeRegistroTempo(dadosBody)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que atualiza os dados da tabela  
app.put('/v1/mecanica/matricula-atividade-registroTempo/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let id = request.params.id
        let dadosBody = request.body
        let resultDados = await controllerMatriculaAtividadeRegistroDeTempo.AtualizarMatriculaAtividadeRegistroTempo(dadosBody, id)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que deleta um dado da tabela  
app.delete('/v1/mecanica/matricula-atividade-registroTempo/:id', cors(), async function(request, response) {
    let id = request.params.id

    let dados = await controllerMatriculaAtividadeRegistroDeTempo.deletarMatriculaAtividadeRegistroTempo(id)

    if (dados.length != 0) {
        response.status(dados.status)
        response.json(dados)

    } else {
        return message.ERROR_ID_NOT_FOUND
    }

})

//Endpoint que retorna os dados existentes
app.get('/v1/mecanica/matricula-atividade-registroTempo', cors(), async function(request, response) {
    let dados = await controllerMatriculaAtividadeRegistroDeTempo.getMatriculaAtividadeRegistroTempo();

    response.status(dados.status)
    response.json(dados)

})

//Endpoint que retorna os dados existentes filtrando pelo id
app.get('/v1/mecanica/matricula-atividade-registroTempo/:id', cors(), async function(request, response) {
    let id = request.params.id

    let dados = await controllerMatriculaAtividadeRegistroDeTempo.getBuscarIdMatriculaAtividadeRegistroTempo(id)

    response.status(dados.status)
    response.json(dados)

})


/******************************************************************************
 * Objetivo: API para integração entre back e banco de dados Avaliação (CRUD)
 * Data: 12/06/2023
 * Autor: Julia
 * Versão: 1.0
 *******************************************************************************/

//Endpoint que adiciona uma Avaliação
app.post('/v1/mecanica/avaliacao', bodyParserJSON, cors(), async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let dadosBody = request.body
        let resultDados = await controllerAvaliacao.inserirAvaliacao(dadosBody)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que atualiza o Avaliação
app.put('/v1/mecanica/avaliacao/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']

    if (String(contentType).toLowerCase() == 'application/json') {

        let id = request.params.id
        let dadosBody = request.body
        let resultDados = await controllerAvaliacao.atualizarAvaliacao(dadosBody, id)

        response.status(resultDados.status)
        response.json(resultDados)

    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint que deleta uma Avaliação do banco
app.delete('/v1/mecanica/avaliacao/:id', cors(), async function(request, response) {
    let id = request.params.id

    let dadosTempo = await controllerAvaliacao.deletarAvaliacao(id)

    if (dadosTempo.length != 0) {
        response.status(dadosTempo.status)
        response.json(dadosTempo)

    } else {
        return message.ERROR_ID_NOT_FOUND
    }

})

//Endpoint que retorna as avaliações existentes
app.get('/v1/mecanica/avaliacao', cors(), async function(request, response) {
    let dadosTempo = await controllerAvaliacao.getAvaliacao()

    response.status(dadosTempo.status)
    response.json(dadosTempo)

})

//Endpoint que retorna a Avaliação filtrando pelo id
app.get('/v1/mecanica/avaliacao/:id', cors(), async function(request, response) {
    let id = request.params.id

    let resultTipoAtividade = await controllerAvaliacao.getBuscarAvaliacaoId(id)

    response.status(resultTipoAtividade.status)
    response.json(resultTipoAtividade)

})

const port = process.env.PORT || 8080
console.log(port);

app.listen(port, function() {
    console.log('Servidor aguardando requisições na porta 8080');
})