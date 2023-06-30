# codely

The codely extension is designed to open a specific file and position the cursor at a specified line and column within Visual Studio Code.

## Features

- Open files with specified line and column positions.
- Automatically position the cursor at the specified location.

## Requirements

- Visual Studio Code version 1.79.0 or newer.

## Installation

1. Launch Visual Studio Code.
2. Go to the Extensions view by clicking on the square icon on the left sidebar or by pressing `Ctrl+Shift+X` (or `Cmd+Shift+X` on macOS).
3. Search for "codely" in the Extensions view.
4. Click the Install button next to the "codely" extension.
5. Reload Visual Studio Code to activate the extension.

## Usage

1. Copy a string of the format `relative_path:line_number:column_number` to the clipboard.
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) to open the command palette.
3. Type "Open String Location" and select the command from the list.
4. The extension will open the specified file and position the cursor at the specified line and column.

## Configuration

The codely extension does not require any configuration.

## Known Issues

- If the specified file does not exist, an error message will be displayed.
- If the specified line or column number is invalid, the cursor may not be positioned correctly.

## Release Notes

### 0.0.1

- Initial release of codely extension.

## Contributing

Contributions are welcome! Fork the repository and submit a pull request with your enhancements.

## License

This extension is licensed under the [MIT License](LICENSE).
