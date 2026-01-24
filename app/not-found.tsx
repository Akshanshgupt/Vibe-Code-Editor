import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-6xl font-extrabold text-gray-900 dark:text-gray-100">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="pt-4">
          <Link href="/">
            <Button variant="brand" size="lg" className="gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
