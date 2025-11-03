"use client"

import * as React from "react"
import {Check, ChevronsUpDown} from "lucide-react"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {cn} from "@/lib/utils";

export interface PairValueComboBox {
    ID: string;
    value: string;
}

export interface CustomComboboxProps {
    data: PairValueComboBox[];
    title?: string;
    selectedData: string | undefined;
    setSelectedData: (id: string) => void;
}

export function CustomCombobox({data, title, selectedData, setSelectedData} : CustomComboboxProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between w-full px-3 py-2 text-left font-normal"
                >
                    {selectedData
                        ? data.find((d) => d.ID === selectedData)?.value
                        : `Select ${title || 'Data'}...`}
                    <ChevronsUpDown className="opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder={`Search ${title || 'Data'}...`} className="h-9"/>
                    <CommandList>
                        <CommandEmpty>No {title || 'Data'} found.</CommandEmpty>
                        <CommandGroup>
                            {data.map((d) => (
                                <CommandItem
                                    key={d.ID}
                                    value={d.value.toString()}
                                    onSelect={(currentValue) => {
                                        setSelectedData(d.ID.toString()) // 👈 pasa el ID al padre
                                        setOpen(false)
                                    }}
                                >
                                    {d.value}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selectedData === d.ID ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

