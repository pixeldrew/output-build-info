## output build info

Shell tool to write ci-info from GHA, JENKINS, TRAVIS_CI info into json file. Can be used in conjunction with
[@pixeldrew/build-info](https://www.npmjs.com/package/@pixeldrew/build-info) to output this file via express

## usage:

output .build-info.json to root of package

```shell
$ npx @pixeldrew/output-build-info -h

Usage: output-build-info -f [filename] -d [directory]

Options:
      --version    Show version number                                 [boolean]
  -f, --file       Output directory                 [default: ".build-info.json"]
  -h, --help       Show help                                           [boolean]
  -d, --directory      [default: `cwd`]

$ npx @pixeldrew/output-build-info
Wrote build-info to /app/.build-info.json
```
