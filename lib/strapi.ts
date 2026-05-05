const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

export function query(url: string, typeQuery: string = "getResources") {

    let token = '';
    switch (typeQuery) {
        case "getResources":
            if (!process.env.STRAPI_TOKEN) {
                throw new Error("STRAPI_TOKEN is not set");
            }
            token = process.env.STRAPI_TOKEN;
            break;
        case "getSchemas":
            if (!process.env.STRAPI_TOKEN_SCHEMAS) {
                throw new Error("STRAPI_TOKEN_SCHEMAS is not set");
            }
            token = process.env.STRAPI_TOKEN_SCHEMAS;
            break;
        default:
            throw new Error("Invalid typeQuery");
    }

    return fetch(`${STRAPI_HOST}/api/${url}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json()
    ).catch(
        (err) => {
            console.error(`Error fetching data from ${url}:`, err);
            throw err;
        }
    );
}

export type RelationFieldsType = {
    name: string;
    fields: Array<string>;
}

export function buildQueryFieldParameters(fields: Array<string>, relations: Array<RelationFieldsType>) {
    let query = `fields=${fields.join(",")}`;

    for (const relation of relations) {
        query += `&populate[${relation.name}][fields]=${relation.fields.join(",")}`;
    }
    return query
}
