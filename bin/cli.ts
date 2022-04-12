#!/usr/bin/env node
import { startAppGenerator } from "../src/code-generator/entry-points/cli-entry-point";
import packageJSON from "../package.json";
startAppGenerator();
