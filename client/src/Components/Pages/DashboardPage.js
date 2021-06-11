import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';

import LoadingBox from '../Helpers/LoadingBox';
import MessageBox from '../Helpers/MessageBox';
import { summaryPlea } from '../../Actions/pleaActions';

export default function DashboardPage() {

  const pleaSummary = useSelector((state) => state.pleaSummary);
  const { loading, summary, error } = pleaSummary;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryPlea());
  }, [dispatch]);


  return (
    <div>
      <div className="row">
        <h1>Dashboard</h1>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
        <ul className="row summary">
          <li>
            <div className="summary-title color1">
              <span>
                <i className="fa fa-users" /> Users
              </span>
            </div>
            <div className="summary-body">{summary.users[0].numUsers}</div>
          </li>
          <li>
            <div className="summary-title color2">
              <span>
                <i className="fa fa-shopping-cart" />Pleas
              </span>
            </div>
            <div className="summary-body">
              {summary.pleas[0] ? summary.pleas[0].numPleas : 0}
            </div>
          </li>
          <li>
            <div className="summary-title color3">
              <span>
                <i className="fa fa-money" />Sales
              </span>
            </div>
            <div className="summary-body">
              ${summary.pleas[0] ? summary.pleas[0].totalSales.toFixed(2)
              : 0}
            </div>
          </li>
        </ul>
        <div>
          <div>
            <h2>Sales</h2>
            {summary.dailyPleas.length === 0 ? (
              <MessageBox>No Sale</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Date', 'Sales'],
                  ...summary.dailyPleas.map((x) => [x._id, x.sales]),
                ]}
              ></Chart>
            )}
          </div>
        </div>
        <div>
          <h2>Categories</h2>
          {summary.screenCategories.length === 0 ? (
            <MessageBox>No Category</MessageBox>
          ) : (
            <Chart
              width="100%"
              height="400px"
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Category', 'Screens'],
                ...summary.screenCategories.map((x) => [x._id, x.count]),
              ]}
            ></Chart>
          )}
        </div>
        </>
      )}
    </div>
  );
}
