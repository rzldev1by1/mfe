import React, { Suspense } from 'react';
import {
  // Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { CContainer, CFade } from '@coreui/react';

// routes config
import routes from '../../routes';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

const TheContent = () => {
  return (
    <main className="c-main p-0">
      <CContainer fluid className="px-3">
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route) => {
              return (
                route.component && (
                  <Route
                    key={route.component}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )}
                  />
                )
              );
            })}
            {/* <Redirect from="/" to="/dashboard" /> */}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
