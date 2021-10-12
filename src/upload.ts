import { Dropbox, account, DropboxResponseError } from 'dropbox'
import fetch from 'node-fetch'

export function makeUpload(accessToken: string): {
  upload: (
    path: string,
    contents: Buffer,
    options: {
      mode: string
      autorename: boolean
      mute: boolean
    }
  ) => Promise<void>
  createLink: (path: string) => Promise<string>
} {
  const dropbox = new Dropbox({ accessToken, fetch })

  return {
    upload: async (path, contents, options) => {
      await dropbox.filesUpload({
        path,
        contents,
        mode: { '.tag': 'add' },
        autorename: options.autorename,
        mute: options.mute,
      })
    },
    createLink: async (path) => {
      const result = await dropbox.sharingCreateSharedLinkWithSettings({
        path,
        settings: {
          audience: { '.tag': 'public' },
        },
      })
      return result.result.url
    },
  }
}
