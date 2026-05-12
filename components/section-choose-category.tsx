import GridCategory from "./shared/categories/grid-category";

function SectionChooseCategory() {
    return (
        <section className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <h3 className="px-6 pb-4 text-3xl sm:pb-8">Choose your favorite category</h3>
            <GridCategory />
        </section>
    );
}

export default SectionChooseCategory;