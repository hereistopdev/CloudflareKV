const express = require('express')

router.post("/sync/upload", uploadLayer);
async function uploadLayer(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>
{
let file = req.files?.layer;
if (!file || file instanceof Array)
{
next(new createHttpError.BadRequest("No file included in request"));
return;
}

let paintingFolderPath: string = getLayerSyncFolderPath();
FsHelper.createDirectory(paintingFolderPath);

let fileName: string = file.name;

let paintingFilePath: string = path.join(paintingFolderPath, fileName);
if (FsHelper.exists(paintingFilePath))
{
fs.unlinkSync(paintingFilePath);
}
await file.mv(paintingFilePath);

res.sendStatus(200);
}

router.get("/sync/download/:layerId", downloadLayer);
function downloadLayer(req: express.Request, res: express.Response, next: express.NextFunction): void
{
let filePath: string | null = getLayerSyncFilePath(req, next);
if (filePath !== null)
res.download(filePath);
}