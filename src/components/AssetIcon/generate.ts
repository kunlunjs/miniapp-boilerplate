import glob from 'fast-glob'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

function generateTypesAndNodes() {
  const staticFolder = resolve(__dirname, 'FIXME/static')
  const assets = glob.sync(resolve(__dirname, 'FIXME.{svg,png,gif,webp,jpe?g}'))
  const srcList: string[] = []
  for (const asset of assets) {
    const srcPath = asset.replace(staticFolder, '').replace(/^\//, '')
    srcList.push(srcPath)
  }
  writeFileSync(
    resolve(__dirname, 'src.ts'),
    `/* eslint-disable */\nexport const availableAssetList = ['${srcList.join(
      "', '"
    )}'] as const\nexport type AvailableAssetSRC = typeof availableAssetList[number]\n`,
    { encoding: 'utf-8' }
  )
}

generateTypesAndNodes()
