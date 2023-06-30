import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.openStringLocation', async () => {
        const pasteBuffer = await vscode.env.clipboard.readText();
        const position = parseStringLocation(pasteBuffer);

        if (position) {
            openFileAndPositionCursor(position);
        } else {
            vscode.window.showErrorMessage('Invalid string format in the paste buffer.');
        }
    });

    context.subscriptions.push(disposable);
}

function parseStringLocation(locationString: string): { filePath: string; position: vscode.Position } | null {
    const parts = locationString.split(':');
    if (parts.length < 2) {
        return null; // Invalid format
    }

    const filePath = parts[0];
    const line = parseInt(parts[parts.length - 2]);
    const column = parts[parts.length - 1];

    if (isNaN(line)) {
        return null; // Invalid line number
    }

    return { filePath, position: new vscode.Position(line - 1, column ? parseInt(column) - 1 : 0) };
}

async function openFileAndPositionCursor(location: { filePath: string; position: vscode.Position } | null) {
    if (!location) {
        return;
    }

    let rootPath: string | undefined;

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
        // Get the root path of the first workspace folder
        rootPath = workspaceFolders[0].uri.fsPath;
    } else if (vscode.workspace.workspaceFile) {
        // If there is a workspace file, use its directory as the root path
        rootPath = path.dirname(vscode.workspace.workspaceFile.fsPath);
    } else {
        // Fallback to the current folder where Visual Studio Code was launched from
        rootPath = process.cwd();
    }

    const fullPath = path.resolve(rootPath, location.filePath);

    try {
        const document = await vscode.workspace.openTextDocument(fullPath);
        const editor = await vscode.window.showTextDocument(document);
        const { position } = location;
        editor.selection = new vscode.Selection(position, position);
        editor.revealRange(new vscode.Range(position, position), vscode.TextEditorRevealType.InCenter);
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to open file: ${error}`);
    }
}
