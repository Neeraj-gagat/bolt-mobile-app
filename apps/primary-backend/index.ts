import {prismaClient} from  "db/client"
import  express  from "express"
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors())

app.post("/project", async (req, res) => {
    const {prompt, ownerId} = req.body;

    const description = prompt.split("\n")[0]
    const project = await prismaClient.project.create({
        data:{ description, ownerId }
    });
    
    res.json({projectId: project.id})
})

