#!/usr/bin/env node

/**
 * Outputs VCS & CI info to json file
 * first tries GITHUB_SHA, then GIT_COMMIT then if neither of those exist it tries git
 */
import { writeFile } from "fs/promises";
import { sep } from "path";
import { execFileSync } from "child_process";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const DEFAULT_FILENAME = ".build-info.json";

const git = (arg) =>
  execFileSync(`git`, arg.split(" ")).toString("utf8").trim();
const { env } = process;

const argv = yargs(hideBin(process.argv))
  .alias("f", "file")
  .default("f", DEFAULT_FILENAME)
  .describe("f", "Output filename")
  .alias("d", "directory")
  .default("d", process.cwd())
  .describe("f", "Output directory")
  .help("h")
  .alias("h", "help")
  .usage("Usage: $0 -f [filename] -d [directory]").argv;

const filename = `${argv.directory}${sep}${argv.file}`;
const sha =
  env.GITHUB_SHA ??
  env.GIT_COMMIT ??
  env.TRAVIS_COMMIT ??
  git("rev-parse HEAD");
const branch =
  env.GITHUB_REF_NAME ??
  env.GIT_BRANCH ??
  env.TRAVIS_BRANCH ??
  git("rev-parse --abbrev-ref HEAD");
const build =
  env.GITHUB_RUN_NUMBER ??
  env.BUILD_NUMBER ??
  env.TRAVIS_BUILD_NUMBER ??
  "UNKNOWN";

try {
  await writeFile(
    filename,
    JSON.stringify(
      {
        sha,
        branch,
        build,
      },
      null,
      4
    )
  );

  console.log(`Wrote build-info to ${filename}`);
} catch (e) {
  console.error(`Could not write ${filename} ${e}`);
}
