const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

export function query(url: string) {
    console.log(`Fetching data from ${url}...`);
    console.log(`Using STRAPI_HOST: ${STRAPI_HOST}`);
    console.log(`Using STRAPI_TOKEN: ${STRAPI_TOKEN ? "****" : "Not Set"}`);
    return fetch(`${STRAPI_HOST}/api/${url}`, {
        headers: {
            Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
    }).then(
        (res) => res.json()
    ).catch(
        (err) => {
            console.error(`Error fetching data from ${url}:`, err);
            throw err;
        }
    );
}
