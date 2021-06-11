import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import LoadingBox from '../Helpers/LoadingBox';
import MessageBox from '../Helpers/MessageBox';
import SearchBox from '../Helpers/SearchBox';
import Rating from '../Helpers/Rating';
import Screen from '../Helpers/Screen';
import { listScreens } from '../../Actions/screenActions';
import { costPerSlots, ratings } from '../../utils';

export default function SearchPage(props) {

  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    plea = 'newest',
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const screenList = useSelector((state) => state.screenList);
  const { loading, error, screens, page, pages } = screenList;

  const screenCategoryList = useSelector((state) => state.screenCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = screenCategoryList;
  useEffect(() => {
    dispatch(
      listScreens({
        pageNumber,
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        min,
        max,
        rating,
        plea,
      })
    );
  }, [category, dispatch, max, min, name, plea, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortPlea = filter.plea || plea;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/plea/${sortPlea}/pageNumber/${filterPage}`;
  };

  return (
    <div>
      <div className="row center"> 
        <SearchBox />
      </div>
      <hr />
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger"></MessageBox>
        ) : (
          <div>{screens.length} Results </div>
        )}
        <div>
          Sort by {' '}
          <select
            value={plea}
            onChange={(e) => {
              props.history.push(getFilterUrl({ plea: e.target.value }));
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">costPerSlot: Low to High</option>
            <option value="highest">costPerSlot: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option>
          </select>
        </div>
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>Department</h3>
          <div>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="daner">{errorCategories}</MessageBox>
            ) : (
              <ul>
                <li>
                  <Link className={'all' === category ? 'active' : ''}
                    to={getFilterUrl({ category: 'all' })}
                  >Any</Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link className={c === category ? 'active' : ''}
                      to={getFilterUrl({ category: c })}
                    >{c}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3>Cost Per Slot</h3>
            <ul>
              {costPerSlots.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={`${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''}
                  >{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? 'active' : ''}
                  >
                    <Rating caption={' & up'} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
            {screens.length === 0 && (
              <MessageBox>No Screen Found</MessageBox>
            )}
            <div className="row center">
              {screens.map((screen) => (
                <Screen key={screen._id} screen={screen}></Screen>
              ))}
            </div>
            <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? 'active' : ''}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
