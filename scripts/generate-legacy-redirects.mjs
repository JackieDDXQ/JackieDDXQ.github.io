import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const directoryMappings = [
  {
    source: 'projects/prototypes/chuxing-equity/teld',
    legacy: 'teld',
  },
  {
    source: 'projects/prototypes/multi-tenant-mall/shopping-mall',
    legacy: 'shoppingMall/prototypes',
  },
  {
    source: 'projects/prototypes/physical-mall/emall',
    legacy: 'projects/emall',
  },
];

const entryMappings = [
  {
    source: 'projects/prototypes/rights-management/depot/dist/index.html',
    legacy: 'projects/depot/dist/index.html',
  },
  {
    source: 'projects/prototypes/rights-management/omni/dist/index.html',
    legacy: 'projects/omni/dist/index.html',
  },
  {
    source: 'projects/prototypes/rights-management/cel/frontend/dist/index.html',
    legacy: 'projects/cel/frontend/dist/index.html',
  },
];

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(directory, entry.name);
      if (entry.isDirectory()) return listHtmlFiles(entryPath);
      return entry.isFile() && entry.name.endsWith('.html') ? [entryPath] : [];
    }),
  );
  return nestedFiles.flat();
}

function redirectDocument(target) {
  const publicTarget = `/${target.split(sep).join('/')}`;
  const escapedTarget = publicTarget.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <meta http-equiv="refresh" content="0; url=${escapedTarget}">
  <link rel="canonical" href="${escapedTarget}">
  <title>页面已迁移</title>
  <script>location.replace(${JSON.stringify(publicTarget)} + location.search + location.hash)</script>
</head>
<body>
  <p>页面已迁移至 <a href="${escapedTarget}">${escapedTarget}</a>。</p>
</body>
</html>
`;
}

async function writeRedirect(legacy, source) {
  const destinationPath = resolve(repositoryRoot, legacy);
  const sourcePath = resolve(repositoryRoot, source);
  if (!destinationPath.startsWith(repositoryRoot) || !sourcePath.startsWith(repositoryRoot)) {
    throw new Error('Redirect mapping points outside the repository.');
  }
  await mkdir(dirname(destinationPath), { recursive: true });
  await writeFile(destinationPath, redirectDocument(relative(repositoryRoot, sourcePath)), 'utf8');
}

for (const mapping of directoryMappings) {
  const sourceDirectory = resolve(repositoryRoot, mapping.source);
  const files = await listHtmlFiles(sourceDirectory);
  for (const sourcePath of files) {
    const nestedPath = relative(sourceDirectory, sourcePath);
    await writeRedirect(join(mapping.legacy, nestedPath), relative(repositoryRoot, sourcePath));
  }
}

for (const mapping of entryMappings) {
  await writeRedirect(mapping.legacy, mapping.source);
}

console.log('Legacy prototype redirects generated.');
