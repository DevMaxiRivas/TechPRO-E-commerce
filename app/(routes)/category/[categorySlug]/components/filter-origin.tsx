import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getSchemaProducts } from "@/services/products/get-schema";

export const FilterOrigin = async () => {
    const schema = await getSchemaProducts();
    return (
        <div className="my-5">
            <p className="mb-3 font-bold">Origin</p>
            <RadioGroup >
                {schema.attributes.origin.enum.map((item: string) => (
                    <div key={item} className="flex items-center space-x-2">
                        <RadioGroupItem value={item} id={item}></RadioGroupItem>
                        <Label htmlFor={item}>{item}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}