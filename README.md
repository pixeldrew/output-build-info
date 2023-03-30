## output build info

Shell tool to write ci-info from GHA, JENKINS, TRAVIS_CI info into json file. Includes express middleware helpers to output

## usage:

output .buildinfo.json to root of package

```shell
$ npx @pixeldrew/output-build-info
Wrote build-info to /app/.buildinfo.json
```

```javascript
import express from "express";
import {
  addBuildInfo,
  showBuildInfo,
} from "@pixeldrew/output-build-info/middleware.js";

const app = new express();

app.use(addBuildInfo());
app.get("/.build-info", showBuildInfo);

app.get("/build", (req, res) => {
  const buildInfo = req.app.get("build-info");

  res.send(`${buildInfo.version} ${buildInfo.name} ${buildInfo.sha}`);
});

app.listen(3000, () => {
  console.log(`I'm http on port 3000`);
});
```
