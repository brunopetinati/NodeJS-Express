// estudo de rotas 

const express = require('express')
const router = express.Router() // router funciona exatamente como app

router.get('/', (req, res) => {
  res.send('users/new', { firstName: 'apague aqui para não preencher o input automaticamente' })
  // está renderizando form que está dentro da pasta users/new.ejs. para acessar essa rota basta localhost:3000/users/new
})

router.get('/tenteaqui', (req, res) => {
  // faça uma requisição para esse endereço enviando um parâmetro, como por exemplo
  // tenteaqui?name=Kyle
  console.log('aqui está o req.query.name', req.query.name)
  res.send('renderizou aqui. cheque o console da linha de cima')
  // está renderizando form que está dentro da pasta users/new.ejs. para acessar essa rota basta localhost:3000/users/new
})

router.get('/new', (req, res) => {
  res.render('users/new', { firstName: req.body.firstName })
})

router.post('/', (req, res) => {
  const isValid = true
  // alterar essa variável para false e fazer requisição post em /users/new para
  // recarregar a página com o form e inserir automaticamente o que tinha sido feito pela variável abaixo 
  // em else
  
  if (isValid) {
    users.push({ firstName: req.body.firstName })
    res.redirect(`/users/${users.length - 1}`)
  } else {
    console.log('error')
    res.render('users/new', { firstName: req.body.firstName })
    // aqui acabamos de setar o valor que ficará no input caso caia em else. lá em new.ejs
    // value= <%= locals.firstName %> recebe o valor dessa variável
  }

  // Express does not allow us to access the body. We need to use middleware to do that for us. 
  console.log(req.body.firstName)
  // pelo nome do input, localizamos, mas como diz no comentário acima, o Express não tem acesso ao body
  // para a linha 17 acima funcionar no momento que clicarmos em um submit no input do form em views/users/new.ejs, seria
  // necessário colocar em server.js a seguinte linha:
  //app.use(express.urlenconded({ extended: true}))
  res.send('em views/users/new, ao clicar em submit, isso é renderizado')
})

// parâmetro dinâmico sinalizado com :
router.get('/:id', (req, res) => {
  console.log(req.user)
  res.send(`Get user with ID ${req.params.id}`)
})

router.put('/:id', (req, res) => {
  res.send(`Update user with ID ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
  res.send(`Delete user with ID ${req.params.id}`)
})


/* router.get('/:userId', (req, res) => {
  req.params.userId
  res.send('User get')
}) */

// outra forma mais simples e mais usada de fazer os códigos acima é

router
.route('/:id')
.get((req, res) => { 
  console.log(req.user)
  // req.user está sendo definido em router.param, que é um middleware. Ele será lido antes disso terminar
  res.send(`Get user with ID ${req.params.id}`) 
})
.put((req, res) => {
  res.send(`Update user with ID ${req.params.id}`)
})
.delete((req, res) => {
  res.send(`Delete user with ID ${req.params.id}`)
})

const users = [ { name: 'Caio' }, { name: 'Sassy' } ]

// whenever you find a param with the name of id, run this function =>
router.param('id', (req, res, next, id) => { 
  req.user = users[id]
  console.log(id)
  // cai aqui dentro e não sai mais até que next faça sair, porque ele essa função param é um middleware
  // middleware é o que acontece no tempo entre a requisião estar sendo mandada para o servidor e sua resposta
  // então por exemplo, é como se na linha 42 tivesse essa função, antes da linha 43
  // para sair, o seguinte código deverá existir
  next()
})

module.exports = router 