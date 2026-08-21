import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  return (
    <div className="sticky top-0 bg-white pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/courses">
          <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
        </Link>
      </Button>
      <h1 className="font-bold text-lg text-neutral-800">
        {title}
      </h1>
      <div className="w-9 h-9" /> {/* Espaçador com a mesma largura do botão para alinhamento perfeito */}
    </div>
  );
};
