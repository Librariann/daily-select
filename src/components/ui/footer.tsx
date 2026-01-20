import { Dices } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-100 bg-white py-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
            <Dices className="h-5 w-5" />
            <span className="font-medium">골라줘</span>
          </div>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            생각하기 귀찮을 때 그냥 누르는 사이트
          </p>
          <p className="text-xs text-slate-300 dark:text-slate-600">
            © {new Date().getFullYear()} 골라줘. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
