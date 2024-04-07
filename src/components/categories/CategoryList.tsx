import React from 'react';
import { RefObject } from 'react';
import CategoryCard from './CategoryCard';
import { useGetAllCategoryQuery } from '../../api/categoryApi';
import { CATEGORYINTERFACE } from '../../utils/interfaceTypes';

interface CategoryListProps {
    catRef: RefObject<HTMLElement>;
}

const CategoryList: React.FC<CategoryListProps> = ({ catRef }) => {
    const { data: categoryList } = useGetAllCategoryQuery();

    return (
        <>
            <h1 className="text-3xl md:text-4xl break-words text-center mt-10">Categories</h1>
            <section
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-12 py-8 mt-10 justify-items-center items-center"
                ref={catRef}
            >
                {categoryList &&
                    categoryList?.map((categoryItem: CATEGORYINTERFACE) => (
                        <div key={categoryItem?.id} className="w-full px-2">
                            <CategoryCard category={categoryItem} />
                        </div>
                    ))}
            </section>
        </>
    );
};

export default CategoryList;