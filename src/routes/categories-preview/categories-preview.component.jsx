import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/category/category.selector';
import CategoryPreview from '../../components/category-preview/category-preview.component';
const CategoriesPreview = () => {
  const categories = useSelector(selectCategoriesMap);
  return (
    <Fragment>
      {Object.keys(categories).map((title) => {
        const products = categories[title];
        return (
          <CategoryPreview products={products} key={title} title={title} />
        );
      })}
    </Fragment>
  );
};
export default CategoriesPreview;
