

export class ArtifactProcessor {
    public currentArtifact: string;
    private onFileContent: (filepath:string, fileContent: string) => void;
    private onShellcommand: (shellCommand:string) => void;

    constructor( currentArtifact: string, onFileContent: (filepath:string, fileContent: string) => void, onShellcommand: (shellCommand:string) => void) {
        this.currentArtifact = currentArtifact;
        this.onFileContent = onFileContent;
        this.onShellcommand = onShellcommand;
    }

    append (artifact: string) {
        this.currentArtifact += artifact;
    }

    parse () {
        const latestActionStart =  this.currentArtifact.split('\n').findIndex((line) => line.startsWith('<boltAction type='));
        const latestActionEnds =  this.currentArtifact.split('\n').findIndex((line) => line.startsWith('</boltAction>')) ?? this.currentArtifact.split("\n").length -1;

        if (latestActionStart === -1 || latestActionEnds === -1) {
            return;
        }

        const latestActionType = this.currentArtifact.split('\n')[latestActionStart]?.split("type=")[1]?.split(" ")[0]?.split(">")
        const latestActionContent = this.currentArtifact.split('\n').slice(latestActionStart , latestActionEnds + 1).join("\n");

        try {
            if (latestActionType?.[0] === "\"shell\"") {
              let shellCommand = latestActionContent.split('\n').slice(1).join('\n');
              if (shellCommand.includes('</boltAction>')) {
                shellCommand = shellCommand.split("</boltAction>")[0] ?? "";
                this.currentArtifact = this.currentArtifact.split(latestActionContent)[1] ?? "";
                this.onShellcommand(shellCommand);
              }
            } else if (latestActionType?.[0] === "\"file\"") {
                //@ts-ignore ---TODO fix ts-error
                const filePath = this.currentArtifact.split("\n")[latestActionStart].split("filePath=")[1].split(">")[0];
                let fileContent = latestActionContent.split("\n").slice(1).join("\n");
                if (fileContent.includes("</boltAction>")) {
                    fileContent = fileContent.split("</boltAction>")[0] ?? "";
                    this.currentArtifact = this.currentArtifact.split(latestActionContent)[1] ?? "";
                    //@ts-ignore ---TODO fix ts-error
                    this.onFileContent(filePath.split("\"")[1], fileContent);
                }
               }
        } catch (error) {
            
        }
        
    }
}