import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { singleRecipeAsync } from '../Services/Action/Recipeaction';
import Header from './Header';
import { Container } from 'react-bootstrap';
import Footer from './Footer';

const SingalPage = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const { recipe } = useSelector((state) => state.RecipeReduces);

  // Dispatch the action to fetch the single book's data
  useEffect(() => {
    if (id) {
      dispatch(singleRecipeAsync(id));
    }
  }, [id, dispatch]);

  return (
    <div>
      <Header />
      <div className="singleBook pt-5">
        {recipe ? (
          <Container>
            <div className="book-details text-white ">
            <h2 className='text-center fw-bold pb-2' style={{color:'#f2d4bc'}}>{recipe.title}</h2>
            <div className='book-image'>
              <img src={recipe.imageUrl} alt={recipe.title} width={400} height={400} className='rounded'/>
            </div>
            <p><strong style={{color:'#f2d4bc'}} className='fs-5 pe-2'>Author:</strong> {recipe.author}</p>
            <p><strong style={{color:'#f2d4bc'}} className='fs-5 pe-2'>Category:</strong> {recipe.category}</p>
            <p><strong style={{color:'#f2d4bc'}} className='fs-5 pe-2'>Date:</strong> {recipe.date}</p>
            <p><strong style={{color:'#f2d4bc'}} className='fs-5 pe-2'>Pages:</strong> {recipe.page}</p>
            <p style={{
              color: '#f2d4bc', 
              fontSize: '1.1rem',
              lineHeight: '1.6',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              wordBreak: 'break-word'
            }} ><strong style={{color:'#f2d4bc'}} className='fs-5 pe-2'>Description:</strong> {book.description}</p>
          </div>
          </Container>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default SingalPage;
