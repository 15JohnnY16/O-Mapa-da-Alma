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

export interface PlaceResult {
    description: string;
    details?: any; 
}

interface PlacesAutocompleteProps {
    value?: string;
    onChange: (value: string) => void;
    onPlaceSelect?: (place: PlaceResult) => void;
    placeholder?: string;
    className?: string;
}

export const PlacesAutocomplete = React.forwardRef<HTMLInputElement, PlacesAutocompleteProps>(({
    value,
    onChange,
    onPlaceSelect,
    placeholder = "Search for a city...", // Voltei para o original (Inglês/Genérico)
    className,
}, ref) => {
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState(value || "")
    const [predictions, setPredictions] = React.useState<any[]>([]) 
    const [isFetching, setIsFetching] = React.useState(false)

    // Google Services
    const [autocompleteService, setAutocompleteService] = React.useState<any>(null);
    const [placesService, setPlacesService] = React.useState<any>(null);
    const [sessionToken, setSessionToken] = React.useState<any>(null);

    const debouncedValue = useDebounce(inputValue, 300)

    // Loading visual imediato
    const isLoading = isFetching || (inputValue !== debouncedValue && inputValue.length > 2);

    React.useEffect(() => {
        const initGoogle = () => {
            const w = window as any;
            if (w.google && w.google.maps && w.google.maps.places) {
                setAutocompleteService(new w.google.maps.places.AutocompleteService());
                setPlacesService(new w.google.maps.places.PlacesService(document.createElement('div')));
                setSessionToken(new w.google.maps.places.AutocompleteSessionToken());
            } else {
                 const checkInterval = setInterval(() => {
                    const w2 = window as any;
                    if (w2.google && w2.google.maps && w2.google.maps.places) {
                        setAutocompleteService(new w2.google.maps.places.AutocompleteService());
                        setPlacesService(new w2.google.maps.places.PlacesService(document.createElement('div')));
                        setSessionToken(new w2.google.maps.places.AutocompleteSessionToken());
                        clearInterval(checkInterval);
                    }
                }, 500);
                setTimeout(() => clearInterval(checkInterval), 5000);
            }
        };
        initGoogle();
    }, []);

    React.useEffect(() => {
        if (value !== undefined && value !== inputValue) {
            setInputValue(value)
        }
    }, [value])

    React.useEffect(() => {
        let active = true;

        if (!debouncedValue || debouncedValue.length < 3 || !autocompleteService || !sessionToken) {
            setPredictions([])
            return
        }

        if (debouncedValue === value) return;

        setIsFetching(true)

        const request = {
            input: debouncedValue,
            types: ['(cities)'],
            sessionToken: sessionToken
            // REMOVIDO: language: 'pt-BR' -> Agora respeita o idioma do browser do usuário
        };

        autocompleteService.getPlacePredictions(request, (results: any[], status: any) => {
            if (!active) return;
            
            setIsFetching(false)
            if (results && status === 'OK') {
                setPredictions(results);
            } else {
                setPredictions([]);
            }
        });

        return () => {
            active = false;
            setIsFetching(false);
        };

    }, [debouncedValue, autocompleteService, sessionToken])

    const handleSelect = (prediction: any) => {
        const description = prediction.description;
        setInputValue(description);
        onChange(description);
        setOpen(false);

        if (placesService && sessionToken) {
            const request = {
                placeId: prediction.place_id,
                fields: ['address_components', 'formatted_address', 'geometry', 'name'],
                sessionToken: sessionToken
            };

            placesService.getDetails(request, (placeDetails: any, status: any) => {
                if (status === 'OK' && placeDetails) {
                    if (onPlaceSelect) {
                        onPlaceSelect({
                            description: description,
                            details: placeDetails
                        });
                    }
                    const w = window as any;
                    if (w.google && w.google.maps && w.google.maps.places) {
                        setSessionToken(new w.google.maps.places.AutocompleteSessionToken());
                    }
                }
            });
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="relative w-full">
                    <Input
                        ref={ref}
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value)
                            if (!open && e.target.value.length > 0) setOpen(true)
                        }}
                        onFocus={() => {
                            if (predictions.length > 0 || inputValue.length >= 3) setOpen(true)
                        }}
                        className={cn("bg-background/50 border-border focus:border-primary pl-9", className)}
                        role="combobox"
                        aria-expanded={open}
                    />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    
                    {isLoading && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        </div>
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent
                className="w-[300px] p-0"
                align="start"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <Command shouldFilter={false}>
                    <CommandList>
                        
                        {!isLoading && predictions.length === 0 && debouncedValue.length >= 3 && (
                            <CommandEmpty>No cities found.</CommandEmpty> // Voltei para o original (Inglês)
                        )}
                        
                        <CommandGroup>
                            {predictions.map((prediction) => (
                                <CommandItem
                                    key={prediction.place_id}
                                    value={prediction.description}
                                    onSelect={() => handleSelect(prediction)}
                                    className="cursor-pointer aria-selected:bg-primary/20"
                                >
                                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="font-semibold text-foreground truncate">
                                            {prediction.structured_formatting.main_text}
                                        </span>
                                        <span className="text-xs text-muted-foreground truncate">
                                            {prediction.structured_formatting.secondary_text}
                                        </span>
                                    </div>
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4 text-primary shrink-0",
                                            value === prediction.description ? "opacity-100" : "opacity-0"
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
})
PlacesAutocomplete.displayName = "PlacesAutocomplete"