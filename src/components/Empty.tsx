import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Empty component for when there's no content to display
export function Empty({ message = "No data available" }: { message?: string }) {
  return (
    <div className={cn("flex h-full items-center justify-center p-6 text-center")} onClick={() => toast(message)}>
      <p className="text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
}