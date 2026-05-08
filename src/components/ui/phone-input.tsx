import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { getExampleNumber } from "libphonenumber-js";
import examples from "libphonenumber-js/mobile/examples";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
> &
    Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
        onChange?: (value: RPNInput.Value) => void;
    };

const PhoneInput = React.forwardRef<
    React.ElementRef<typeof RPNInput.default>,
    PhoneInputProps
>(({ className, onChange, defaultCountry: userDefaultCountry, ...props }, ref) => {
    const [country, setCountry] = React.useState<RPNInput.Country>(
        userDefaultCountry as RPNInput.Country || "BR"
    );

    React.useEffect(() => {
        if (userDefaultCountry) {
            setCountry(userDefaultCountry as RPNInput.Country);
        }
    }, [userDefaultCountry]);

    // Generate dynamic placeholder based on selected country
    const placeholder = React.useMemo(() => {
        try {
            const phoneNumber = getExampleNumber(country, examples as any);
            return phoneNumber ? phoneNumber.formatNational() : "Phone number";
        } catch (e) {
            return "Phone number";
        }
    }, [country]);

    return (
        <RPNInput.default
            ref={ref}
            className={cn("flex items-stretch", className)}
            flagComponent={FlagComponent}
            countrySelectComponent={CountrySelect}
            inputComponent={InputComponent}
            defaultCountry={country}
            onCountryChange={setCountry}
            /**
             * Handles the onChange event.
             *
             * react-phone-number-input might trigger the onChange event as undefined
             * when a valid phone number is not generated.
             *
             * @param {E164Number | undefined} value
             */
            onChange={(value) => onChange?.(value as RPNInput.Value)}
            countryCallingCodeEditable={false}
            placeholder={placeholder}
            {...props}
            // @ts-ignore
            prefix={country ? `+${RPNInput.getCountryCallingCode(country)}` : ""}
        />
    );
});
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & { prefix?: string }>(
    ({ className, prefix, ...props }, ref) => (
        <div className={cn("flex items-center rounded-e-lg rounded-s-none border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 h-full", className)}>
            {prefix && (
                <span className="pl-3 text-muted-foreground text-sm select-none">
                    {prefix}
                </span>
            )}
            <Input
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent shadow-none"
                {...props}
                ref={ref}
            />
        </div>
    )
);
InputComponent.displayName = "InputComponent";

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
    disabled?: boolean;
    value: RPNInput.Country;
    onChange: (value: RPNInput.Country) => void;
    options: CountrySelectOption[];
};

const CountrySelect = ({
    disabled,
    value,
    onChange,
    options,
}: CountrySelectProps) => {
    const handleSelect = React.useCallback(
        (country: RPNInput.Country) => {
            onChange(country);
        },
        [onChange]
    );

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant={"outline"}
                    className={cn("flex gap-1 rounded-e-none rounded-s-lg px-3 h-full bg-card border-border text-foreground hover:bg-accent hover:text-accent-foreground")}
                    disabled={disabled}
                >
                    <FlagComponent country={value} countryName={value} />
                    <ChevronsUpDown
                        className={cn(
                            "-mr-2 h-4 w-4 opacity-50",
                            disabled ? "hidden" : "opacity-100"
                        )}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0 bg-popover text-popover-foreground border-border">
                <Command>
                    <CommandList>
                        <ScrollArea className="h-72">
                            <CommandInput placeholder="Search country..." className="text-foreground" />
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                                {options
                                    .filter((x) => x.value)
                                    .map((option) => (
                                        <CommandItem
                                            className="gap-2 cursor-pointer text-popover-foreground hover:bg-accent aria-selected:bg-accent"
                                            key={option.value}
                                            onSelect={() => handleSelect(option.value)}
                                        >
                                            <FlagComponent
                                                country={option.value}
                                                countryName={option.label}
                                            />
                                            <span className="flex-1 text-sm">{option.label}</span>
                                            {option.value && (
                                                <span className="text-foreground/50 text-sm">
                                                    {`+${RPNInput.getCountryCallingCode(option.value)}`}
                                                </span>
                                            )}
                                            <Check
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    option.value === value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country];

    return (
        <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-transparent [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_svg]:h-full [&_svg]:w-full [&_svg]:object-cover">
            {Flag && <Flag title={countryName} />}
        </span>
    );
};
FlagComponent.displayName = "FlagComponent";

export default PhoneInput;