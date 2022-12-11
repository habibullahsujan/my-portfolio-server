
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.rvqsrsr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {

    const projectCollection=client.db('personal-portfolio').collection('project')
    const projectsCollection=client.db('personal-portfolio').collection('projects')
  
    app.get("/my-projects", async (req, res) => {
      const query = {};
      const result = await projectCollection.find(query).toArray();
      res.send(result);
    });

    app.get('/project-details/:id', async(req,res)=>{
        const id=parseInt(req.params.id);
        const query={project_id:id}
        const result=await projectsCollection.findOne(query);
        res.send(result)
    })
  } finally {
  }
}
run().catch((error) => console.error(error));

app.get("/", (req, res) => {
  res.send("server is liv now");
});

app.listen(port, () => {
  console.log(`the server is running in port:${port}`);
});
