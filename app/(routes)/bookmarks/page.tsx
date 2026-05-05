"use client";

import { useBookmarks } from "@/hooks/use-bookmarks";
import BookmarkItem from "./components/bookmark-item";

export default function Page() {
    const { items } = useBookmarks();
    return (
        <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
            <h1 className="mb-5 text-3xl font-bold">
                Bookmarks
            </h1>
            <div>
                <div>
                    {
                        items.length > 0 ? (
                            <ul>
                                {items.map(item => (
                                    <BookmarkItem key={item.id}
                                        product={item}
                                    />
                                ))}
                            </ul>
                        ) : (
                            <p>No bookmarks</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
