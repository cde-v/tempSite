import PortfolioModule from './portfolio'
import PortfolioController from './portfolio.controller';
import PortfolioComponent from './portfolio.component';
import PortfolioTemplate from './portfolio.html';

describe('Portfolio', () => {
  let $rootScope, makeController;

  beforeEach(window.module(PortfolioModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new PortfolioController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(PortfolioTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = PortfolioComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(PortfolioTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(PortfolioController);
      });
  });
});
