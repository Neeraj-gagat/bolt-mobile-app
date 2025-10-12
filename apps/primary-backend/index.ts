import {prismaClient} from  "db/client"
import  express  from "express"
import cors from "cors";
import { authMiddleware } from "./middleware";

const app = express();
app.use(express.json());
app.use(cors())

app.post("/project", authMiddleware, async (req, res) => {
    const {prompt} = req.body;
    const userId = req.userId!;

    const description = prompt.split("\n")[0];
    const project = await prismaClient.project.create({
        data:{ description, ownerId: userId },
    });
    
    res.json({projectId: project.id})
})

app.get("/projects", authMiddleware, async (req, res) => {
    const userId = req.userId!;
    const project = await prismaClient.project.findMany({
        where:{ownerId:userId }
    });
    
    res.json(project);
})

app.listen(8080, () => {
    console.log("Server started on http://localhost:8080")
})