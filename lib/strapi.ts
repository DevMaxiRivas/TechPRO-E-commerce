const { STRAPI_HOST, STRAPI_TOKEN, STRAPI_TOKEN_SCHEMAS } = process.env;

export function query(url: string, typeQuery: string = "getResources") {

    let token = '';
    switch (typeQuery) {
        case "getResources":
            if (!STRAPI_TOKEN) {
                throw new Error("STRAPI_TOKEN is not set");
            }
            token = STRAPI_TOKEN;
            break;
        case "getSchemas":
            if (!STRAPI_TOKEN_SCHEMAS) {
                throw new Error("STRAPI_TOKEN_SCHEMAS is not set");
            }
            token = STRAPI_TOKEN_SCHEMAS;
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

export function buildQueryFieldParameters(fields: Array<string>, relations: Array<RelationFieldsType> | null) {
    let query = `fields=${fields.join(",")}`;

    if (relations === null) return query;

    for (const relation of relations) {
        query += `&populate[${relation.name}][fields]=${relation.fields.join(",")}`;
    }
    return query
}
