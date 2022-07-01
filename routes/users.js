// estudo de rotas 

const express = require('express')
const router = express.Router() // router funciona exatamente como app

router.get('/', (req, res) => {
  res.send('users/new', { firstName: 'apague aqui para não preencher o input automaticamente' })
})

router.get('/new', (req, res) => {
  res.send('User New Form')
})

router.post('/', (req, res) => {
  // Express does not allow us to access the body. We need to use middleware to do that for us. 
  console.log(req.body.firstName)
  res.send('em views/users/new, ao clicar em submit, isso é renderizado')
  // pelo nome do input, localizamos
})

// parâmetro dinâmico sinalizado com :
router.get('/:id', (req, res) => {
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