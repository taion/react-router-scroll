import { expect } from 'chai';
import scrollLeft from 'dom-helpers/query/scrollLeft';
import scrollTop from 'dom-helpers/query/scrollTop';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { applyRouterMiddleware, Router, useRouterHistory } from 'react-router';

import useScroll from '../src/useScroll';

import { asyncRoutes, createHashHistoryWithoutKey, syncRoutes }
  from './fixtures';
import run, { delay } from './run';

describe('useScroll', () => {
  let container;

  beforeEach(() => {
    window.history.replaceState(null, null, '/');

    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  // Create a new history every time to avoid old state.
  [
    createBrowserHistory,
    createHashHistory,
    createHashHistoryWithoutKey,
  ].forEach(createHistory => {
    let history;

    beforeEach(() => {
      history = useRouterHistory(createHistory)();
    });

    describe(createHistory.name, () => {
      [
        ['syncRoutes', syncRoutes],
        ['asyncRoutes', asyncRoutes],
      ].forEach(([routesName, routes]) => {
        describe(routesName, () => {
          it('should have correct default behavior', done => {
            const steps = [
              () => {
                scrollTop(window, 15000);
                delay(() => history.push('/page2'));
              },
              () => {
                expect(scrollTop(window)).to.equal(0);
                history.goBack();
              },
              () => {
                expect(scrollTop(window)).to.equal(15000);
                done();
              },
            ];

            ReactDOM.render(
              <Router
                history={history}
                routes={routes}
                render={applyRouterMiddleware(useScroll())}
                onUpdate={run(steps)}
              />,
              container
            );
          });

          it('should support custom behavior', done => {
            let prevPosition;
            let position;

            function shouldUpdateScroll(prevRouterState, routerState) {
              if (prevRouterState) {
                prevPosition = this.readPosition(prevRouterState.location);
              }

              position = this.readPosition(routerState.location);

              if (prevRouterState === null) {
                return [10, 20];
              }

              if (prevRouterState.routes[0].path === '/') {
                return false;
              }

              if (routerState.location.action === 'POP') {
                return true;
              }

              expect.fail();
              return false;
            }

            const steps = [
              () => {
                expect(scrollLeft(window)).to.equal(10);
                expect(scrollTop(window)).to.equal(20);

                scrollTop(window, 15000);

                delay(() => history.push('/page2'));
              },
              () => {
                expect(prevPosition).to.eql([10, 15000]);
                expect(position).to.not.exist;

                expect(scrollLeft(window)).to.not.equal(0);
                expect(scrollTop(window)).to.not.equal(0);

                scrollLeft(window, 0);
                scrollTop(window, 0);

                delay(() => history.goBack());
              },
              () => {
                expect(prevPosition).to.eql([0, 0]);
                expect(position).to.eql([10, 15000]);

                expect(scrollLeft(window)).to.equal(10);
                expect(scrollTop(window)).to.equal(15000);

                done();
              },
            ];

            ReactDOM.render(
              <Router
                history={history}
                routes={routes}
                render={applyRouterMiddleware(useScroll(shouldUpdateScroll))}
                onUpdate={run(steps)}
              />,
              container
            );
          });
        });
      });
    });
  });
});
