import { db } from "@/lib/db";
import { templatePaths } from "@/lib/template";
import path from "path";
import fs from "fs/promises";
import { NextRequest } from "next/server";

function validateJsonStructure(data: unknown): boolean {
  try {
    JSON.parse(JSON.stringify(data)); // Ensures it's serializable
    return true;
  } catch (error) {
    console.error("Invalid JSON structure:", error);
    return false;
  }
}

/**
 * Reads template JSON from pre-generated files (for Vercel/serverless)
 * Falls back to filesystem generation for local development
 */
async function getTemplateJson(templateKey: string): Promise<any> {
  // Try to read from pre-generated template files (Vercel/serverless compatible)
  const preGeneratedPath = path.join(
    process.cwd(),
    "public",
    "templates",
    `${templateKey.toLowerCase()}.json`
  );

  try {
    // Check if pre-generated file exists
    await fs.access(preGeneratedPath);
    const data = await fs.readFile(preGeneratedPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // Pre-generated file doesn't exist, try filesystem generation (local dev only)
    console.log(
      `Pre-generated template not found, attempting filesystem generation for ${templateKey}`
    );

    // Only try filesystem generation in development
    if (process.env.NODE_ENV === "development") {
      try {
        const {
          readTemplateStructureFromJson,
          saveTemplateStructureToJson,
        } = await import("@/modules/playground/lib/path-to-json");
        const templatePath = templatePaths[templateKey as keyof typeof templatePaths];
        
        if (!templatePath) {
          throw new Error(`Invalid template: ${templateKey}`);
        }

        const inputPath = path.join(process.cwd(), templatePath);
        const outputFile = path.join(process.cwd(), `output/${templateKey}.json`);

        await saveTemplateStructureToJson(inputPath, outputFile);
        const result = await readTemplateStructureFromJson(outputFile);

        // Clean up temp file
        try {
          await fs.unlink(outputFile);
        } catch {
          // Ignore cleanup errors
        }

        return result;
      } catch (fsError) {
        console.error("Filesystem generation failed:", fsError);
        throw new Error(
          `Template not available. Please run 'npm run generate-templates' to pre-generate templates.`
        );
      }
    } else {
      // In production, we must have pre-generated files
      throw new Error(
        `Pre-generated template file not found for ${templateKey}. Templates must be generated at build time.`
      );
    }
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return Response.json({ error: "Missing playground ID" }, { status: 400 });
  }

  try {
    const playground = await db.playground.findUnique({
      where: { id },
    });

    if (!playground) {
      return Response.json({ error: "Playground not found" }, { status: 404 });
    }

    const templateKey = playground.template as keyof typeof templatePaths;

    if (!templatePaths[templateKey]) {
      return Response.json({ error: "Invalid template" }, { status: 404 });
    }

    const result = await getTemplateJson(templateKey);

    // Validate the JSON structure
    if (!validateJsonStructure(result.items)) {
      return Response.json({ error: "Invalid JSON structure" }, { status: 500 });
    }

    return Response.json({ success: true, templateJson: result }, { status: 200 });
  } catch (error) {
    console.error("Error loading template JSON:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to load template";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}