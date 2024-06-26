'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

type SearchProps = {}

export const Search = ({}: SearchProps) => {
  return ( 
    <div className="flex items-center gap-2">
      <Input placeholder="Procure por uma barbearia..." />

      <Button variant="default" size="icon">
        <SearchIcon size={20} />
      </Button>
    </div>
  );
}