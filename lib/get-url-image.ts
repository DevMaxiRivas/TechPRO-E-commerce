export function getURLImage(url: string) {
    return `${process.env.NEXT_PUBLIC_STORAGE_SERVICE}${url}`;
}