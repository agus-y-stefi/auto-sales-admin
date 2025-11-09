"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

function formatDate(date?: Date) {
    if (!date) return ""
    return date.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
}

function parseDateFromInput(value: string): Date | undefined {
    // acepta formatos dd/mm/yyyy o dd-mm-yyyy
    const regex = /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/
    const match = value.match(regex)
    if (!match) return undefined

    const [, d, m, y] = match
    const day = parseInt(d, 10)
    const month = parseInt(m, 10) - 1
    const year = parseInt(y, 10)

    const parsed = new Date(year, month, day)
    // validar que sea real (por ejemplo, 31/02 → inválido)
    return parsed.getDate() === day && parsed.getMonth() === month ? parsed : undefined
}

function isValidDate(date?: Date) {
    return !!date && !isNaN(date.getTime())
}

interface Calendar28Props {
    /** Fecha seleccionada (puede ser undefined si no hay selección) */
    date?: Date
    /** Callback al cambiar la fecha */
    onDateChange: (date: Date | undefined) => void
    /** Placeholder que se muestra cuando no hay selección */
    placeholder?: string
    /** Clase opcional para el input */
    className?: string
}

export function Calendar28({
                               date,
                               onDateChange,
                               placeholder = "Seleccionar fecha (dd/mm/yyyy)",
                               className,
                           }: Calendar28Props) {
    const [open, setOpen] = React.useState(false)
    const [month, setMonth] = React.useState<Date | undefined>(date)
    const [value, setValue] = React.useState(formatDate(date))

    // si cambia la fecha externa, actualizar input
    React.useEffect(() => {
        setValue(formatDate(date))
        if (date) setMonth(date)
    }, [date])

    const handleChange = (newDate: Date | undefined) => {
        onDateChange(newDate)
        setValue(formatDate(newDate))
        if (newDate) setMonth(newDate)
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="relative flex gap-2">
                <Input
                    value={value}
                    placeholder={placeholder}
                    className={`bg-background pr-10 ${className ?? ""}`}
                    onChange={(e) => {
                        const input = e.target.value
                        setValue(input)

                        if (input.trim() === "") {
                            handleChange(undefined)
                            return
                        }

                        const parsed = parseDateFromInput(input)
                        if (isValidDate(parsed)) handleChange(parsed)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault()
                            setOpen(true)
                        }
                    }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select date</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                    >
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(selected) => {
                                handleChange(selected)
                                setOpen(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
