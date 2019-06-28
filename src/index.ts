import App from './app/app'

const port = process.env.PORT || 3000

App.listen(port, () => {
  console.log(`server is listening on ${port}`)
})
