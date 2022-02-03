const http = require('http')
const app = require('./app')
const server = http.createServer()

// const { PORT } = process.env
// const port = process.env.PORT || PORT 

const port = 3030

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})