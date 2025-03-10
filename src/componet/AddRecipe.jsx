import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import generateUniqueId from "generate-unique-id";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addRecipeAsync } from "../Services/Action/Recipeaction";
import Header from "./Header";
import Footer from "./Footer";

function AddRecipe() {
    const { error, isCreated } = useSelector((state) => state.RecipeReduces);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState({});
    const [recipeinput, setrecipeInput] = useState({
        title: "",
        description: "",
        category: "",
        date: "",
        chef: ""
    });

    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
    };

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
            case "img":
                if (!value) error = "* Image URL is required";
                break;
            default:
                break;
        }
        return error;
    };

    const { user } = useSelector((state) => state.AuthReduces);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    const handelChanged = (e) => {
        const { name, value } = e.target;
        setrecipeInput({
            ...recipeinput,
            [name]: value,
        });
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(recipeinput).forEach((field) => {
            const error = validateField(field, recipeinput[field]);
            if (error) {
                newErrors[field] = error;
            }
        });
        const imgError = validateField("img", imageUrl);
        if (imgError) {
            newErrors.img = imgError;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        let id = generateUniqueId({
            length: 5,
            useLetters: false,
        });

        console.log("Submitting recipe:", { ...recipeinput, id, imageUrl });
        dispatch(addRecipeAsync({ ...recipeinput, id, imageUrl }));
    };

    useEffect(() => {
        if (isCreated) {
            navigate("/recipe");
        }
    }, [isCreated, navigate]);

    return (
        <div>
            <Header />
            {error ? <p>{error}</p> : ""}
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

                        <Form.Group as={Row} className="mb-4">
                            <Form.Label column sm="3" style={{ color: '#fff' }}>
                                Image URL :-
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Image URL"
                                    name="img"
                                    value={imageUrl}
                                    onChange={handleImageUrlChange}
                                />
                            </Col>
                            {errors.img && <i style={{ color: "red" }}>{errors.img}</i>}
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col sm={12} className="d-flex justify-content-center">
                                <button type="submit" className='text-center'>Add Recipe</button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Container>
            </div>
            <Footer />
        </div>
    );
}

export default AddRecipe;
