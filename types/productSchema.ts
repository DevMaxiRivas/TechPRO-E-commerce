export type ProductSchema = {
    attributes: {
        origin: {
            enum: string[];
        };
        state: {
            enum: string[];
        };
    };
};