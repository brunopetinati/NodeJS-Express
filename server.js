console.log('hello, this is Amy')

const express = require('express');
const { send } = require('express/lib/response');
const app = express()

// utilizando um middleware criado.
const logger = require('./middleware')
// usando logger aqui, identificará todas as rotas. mas dependendo de onde é usado (após a definição de uma rota), ele não lerá essa rota, por conta da ordem de leitura javascript.
// ou seja, é possível aplicar um middleware de logger apenas em endpoints específicos.

/* um exemplo de engpoint com middleware a seguir

app.get('/:id', logger, (req, res) => {
  res.send(`Get user with ID ${req.params.id}`)
})

ou

router.use(logger)
para todas as rotas (esse trecho de código seria no arquivo router)

*/

// edit: adicionado após a instalação da engine EJS para views
app.set('view engine', 'ejs')

app.listen(3002)
app.use(logger)

// requisição, response e next: próxima função
app.get('/', (req, res, next) => {
  console.log('rota get foi acessada')
  //as opções, para fins de estudo, são
  //res.send('Olá') => apenas mensagem
  //res.sendStatus(400) => apenas status
  //res.status(500).send('Olá. Inspecione o console') => status e mensagem.
  //res.download('server.js') => download fácil de arquivos.
  res.render('index', { text: "Variável renderizada com sucesso!"}) // => fica em views. todos os arquivos de views ficarão nessa pasta
  // o segundo argumento pode ser usado com <%= na view. São tipo os parâmetros
  // mas no caso de renderiar uma view, é retornado um erro:
  // no default engine was specified, no extension was provided. 
  //É necessário instalar uma extensão para renderizar views. Como EJS (mais usado por ser similar ao HTML),mas também tem o PUG
  //res.status(200).json( { message:'Internal Server Error' } ) => resposta de status e retorno json
  }
)

// a função static leva o nome da pasta onde os static files estão, por isso, public
app.use(express.static('public'))


//possíveis opções de rotas
app.post('/post')
app.delete('/delete')


// estudo de rotas
const userRouter = require('./routes/users')
//const postRouter = require('./routes/posts')

// atribuindo uma rota para todas as rotas definidas em users.js
app.use('/users', userRouter)
//app.use('/posts', postRouter)