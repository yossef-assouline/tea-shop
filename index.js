import express from "express";
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000
app.use(express.json())


let teaData = []
let nextId = 1

app.post('/teas',(req,res)=>{
  const {name,price} = req.body
  const newTea = {
    id:nextId++,
    name,
    price
  }
  teaData.push(newTea)
  res.status(200).send(newTea)
})
app.get('/teas',(req,res)=>{
  res.status(200).send(teaData)
})
app.get('/teas/:id',(req,res)=>{
  const searchedTea = teaData.find(tea => tea.id === parseInt(req.params.id))
  if(!searchedTea){
    return res.status(404).send("Tea not foun")
  }
  res.status(200).send(searchedTea)
})
app.put('/teas/:id', (req, res) => {
  const teaId = parseInt(req.params.id)
  const searchedTea = teaData.find(tea => tea.id === teaId)
  if(!searchedTea){
    return res.status(404).send("Tea not found")
  }
  const {name , price} = req.body
  searchedTea.name = name
  searchedTea.price = price
  res.status(200).send(`you updated tea to ${searchedTea}`)
})
app.delete('/teas/:id' , (req,res) => {
  const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
  if(index === -1){
    res.status(404).send("tea not found")
  }
  teaData.splice(index,1)
  res.status(200).send("tea deleted")
})
app.listen(port, () => {
  console.log(`Server running on port ${port}..`);
});
