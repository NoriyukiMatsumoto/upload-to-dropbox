import * as core from '@actions/core'
import * as fs from 'fs'
import { join, basename } from 'path'
import { makeUpload } from './upload'
import { asBoolean, isDirectory } from './utils'
import { DropboxResponseError } from 'dropbox'

const accessToken = core.getInput('dropbox_access_token')
const src = core.getInput('src')
const dest = core.getInput('dest')
const url_dest_path = core.getInput('url_dest_path')
const mode = core.getInput('mode')
const autorename = asBoolean(core.getInput('autorename'))
const mute = asBoolean(core.getInput('mute'))

async function run() {
  try {
    const { upload } = makeUpload(accessToken)

    const contents = await fs.promises.readFile(src)
    if (isDirectory(dest)) {
      const path = join(dest, basename(src))
      await upload(path, contents, { mode, autorename, mute })
      core.info(`Uploaded: ${src} -> ${path}`)
    } else {
      await upload(dest, contents, { mode, autorename, mute })
      core.info(`Uploaded: ${src} -> ${dest}`)
    }
  } catch (error) {
    if (error instanceof DropboxResponseError) {
      core.error(error.error)
    }
    core.setFailed(error as Error)
  }
}

void run()
