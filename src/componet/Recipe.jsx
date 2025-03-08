import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { deleteRecipeAsync, getAllRecipesAsync } from "../Services/Action/Recipeaction";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";

const Recipe = () => {
  const [searchVal, setSearchVal] = useState("");
  const [sortOption] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recipes } = useSelector((state) => state.RecipeReduces);

  useEffect(() => {
    dispatch(getAllRecipesAsync());
  }, [dispatch]);

  // Effect to set filtered recipes after receiving new recipes
  useEffect(() => {
    let updatedRecipes = [...recipes];

    // Apply category filter
    if (categoryFilter !== "all") {
      updatedRecipes = updatedRecipes.filter(
        (recipe) => recipe.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Apply search filter
    if (searchVal) {
      updatedRecipes = updatedRecipes.filter((recipe) => {
        return (
          recipe.title.toLowerCase().includes(searchVal.toLowerCase()) ||
          recipe.date.toLowerCase().includes(searchVal.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchVal.toLowerCase()) ||
          recipe.category .toLowerCase().includes(searchVal.toLowerCase())
        );
      });
    }

    // Apply sorting after category and search filtering
    handleSort(sortOption, updatedRecipes);

    setFilteredRecipes(updatedRecipes);
  }, [recipes, searchVal, categoryFilter, sortOption]);

  const handleSort = (option, updatedRecipes) => {
    let sortedRecipes = [...updatedRecipes];

    if (option === "asctitle") {
      sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "desctitle") {
      sortedRecipes.sort((a, b) => b.title.localeCompare(a.title));
    } else if (option === "ascdate") {
      sortedRecipes.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (option === "descdate") {
      sortedRecipes.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === "ascdescription") {
      sortedRecipes.sort((a, b) => a.description.localeCompare(b.description));
    } else if (option === "descdescription") {
      sortedRecipes.sort((a, b) => b.description.localeCompare(a.description));
    }

    setFilteredRecipes(sortedRecipes);
  };

  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
  };

  const handleDelete = (id) => {
    dispatch(deleteRecipeAsync(id));
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <Header />
      <div className="banner">
        <div className="d-flex justify-content-center pt-3">
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="rounded-start border px-5"
            placeholder="Search recipes"
            width={'50px'}
          />
          <Button onClick={() => setSearchVal(searchVal)} className="rounded">
            <FaSearch />
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
           {/* Category Buttons */}
        <div className="d-flex justify-content-center pt-3">
          <Button
            variant={categoryFilter === "all" ? "primary" : "secondary"}
            onClick={() => handleCategoryChange("all")}
          >
            All
          </Button>
          <Button
            variant={categoryFilter === "veg" ? "primary" : "secondary"}
            onClick={() => handleCategoryChange("veg")}
            className="ms-2"
          >
            Veg
          </Button>
          <Button
            variant={categoryFilter === "non-veg" ? "primary" : "secondary"}
            onClick={() => handleCategoryChange("non-veg")}
            className="ms-2"
          >
            Non-Veg
          </Button>
        </div>
        </div>

       

        <Container>
          <div className="d-flex flex-wrap gap-3">
            {filteredRecipes.length === 0 ? (
              <p>No recipes found</p>
            ) : (
              filteredRecipes.map((recipe) => (
                <Card className="border-0 my-5" key={recipe.id} style={{ width: "18rem" }}>
                  <Card.Img src={recipe.imageUrl} width={100} height={200} />
                  <Card.Body className="text-start">
                    <h2>{recipe.title}</h2>
                    <Card.Text>{recipe.chef}</Card.Text>
                    <span className="category">{recipe.category}</span>
                    <Card.Text className="pt-3">{recipe.date}</Card.Text>
                    <Card.Text className="truncated-description">
                      {recipe.description}
                    </Card.Text>
                    <div className="text-center d-flex justify-content-around">
                      <button onClick={() => handleEdit(recipe.id)}>
                        <FaEdit />
                      </button>
                      <button className="me-3" onClick={() => handleDelete(recipe.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
        </Container>
      </div>
      <Footer/>
    </>
  );
};

export default Recipe;
