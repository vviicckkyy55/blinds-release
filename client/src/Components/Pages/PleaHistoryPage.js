import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingBox from '../Helpers/LoadingBox';
import MessageBox from '../Helpers/MessageBox';
import { listPleaMine } from '../../Actions/pleaActions';

export default function PleaHistoryPage(props) {

  const pleaMineList = useSelector((state) => state.pleaMineList);
  const { loading, error, pleas } = pleaMineList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listPleaMine());
  }, [dispatch]);

  return (
    <div>
      <h1>PLea History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
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
                <td>{plea.createdAt.substring(0,10)}</td>
                <td>{plea.totalCost.toFixed(2)}</td>
                <td>{plea.isPaid ? plea.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {plea.isDelivered
                    ? plea.deliveredAt.substring(0, 10)
                  : 'No'}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
