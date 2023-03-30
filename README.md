## create build info

Shell tool to output ci-info from GHA, JENKINS, TRAVIS_CI falling back to git info into json file. Includes express middleware for output

## usage:

```shell
$ npx @pixeldrew/create-build-info
```

```javascript
import {
  addBuildinfo,
  showBuildInfo,
} from "@pixeldrew/create-build-info/middleware";

app.use(addBuildinfo());
app.get("/.version-info", showBuildInfo);
```
