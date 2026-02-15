/**
 * Formatea un monto numérico como moneda.
 * Ejemplo: 15000 → "$ 15,000.00"
 */
export function formatCurrency(amount: number | null): string {
    if (amount === null || amount === undefined) return "-";
    return `$ ${amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

/**
 * Combina apellido y nombre en formato "Apellido, Nombre".
 */
export function formatFullName(lastName: string | null, firstName: string | null): string {
    if (!lastName && !firstName) return "-";
    if (!lastName) return firstName!;
    if (!firstName) return lastName;
    return `${lastName}, ${firstName}`;
}

/**
 * Formatea ciudad y país como "Ciudad, País".
 */
export function formatLocation(city: string | null, country: string | null): string {
    if (!city && !country) return "-";
    if (!city) return country!;
    if (!country) return city;
    return `${city}, ${country}`;
}

/**
 * Obtiene las iniciales de un nombre y apellido.
 * Ejemplo: "Juan", "Pérez" → "JP"
 */
export function getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

/**
 * Obtiene las iniciales para una compañía o nombre único.
 * Toma las primeras letras de las dos primeras palabras.
 * Ejemplo: "AutoMotores Del Sur" → "AD"
 */
export function getAcronym(name: string): string {
    const words = name.trim().split(/\s+/);
    if (words.length === 0) return "";
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
}
