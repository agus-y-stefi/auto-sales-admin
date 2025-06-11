export const tableClassNames = {
    wrapper: ["max-h-[382px]", "max-w-3xl", "text-black"],
    th: ["bg-transparent", "text-default-500", "border-b", "border-divider", "text-default-700"],
    td: [
        "group-data-[first=true]/tr:first:before:rounded-none",
        "group-data-[first=true]/tr:last:before:rounded-none",
        "group-data-[middle=true]/tr:before:rounded-none",
        "group-data-[last=true]/tr:first:before:rounded-none",
        "group-data-[last=true]/tr:last:before:rounded-none",
    ],

};