import { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import {singleRecipeAsync, updateRecipeAsync } from '../Services/Action/Recipeaction';
import Header from './Header';

function EditRecipe() {
    const { id } = useParams();
    const dispatch= useDispatch(); 
    const navigate= useNavigate();
    const { recipe, isUpdated } = useSelector(state => state.RecipeReduces)
    const [errors, setErrors] = useState({});
    const [recipeinput, setrecipeInput] = useState({
      title: "",
      description: "",
      category: "",
      date:"",
      author:""
    });
    

    const handelSubmit = (e) => {
      e.preventDefault();
      // console.log("Submit now", productinput);
      const newErrors = {};
      Object.keys(recipeinput).forEach((field) => {
        const error = validateField(field, recipeinput[field]);
        if (error) {
          newErrors[field] = error;
        }
      });
  
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      console.log("Submitting recipe:", { ...recipeinput}); 
      dispatch(updateRecipeAsync({ ...recipeinput}));
    };

    useEffect(() => {
      dispatch(singleRecipeAsync(id));
    }, [id,dispatch])

    useEffect(() => {
      console.log(recipe)
      if (recipe)
        setrecipeInput(recipe);
      
    }, [recipe])

    const handelChanged = (e) => {
      const { name, value } = e.target;
      setrecipeInput({
        ...recipeinput,
        [name]: value,
      });
    };
    
    useEffect(() => {
      if (isUpdated) {
        navigate("/recipe");
      }
    }, [isUpdated])

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "title":
        if (!value) error = "* Title is required";
        break;
        case "date":
        if (!value) error = "* Date is required";
        break;
        case "author":
        if (!value) error = "* author is required";
        break;
      case "category":
        if (!value) error = "*category  is required";
        break;
      case "description":
        if (!value) {
          error = "* Description is required";
        } else if (value.length < 20) {
          error = "* Description must be at least 20 characters long";
        }
        break;
      default:
        break;
    }
    return error;
  };
  return (
    <div>
      <Header/>
      <div className="addrecipe">
          <Container>
             <Form 
             onSubmit={handelSubmit}
             >
             <Form.Group as={Row} className="mb-4">
                <Form.Label column sm="3" style={{color:'#fff'}}>
                Recipe Title :-
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Enter Recipe Title"
                    name="title"
                    value={recipeinput.title}
                    onChange={handelChanged}
                    width={"50px"}
                    />
                </Col>
                    {errors.title && <i style={{ color: "red" }}>{errors.title}</i>}
            </Form.Group>

            <Form.Group as={Row} className="mb-4">
              <Form.Label column sm="3" style={{ color: '#fff' }}>
                Recipe Date:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="date" // Ensure this is lowercase
                  name="date"
                  value={recipeinput.date}
                  onChange={handelChanged}
                />
              </Col>
              {errors.date && <i style={{ color: "red" }}>{errors.date}</i>}
            </Form.Group>


            <Form.Group as={Row} className="mb-4">
                <Form.Label column sm="3" style={{color:'#fff'}}>
                  Recipe Author :-
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Enter Recipe Author"
                    name="author"
                    value={recipeinput.author}
                    onChange={handelChanged}
                    width={"50px"}
                    />
                </Col>
                    {errors.author && <i style={{ color: "red" }}>{errors.author}</i>}
            </Form.Group>

            <Form.Group as={Row} className="mb-4 d-flex justify-content-center align-items-center">
              <Form.Label column sm="3" style={{color:'#fff'}}>
              Recipe Description :-
              </Form.Label>
              <Col sm="9">
              <Form.Control
                      as="textarea"
                      name="description"
                      rows="5"
                      placeholder="Write your description here..."
                      className="mb-3"
                      // spellCheck="true"
                      value={recipeinput.description}
                      onChange={handelChanged}
                    />
              </Col>
              {errors.description && <i style={{ color: "red" }}>{errors.description}</i>}
            </Form.Group>

            <Form.Group as={Row} className="mb-4 d-flex justify-content-center align-items-center">
            <Form.Label column sm="3" style={{color:'#fff'}}>
            Recipe Category :-
            </Form.Label>
            <Col sm="9">
                <Form.Select
                  aria-label="Category"
                  className="border-bottom border-0"
                  onChange={handelChanged}
                  value={recipeinput.category} 
                  name="category"
                  // onBlur={() => setErrors({ ...errors, priority: validateField("priority", noteInput.priority) })}
                >
                  <option>Select Category</option>
                  <option value="Veg">Veg Recipe</option>
                  <option value="Non-Veg">Non Veg Recipe</option>
                </Form.Select>
            </Col>
            {errors.category && <i style={{ color: "red" }}>{errors.category}</i>}
            </Form.Group>

          <Form.Group as={Row}>
            <Col sm={12} className="d-flex justify-content-center">
              <button type="submit" className='text-center'>Update Recipe</button>
            </Col>
          </Form.Group>
            </Form>
          </Container>
       </div>
    </div>
  )
}

export default EditRecipe
