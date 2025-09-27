import {Input} from "@/components/ui/input"
import {Search, X} from "lucide-react"
import {Button} from "@/components/ui/button";
import {useHandleParams} from "@/hooks/use_handle_params";
import {useState} from "react";

export function ClearableInput() {

// En tu componente:
    const {handleSearch, query} = useHandleParams();

    const [q, setQ] = useState(query || "");

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"/>
            <Input
                value={q}
                placeholder="Buscar por número o cliente..."
                className="pl-10 min-w-[200px]"
                onChange={(e) =>
                {
                    setQ(e.target.value)
                    handleSearch(e.target.value)
                }}
            />
            {query && query.length > 0 && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full w-10 hover:bg-transparent"
                    onClick={() => {
                        handleSearch("")
                        setQ("")
                    }}
                    type="button"
                >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground"/>
                    <span className="sr-only">Limpiar búsqueda</span>
                </Button>
            )}
        </div>
    );
}
