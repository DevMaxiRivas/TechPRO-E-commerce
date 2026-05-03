"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useProductFilters } from "@/hooks/use-product-filters";

const OriginFilter = ({ options }: { options: string[] }) => {
    const { updateFilter, searchParams } = useProductFilters();
    const current = searchParams.get("origin") ?? "";
    return (
        <div className="my-5">
            <p className="mb-3 font-bold">Origin</p>
            <RadioGroup value={current} onValueChange={(value) => updateFilter("origin", value)}>
                <div key={"none"} className="flex items-center space-x-2">
                    <RadioGroupItem
                        value=""
                        id="none"
                    />
                    <Label htmlFor="none">None</Label>
                </div>
                {options.map((option: string) => (
                    <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem
                            value={option}
                            id={option}
                        />
                        <Label htmlFor={option}>{option}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}

export default OriginFilter;