import * as path from "node:path";
import * as fs from "node:fs";

export function validateImageFile(filePath: string) {
    const extension = path.extname(filePath).toLowerCase();
    const validExtensions = ['.jpg', '.jpeg', '.png', '.svg'];
    const stats = fs.statSync(filePath);

    return {
        extension,
        size: stats.size,
        isValidExtension: validExtensions.includes(extension),
        isValidSize: stats.size < 500000
    };
}