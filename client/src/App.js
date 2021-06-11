import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Navbar/Footer';
import ScreensPage from './Components/Pages/ScreensPage';
import ScreenDetailsPage from './Components/Pages/ScreenDetailsPage';
import PleaPage from './Components/Pages/PleaPage';
import SigninPage from './Components/Pages/SigninPage';
import SignupPage from './Components/Pages/SignupPage';
import CompleteAddressPage from './Components/Pages/CompleteAddressPage';
import PaymentMethodPage from './Components/Pages/PaymentMethodPage';
import UserProfilePage from './Components/Pages/UserProfilePage';
import UploadVideoPage from './Components/Pages/UploadVideoPage';
import VideosPage from './Components/Pages/VideosPage';

import AdminRoute from './Components/Helpers/AdminRoute';
import PrivateRoute from './Components/Helpers/PrivateRoute';
import MasterRoute from './Components/Helpers/MasterRoute';
import UserAddressDetailsPage from './Components/Pages/UserAddressDetailsPage';
import UserBankingDetailsPage from './Components/Pages/UserBankingDetailsPage';
// import VideoPlayer from './Components/Helpers/VideoPlayer/VideoPlayer';
import userListPage from './Components/Pages/UserListPage';
import UserEditPage from './Components/Pages/UserEditPage';
import MasterPage from './Components/Pages/MasterPage';
import ScreenListPage from './Components/Pages/ScreenListPage';
import ScreenEditPage from './Components/Pages/ScreenEditPage';
import BucketPage from './Components/Pages/BucketPage';
import PlacePleaPage from './Components/Pages/PlacePleaPage';
import PleaHistoryPage from './Components/Pages/PleaHistoryPage';
// import MapPage from './Components/Pages/MapPage';
import PleaListPage from './Components/Pages/PleaListPage';
import DashboardPage from './Components/Pages/DashboardPage';
import SearchPage from './Components/Pages/SearchPage';
import HomePage from './Components/Pages/HomePage';
import UserCredentialsPage from './Components/Pages/userCredentialsPage';
import VideoPlayerPage from './Components/Pages/VideoPlayerPage';
import NewFileUpload from './Components/Helpers/Upload/NewFileUpload';
import FileDescriptionEdit from './Components/Helpers/Upload/FileDescriptionEdit';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header>
          <Navbar />
        </header>
        <main>
          <Route path="/" component={HomePage} exact></Route>

          <Route path={"/api/uploadFile"} component={NewFileUpload} />
          <Route
            path={"/api/uploadFile/edit/:id"}
            component={FileDescriptionEdit}
          />

          <Route path="/master/:id" component={MasterPage}></Route>
          <Route path="/bucket/:id?" component={BucketPage}></Route>
          <Route path="/plea/:id" component={PleaPage}></Route>
          <Route path="/screen/:id" component={ScreenDetailsPage} exact></Route>
          <Route path="/screen/:id/edit" component={ScreenEditPage} exact></Route>

          <MasterRoute path="/screenlist/master" component={ScreenListPage}></MasterRoute>
          <MasterRoute path="/plealist/master" component={PleaListPage}></MasterRoute>

          <AdminRoute path="/dashboard" component={DashboardPage} exact ></AdminRoute>
          <AdminRoute path="/plealist" component={PleaListPage} exact ></AdminRoute>
          <AdminRoute path="/screenlist/pageNumber/:pageNumber" component={ScreenListPage} exact ></AdminRoute>
          <AdminRoute path="/screenlist" component={ScreenListPage} exact ></AdminRoute>
          <AdminRoute path="/userlist" component={userListPage}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditPage}></AdminRoute>

          <PrivateRoute path="/userProfile" component={UserProfilePage}></PrivateRoute>
          <PrivateRoute path="/userCredentials" component={UserCredentialsPage}></PrivateRoute>
          {/* <PrivateRoute path="/map" component={MapPage}></PrivateRoute> */}

          <Route path="/search" component={SearchPage} exact></Route>
          <Route path="/search/name/:name?" component={SearchPage} exact></Route>
          <Route path="/search/category/category" component={SearchPage} exact></Route>
          <Route path="/search/category/:category/name/:name" component={SearchPage} exact></Route>
          <Route path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/plea/:plea/pageNumber/:pageNumber" component={SearchPage} exact></Route>

          <Route path="/paymentMethod" component={PaymentMethodPage}></Route>
          <Route path="/completeAddress" component={CompleteAddressPage}></Route>
          <Route path="/placePlea" component={PlacePleaPage}></Route>
          <Route path="/pleaHistory" component={PleaHistoryPage}></Route>
          <Route path="/screens" component={ScreensPage} exact></Route>
          <Route path="/signin" component={SigninPage}></Route>
          <Route path="/signup" component={SignupPage}></Route>

          <Route exact path="/video/:videoTitle" component={VideoPlayerPage} />
          {/* <Route exact path="/video/:videoTitle" component={VideoPlayer} /> */}
          <Route path="/uploadVideo" component={UploadVideoPage}></Route>
          <Route path="/videos" component={VideosPage}></Route>
          <Route path="/userAddress" component={UserAddressDetailsPage}></Route>
          <Route path="/userBanking" component={UserBankingDetailsPage}></Route>

        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
