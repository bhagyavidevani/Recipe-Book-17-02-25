import { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { singleRecipeAsync, updateRecipeAsync } from '../Services/Action/Recipeaction';
import Header from './Header';
import Footer from './Footer';

function EditRecipe() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { recipe, isUpdated } = useSelector(state => state.RecipeReduces);
    const [errors, setErrors] = useState({});
    const [recipeinput, setrecipeInput] = useState({
        title: "",
        description: "",
        category: "",
        date: "",
        chef: ""
    });

    const handelSubmit = (e) => {
        e.preventDefault();
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

        console.log("Submitting recipe:", { ...recipeinput });
        dispatch(updateRecipeAsync({ ...recipeinput }));
    };

    useEffect(() => {
        dispatch(singleRecipeAsync(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (recipe) setrecipeInput(recipe);
    }, [recipe]);

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
    }, [isUpdated]);

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "title":
                if (!value) error = "* Title is required";
                break;
            case "date":
                if (!value) error = "* Date is required";
                break;
            case "chef":
                if (!value) error = "* Chef is required";
                break;
            case "category":
                if (!value) error = "* Category is required";
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
            <Header />
            <div className="addrecipe">
                <Container>
                    <Form onSubmit={handelSubmit}>
                        <Form.Group as={Row} className="mb-4">
                            <Form.Label column sm="3" style={{ color: '#fff' }}>
                                Recipe Title :-
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Recipe Title"
                                    name="title"
                                    value={recipeinput.title}
                                    onChange={handelChanged}
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
                                    type="date"
                                    name="date"
                                    value={recipeinput.date}
                                    onChange={handelChanged}
                                />
                            </Col>
                            {errors.date && <i style={{ color: "red" }}>{errors.date}</i>}
                        </Form.Group>

                        <Form.Group as={Row} className="mb-4">
                            <Form.Label column sm="3" style={{ color: '#fff' }}>
                                Recipe Chef :-
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Recipe Chef"
                                    name="chef"
                                    value={recipeinput.chef}
                                    onChange={handelChanged}
                                />
                            </Col>
                            {errors.chef && <i style={{ color: "red" }}>{errors.chef}</i>}
                        </Form.Group>

                        <Form.Group as={Row} className="mb-4 d-flex justify-content-center align-items-center">
                            <Form.Label column sm="3" style={{ color: '#fff' }}>
                                Recipe Description :-
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    rows="5"
                                    placeholder="Write your description here..."
                                    value={recipeinput.description}
                                    onChange={handelChanged}
                                />
                            </Col>
                            {errors.description && <i style={{ color: "red" }}>{errors.description}</i>}
                        </Form.Group>

                        <Form.Group as={Row} className="mb-4 d-flex justify-content-center align-items-center">
                            <Form.Label column sm="3" style={{ color: '#fff' }}>
                                Recipe Category :-
                            </Form.Label>
                            <Col sm="9">
                                <Form.Select
                                    aria-label="Category"
                                    onChange={handelChanged}
                                    value={recipeinput.category}
                                    name="category"
                                >
                                    <option>Select Category</option>
                                    <option value="Veg">Veg Recipe</option>
                                    <option value="Non-Veg">Non-Veg Recipe</option>
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
            <Footer />
        </div>
    );
}

export default EditRecipe;
