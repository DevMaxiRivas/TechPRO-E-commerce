"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useProductFilters } from "@/hooks/use-product-filters";

const IsFeaturedFilter = () => {
    const { updateFilter, searchParams } = useProductFilters();
    const current = searchParams.get("isFeatured") ?? "";
    const options = [
        {
            label: "None",
            value: ""
        },
        {
            label: "Yes",
            value: "true"
        },
        {
            label: "No",
            value: "false"
        },

    ];
    return (
        <div className="my-5">
            <p className="mb-3 font-bold">Featured</p>
            <RadioGroup value={current} onValueChange={(value) => {
                updateFilter("isFeatured", value)
            }}>
                {options.map((option: { label: string, value: string }) => (
                    <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem
                            value={option.value}
                            id={option.value}
                        />
                        <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}

export default IsFeaturedFilter;