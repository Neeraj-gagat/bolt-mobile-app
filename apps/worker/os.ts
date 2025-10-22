import { prismaClient } from "db/client";

const BASE_WORKER_DIR = process.env.BASE_WORKER_DIR || "/tmp/boltify-worker";

if (!Bun.file(BASE_WORKER_DIR).exists()) {
    Bun.write(BASE_WORKER_DIR, "");
}

export async function onFileUpdate(filepath:string, fileContent:string, projectId: string) {
    await Bun.write(`${BASE_WORKER_DIR}/${filepath}`, fileContent);
    await prismaClient.action.create({
        data:{
            projectId,
            content: `updated file: ${filepath}`
        }
    })
}

export async function onShellCommand(shellCommand:string, projectId:string) {
    const commands = shellCommand.split("&&");
    for (const command of commands) {
        console.log(`Excecuting comands: ${command}`);
        const result = Bun.spawnSync({cmd: command.split(" "), cwd: BASE_WORKER_DIR});
        prismaClient.action.create({
            data:{
                projectId,
                content: `ran shell command: ${command}`
            }
        })
        console.log(result.stdout);
        console.log(result.stderr.toString());
    }
}