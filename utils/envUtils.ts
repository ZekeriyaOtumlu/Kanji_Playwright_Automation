import * as fs from 'fs';
import * as path from 'path';

export function setNewRecoveryCode(newValue: any): void {
    const envPath = path.resolve(__dirname, '..', '.env');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');
    const updatedLines = lines.map(line => {
        if (line.startsWith('RECOVERY_CODE=')) {
            return `RECOVERY_CODE=${newValue}`;
        }
        return line;
    });
    const updatedContent = updatedLines.join('\n');
    fs.writeFileSync(envPath, updatedContent, 'utf-8');
}