
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import LoadingBox from '../Helpers/LoadingBox';
import MessageBox from '../Helpers/MessageBox';
import { deletePlea, listPleas } from '../../Actions/pleaActions';
import { PLEA_DELETE_RESET } from '../../Constants/pleaConstants';

export default function PleaListPage(props) {

  const masterMode = props.match.path.indexOf('/master') >=0;
  const pleaList = useSelector((state) => state.pleaList);
  const { loading, error, pleas } = pleaList;

  const pleaDelete = useSelector((state) => state.pleaDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = pleaDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: PLEA_DELETE_RESET });
    dispatch(listPleas({ master: masterMode ? userInfo._id : '' }));
  }, [dispatch, masterMode, successDelete, userInfo._id]);

  const deleteHandler = (plea) => {
    if(window.confirm('Are you sure to delete?')) {
      dispatch(deletePlea(plea._id));
    }
  };

  return (
    <div>
      <h1>Plea</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger"></MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {pleas.map((plea) => (
              <tr key={plea._id}>
                <td>{plea._id}</td>
                <td>{plea.user.name}</td>
                <td>{plea.createdAt.substring(0, 10)}</td>
                <td>{plea.totalCost.toFixed(2)}</td>
                <td>{plea.isPaid ? plea.paidAt.substring(0, 10) : 'No'}</td>
                <td>{plea.isDelivered 
                      ? plea.deliveredAt.substring(0, 10)
                      : 'No' }
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/plea/${plea._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(plea)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
