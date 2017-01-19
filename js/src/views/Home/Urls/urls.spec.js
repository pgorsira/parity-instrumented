// Copyright 2015, 2016 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import Urls from './';

let component;
let history;
let instance;
let router;
let store;

function createRouter () {
  router = {
    push: sinon.stub()
  };

  return router;
}

function createHistory () {
  history = {};

  return history;
}

function createStore () {
  store = {};

  return store;
}

function render () {
  component = shallow(
    <Urls
      history={ createHistory() }
      store={ createStore() }
    />,
    {
      context: {
        router: createRouter()
      }
    }
  );
  instance = component.instance();

  return component;
}

describe.only('views/Home/Urls', () => {
  it('renders defaults', () => {
    expect(render()).to.be.ok;
  });

  describe('events', () => {
    beforeEach(() => {
      sinon.spy(instance.webstore, 'gotoUrl');
      sinon.spy(instance.webstore, 'restoreUrl');
      sinon.spy(instance.webstore, 'setNextUrl');
    });

    afterEach(() => {
      instance.webstore.gotoUrl.restore();
      instance.webstore.restoreUrl.restore();
      instance.webstore.setNextUrl.restore();
    });

    describe('onChangeUrl', () => {
      it('performs setNextUrl on store', () => {
        instance.onChangeUrl('123');
        expect(instance.webstore.setNextUrl).to.have.been.calledWith('123');
      });
    });

    describe('onGotoUrl', () => {
      it('performs gotoUrl on store', () => {
        instance.onGotoUrl();
        expect(instance.webstore.gotoUrl).to.have.been.called;
      });

      it('passed the URL when provided', () => {
        instance.onGotoUrl('http://example.com');
        expect(instance.webstore.gotoUrl).to.have.been.calledWith('http://example.com');
      });

      it('does route navigation when executed', () => {
        instance.onGotoUrl();
        expect(router.push).to.have.been.calledWith('/web');
      });
    });

    describe('onRestoreUrl', () => {
      it('performs restoreUrl on store', () => {
        instance.onRestoreUrl();
        expect(instance.webstore.restoreUrl).to.have.been.called;
      });
    });
  });
});