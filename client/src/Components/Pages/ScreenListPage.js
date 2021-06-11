import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { createScreen, deleteScreen, listScreens } from '../../Actions/screenActions';
import { SCREEN_CREATE_RESET, SCREEN_DELETE_RESET } from '../../Constants/screenConstants';

import LoadingBox from '../Helpers/LoadingBox';
import MessageBox from '../Helpers/MessageBox';



export default function ScreenListPage(props) {

  const { pageNumber = 1 } = useParams();

  const masterMode = props.match.path.indexOf('/master') >= 0;
  
  const screenList = useSelector((state) => state.screenList);
  const { loading, error, screens, page, pages } = screenList;

  const screenCreate = useSelector((state) => state.screenCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    screen: createdScreen
  } = screenCreate;

  const screenDelete = useSelector((state) => state.screenDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = screenDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    if(successCreate) {
      dispatch({
        type: SCREEN_CREATE_RESET
      });
      props.history.push(`/screen/${createdScreen._id}/edit`)
    }
    if (successDelete) {
      dispatch({
        type: SCREEN_DELETE_RESET
      });
    }
    dispatch(
      listScreens({
        master: masterMode ? userInfo._id : '', pageNumber
      })
    );
  }, [ 
    createdScreen, 
    dispatch, 
    props.history, 
    masterMode,
    successCreate, 
    successDelete, 
    userInfo._id, 
    pageNumber, 
  ]);

  const deleteHandler = (screen) => {
    if(window.confirm('Are you sure to delete?')) {
      dispatch(deleteScreen(screen._id));
    }
  };

  const createHandler = () => {
    dispatch(createScreen());
  };

  return (
    <div>
      <div className="row">
        <h1>Screens</h1>
        <button
          type="button"
          className="primary"
          onClick={createHandler}
        >Create Screen</button>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

      {loading ? ( 
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Cost/Slot</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {screens.map((screen) => (
              <tr key={screen._id}>
                <td>{screen._id}</td>
                <td>{screen.name}</td>
                <td>{screen.costPerSlot}</td>
                <td>{screen.category}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => props.history.push(`/screen/${screen._id}/edit`)}
                  >Edit</button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(screen)}
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row center pagination">
          {[...Array(pages).keys()].map((x) => (
            <Link
              className={x + 1 === page ? 'active' : '' }
              key={x + 1}
              to={`/screenlist/pageNumber/${x + 1}`}
            >{x + 1}
            </Link>
          ))}
        </div>
        </>
      )}
    </div>
  );
}
