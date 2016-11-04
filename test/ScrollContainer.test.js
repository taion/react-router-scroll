import scrollTop from 'dom-helpers/query/scrollTop';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { applyRouterMiddleware, Router, useRouterHistory } from 'react-router';

import useScroll from '../src/useScroll';
import ScrollContainer from '../src/ScrollContainer';

import { ScrollableComponent } from './components';
import { createHashHistoryWithoutKey } from './histories';
import { createElementRoutes } from './routes';
import run from './run';

describe('<ScrollContainer>', () => {
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
  ].forEach((createHistory) => {
    let history;

    beforeEach(() => {
      history = useRouterHistory(createHistory)();
    });

    describe(createHistory.name, () => {
      it('should have correct default behavior', (done) => {
        const Page = () => (
          <ScrollContainer scrollKey="container">
            <ScrollableComponent />
          </ScrollContainer>
        );

        const steps = [
          () => {
            scrollTop(container.firstChild, 10000);
            history.push('/other');
          },
          () => {
            expect(scrollTop(container.firstChild)).to.equal(0);
            history.goBack();
          },
          () => {
            expect(scrollTop(container.firstChild)).to.equal(10000);
            done();
          },
        ];

        ReactDOM.render(
          <Router
            history={history}
            routes={createElementRoutes(Page)}
            render={applyRouterMiddleware(useScroll(() => false))}
            onUpdate={run(steps)}
          />,
          container,
        );
      });

      it('should have support custom behavior', (done) => {
        const Page = () => (
          <ScrollContainer
            scrollKey="container"
            shouldUpdateScroll={() => [0, 5000]}
          >
            <ScrollableComponent />
          </ScrollContainer>
        );

        const steps = [
          () => {
            scrollTop(container.firstChild, 10000);
            history.push('/other');
          },
          () => {
            expect(scrollTop(container.firstChild)).to.equal(5000);
            history.goBack();
          },
          () => {
            expect(scrollTop(container.firstChild)).to.equal(5000);
            done();
          },
        ];

        ReactDOM.render(
          <Router
            history={history}
            routes={createElementRoutes(Page)}
            render={applyRouterMiddleware(useScroll(() => false))}
            onUpdate={run(steps)}
          />,
          container,
        );
      });
    });
  });
});
