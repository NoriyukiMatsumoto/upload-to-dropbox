# Upload to Dropbox

[![](https://github.com/NoriyukiMatsumoto/upload-to-dropbox-action/workflows/build-test/badge.svg)](https://github.com/NoriyukiMatsumoto/upload-to-dropbox-action/actions)

This uploads a file to Dropbox

## Usage

See [action.yml](action.yml)

### Setup

Generate access token that has `files.content.write` permission on [App Console](https://www.dropbox.com/developers/apps).

Save the token as `DROPBOX_ACCESS_TOKEN` on your repository Secrets.

### Upload a file with specified name

```yaml
- uses: NoriyukiMatsumoto/upload-to-dropbox@main
  with:
    dropbox_access_token: ${{ secrets.DROPBOX_ACCESS_TOKEN }}
    src: dist/paper.pdf
    dest: /thesis/my-thesis.pdf
```