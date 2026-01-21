import * as React from "react"
import { Check, Loader2, MapPin } from "lucide-react"
import { useDebounce } from "../../hooks/use-debounce"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export interface Place {
    place_id: number
    display_name: string
    type?: string
    addresstype?: string
    address: {
        city?: string
        town?: string
        village?: string
        municipality?: string
        state?: string
        state_district?: string
        region?: string
        country?: string
        country_code?: string
    }
}

interface PlacesAutocompleteProps {
    value?: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export function PlacesAutocomplete({
    value,
    onChange,
    placeholder = "Search for a city...",
    className,
}: PlacesAutocompleteProps) {
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState(value || "")
    const [places, setPlaces] = React.useState<Place[]>([])
    const [loading, setLoading] = React.useState(false)

    const debouncedValue = useDebounce(inputValue, 500)

    // Update local input if external value changes (and is different from what we have)
    React.useEffect(() => {
        if (value !== undefined && value !== inputValue) {
            setInputValue(value)
        }
    }, [value])


    React.useEffect(() => {
        if (!debouncedValue || debouncedValue.length < 3) {
            setPlaces([])
            return
        }

        // Avoid searching if the debounced value matches the currently selected value exactly
        // to prevent reopening the list after selection (optional, depends on UX preference)
        if (debouncedValue === value) return;

        setLoading(true)
        const fetchPlaces = async () => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                        debouncedValue
                    )}&addressdetails=1&limit=20`, // Increased limit to allow for filtering
                    {
                        headers: {
                            "User-Agent": "SoulMapAlchemy/1.0",
                            "Accept-Language": "pt-BR,en-US;q=0.8" // Prefer Portuguese/English
                        }
                    }
                )
                const data: Place[] = await response.json()

                // Strict filtering for cities only
                const filteredPlaces = data.filter((place) => {
                    const type = place.addresstype || place.type;
                    const acceptedTypes = ['city', 'town', 'village', 'municipality', 'hamlet', 'borough', 'suburb'];
                    const excludedTypes = ['country', 'state', 'state_district', 'region', 'continent', 'postcode'];

                    if (excludedTypes.includes(type || '')) return false;

                    // Specific check: if it has display_name starting with the query but is a state/country, ignore
                    // But simpler: just check if it fits the accepted types or has a city-like structure in address
                    const hasCityLike = place.address.city || place.address.town || place.address.village || place.address.municipality;

                    return acceptedTypes.includes(type || '') || (hasCityLike && !excludedTypes.includes(type || ''));
                });

                // Deduplicate by basic name to avoid "Brasilia, DF" and "Brasilia, Brasil" separate vague entries
                // Keep the top 5 after filtering
                setPlaces(filteredPlaces.slice(0, 5))
            } catch (error) {
                console.error("Error fetching places:", error)
                setPlaces([])
            } finally {
                setLoading(false)
            }
        }

        fetchPlaces()
    }, [debouncedValue])

    const getFlagEmoji = (countryCode: string) => {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    }

    // ... inside component



    // ... rendering

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="relative w-full">
                    <Input
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value)
                            if (!open) setOpen(true)
                        }}
                        onFocus={() => setOpen(true)}
                        className={cn("bg-background/50 border-border focus:border-primary pl-9", className)}
                        role="combobox"
                        aria-expanded={open}
                    />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
            </PopoverTrigger>
            <PopoverContent
                className="w-[300px] p-0"
                align="start"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <Command shouldFilter={false}>
                    <CommandList>
                        {loading && (
                            <div className="flex items-center justify-center p-4">
                                <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
                        )}
                        {!loading && places.length === 0 && debouncedValue.length >= 3 && (
                            <CommandEmpty>No cities found.</CommandEmpty>
                        )}
                        <CommandGroup>
                            {places.map((place) => {
                                const addr = place.address;
                                const city = addr.city || addr.town || addr.village || addr.municipality || place.display_name.split(',')[0];
                                const state = addr.state || addr.state_district || addr.region;
                                const country = addr.country;

                                // Build the full string for the value prop
                                const parts = [city];
                                if (state) parts.push(state);
                                if (country) parts.push(country);
                                const uniqueParts = parts.filter((item, index) => parts.indexOf(item) === index);
                                const fullAddress = uniqueParts.join(", ");

                                // Build the "rest" of the address for display
                                const restParts = [];
                                if (state) restParts.push(state);
                                if (country) restParts.push(country);
                                const uniqueRestParts = restParts.filter((item, index) => restParts.indexOf(item) === index);
                                const restAddress = uniqueRestParts.join(", ");

                                const countryCode = place.address.country_code;
                                const flag = countryCode ? getFlagEmoji(countryCode) : "🌍";

                                return (
                                    <CommandItem
                                        key={place.place_id}
                                        value={fullAddress}
                                        onSelect={() => {
                                            setInputValue(fullAddress)
                                            onChange(fullAddress)
                                            setOpen(false)
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <span className="mr-3 text-lg" role="img" aria-label={countryCode}>{flag}</span>
                                        <span>
                                            <span className="font-bold">{city}</span>
                                            {restAddress && <span className="text-muted-foreground">, {restAddress}</span>}
                                        </span>
                                        <Check
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                value === fullAddress ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
