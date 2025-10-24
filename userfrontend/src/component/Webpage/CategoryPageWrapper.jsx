import { useParams } from "react-router-dom";
import CategoryPage from "./CategoryPage";

const CategoryPageWrapper = () => {
  const { slug } = useParams();
  return <CategoryPage key={slug} />;
};

export default CategoryPageWrapper;
