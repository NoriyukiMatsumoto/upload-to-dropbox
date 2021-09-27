import { Dropbox, files, DropboxResponseError } from 'dropbox'
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
        mode: getMode(options.mode),
        autorename: options.autorename,
        mute: options.mute,
      })
    },
    createLink: async (path) => {
      try {
        const result = await dropbox.sharingCreateSharedLinkWithSettings({
          path,
        })
        return result.result.url
      } catch (error) {
        if (error instanceof DropboxResponseError) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          return error.error.shared_link_already_exists.url as string
        }
        throw error
      }
    },
  }
}

function getMode(mode: string): files.WriteMode {
  switch (mode) {
    case 'overwrite':
      return {
        '.tag': 'overwrite',
      }
    case 'add':
    default:
      return {
        '.tag': 'add',
      }
  }
}
