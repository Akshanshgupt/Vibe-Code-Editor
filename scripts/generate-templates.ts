import { saveTemplateStructureToJson } from "../modules/playground/lib/path-to-json";
import { templatePaths } from "../lib/template";
import path from "path";
import fs from "fs/promises";

/**
 * Pre-generates template JSON files for Vercel deployment
 * This script should be run during build time
 */
async function generateTemplates() {
  const templatesDir = path.join(process.cwd(), "public", "templates");
  
  // Ensure templates directory exists
  await fs.mkdir(templatesDir, { recursive: true });

  console.log("Generating template JSON files...");

  for (const [templateKey, templatePath] of Object.entries(templatePaths)) {
    try {
      const inputPath = path.join(process.cwd(), templatePath);
      const outputPath = path.join(templatesDir, `${templateKey.toLowerCase()}.json`);

      console.log(`Generating ${templateKey} template...`);
      await saveTemplateStructureToJson(inputPath, outputPath);
      console.log(`✓ ${templateKey} template generated successfully`);
    } catch (error) {
      console.error(`✗ Error generating ${templateKey} template:`, error);
      // Continue with other templates even if one fails
    }
  }

  console.log("Template generation complete!");
}

// Run the script
generateTemplates().catch((error) => {
  console.error("Failed to generate templates:", error);
  process.exit(1);
});

export { generateTemplates };
