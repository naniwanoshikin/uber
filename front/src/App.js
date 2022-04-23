import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Container components
import { Restaurants } from './containers/Restaurants.jsx';
import { Foods } from './containers/Foods.jsx';
import { Orders } from './containers/Orders.jsx';

function App() {
  return (
    <Router>
      <Switch>
        {/* 店舗一覧 */}
        <Route
          exact path="/restaurants">
          <Restaurants />
        </Route>
        {/* フード一覧 */}
        <Route
          exact path="/restaurants/:restaurantsId/foods"
          render={({ match }) => // パラメータid
            <Foods match={match} />
          }
        />
        {/* 注文 */}
        <Route
          exact path="/orders">
          <Orders />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
