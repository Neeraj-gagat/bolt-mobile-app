import express from "express"
import cors from "cors"
import { prismaClient} from "db/client"
import { systemPrompt } from "./systemPrompt"
import { ArtifactProcessor } from "./parser"
import { onFileUpdate, onShellCommand } from "./os"
import Anthropic from "@anthropic-ai/sdk"


const app =  express()
app.use(cors());
app.use(express.json());
const port = 9091;

app.post("/prompt", async (req , res ) => {
  const { prompt, projectId } = req.body;
  const client = new Anthropic();

  await prismaClient.prompt.create({
    data:{
        content: prompt,
        projectId,
        type: "USER"
    }
  })

  const allPrompts = await prismaClient.prompt.findMany({
    where:{
        projectId,
    },
    orderBy:{
        cretedAt: "asc",
    }
  })

  let artifactProcessor = new ArtifactProcessor("", onFileUpdate, onShellCommand);
  let artifact = "";

  let response =  client.messages.stream({
    messages: allPrompts.map((p:any) => ({
        role: p.type === "USER" ? "user" : "assistant",
        content: p.content, 
    })),
    system: systemPrompt(projectId.type),
    model: "---TODO---",
    max_tokens: 8000
  }).on("text", (text:any) => {
    artifactProcessor.append(text);
    artifactProcessor.parse();
    artifact += text;
  }).on("finalMessage", async (message:any) => {
    console.log("done...");
    await prismaClient.prompt.create({
        data:{
            content:artifact,
            projectId,
            type: "SYSTEM"
        },
    });
  }).on("error", (err:any) => {
    console.log("error", err);
  });

  res.json({message: "Prompt received & processed"});
});

app.listen(port, () => {
    console.log(`Worker Service running on port ${port}`);
})