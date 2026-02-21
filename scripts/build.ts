import { build, context, BuildOptions } from "esbuild";

const isDev = process.argv.includes("--watch");

// 通用配置
const baseConfig: BuildOptions = {
  bundle: true,
  logLevel: "info",
  charset: "utf8",
  tsconfig: "./tsconfig.json",
};

// 统一的构建目标列表
const builds: { config: BuildOptions }[] = [
  {
    // main
    config: {
      ...baseConfig,
      platform: "node",
      target: "node20",
      format: "cjs",
      entryPoints: ["src/main/index.ts"],
      outfile: "dist/main/index.js",
      external: ["electron"],
    },
  },
  {
    // preload
    config: {
      ...baseConfig,
      platform: "node",
      target: "node20",
      format: "cjs",
      entryPoints: ["src/preload/index.ts"],
      outfile: "dist/preload/index.js",
      external: ["electron"],
    },
  },
  {
    // renderer-qwq
    config: {
      ...baseConfig,
      platform: "browser",
      target: "esnext",
      format: "cjs",
      entryPoints: ["src/renderer/index.qwq.ts"],
      outfile: "dist/renderer/index.qwq.js",
    },
  },
  {
    // renderer-ll
    config: {
      ...baseConfig,
      platform: "browser",
      target: "esnext",
      format: "esm",
      entryPoints: ["src/renderer/index.ll.ts"],
      outfile: "dist/renderer/index.ll.js",
    },
  },
];

// 构建函数
async function runBuild() {
  if (isDev) {
    console.log("Starting development build...");

    // 使用 Promise.all 和 map 统一处理上下文和 watch
    const contexts = await Promise.all(
      builds.map(async ({ config }) => {
        const ctx = await context(config);
        await ctx.watch();
        return ctx;
      }),
    );

    console.log("Development build started. Watching for changes...");
    return contexts;
  } else {
    console.log("Starting production build...");
    try {
      // 遍历 builds 数组进行并行构建
      await Promise.all(
        builds.map(async ({ config }) => {
          await build(config);
        }),
      );
      console.log("Production build completed successfully.");
    } catch (err) {
      console.error("Error during production build:", err);
      process.exit(1);
    }
  }
}

runBuild().catch((err) => {
  console.error("Unhandled error in build script:", err);
  process.exit(1);
});
