# gha-json-value
Extracts a value from JSON file

## Usage

### Extract `version` from package.json

```yml
      - name: Extract value from JSON
        uses: amochkin/gha-json-value@v1-rc5
        id: extract-version
        with:
          property: version
      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.steps.extract-version.outputs.value }}
          release_name: v${{ github.steps.extract-version.outputs.value }}
```

