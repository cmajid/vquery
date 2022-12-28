import {screen, fireEvent} from '@testing-library/dom';
import vQuery from './vquery';

describe('vQuery', () => {
  it('should return element HTML', () => {
    const html = '<p><span id="blabla">Hello World!</span></p>';
    document.body.innerHTML = `
    <div class="sample-div">${html}</div>
  `;

    expect(vQuery('.sample-div').html()).toBe(html);
  });

  it('should be able to set the HTML of an element', () => {
    const html = '<p><span id="blabla">Hello World!</span></p>';
    document.body.innerHTML = `
    <div class="sample-div"></div>
  `;

    vQuery('.sample-div').html(html);

    expect(vQuery('.sample-div').html()).toBe(html);
  });

  it('should return css of selected element', () => {
    document.body.innerHTML = `
    <div class="sample-div" style="color: red;">Hello World!</div>
  `;

    expect(vQuery('.sample-div').css('color')).toBe('red');
  });

  it('should be able to set the CSS of an element', () => {
    document.body.innerHTML = `
    <div class="sample-div">Hello World!</div>
  `;

    vQuery('.sample-div').css('color', 'blue');

    expect(screen.getByText('Hello World!')).toHaveStyle('color: blue;');
  });

  it('should be able to filter elements with "find()" method', () => {
    document.body.innerHTML = `
    <div class="sample-div"><p><span>Hello!</span></p></div>
  `;

    expect(vQuery('.sample-div').find('p').find('span')).toBeDefined();
  });

  it('should be able to go to next element with "next()" method', () => {
    document.body.innerHTML = `
    <div class="sample-div">
    <p class="first">First Element</p>
    <p class="second">Second Element</p>
</div>
  `;

    expect(vQuery('.first').next().html()).toBe('Second Element');
  });

  it('should be able to go to prev element with "prev()" method', () => {
    document.body.innerHTML = `
    <div class="sample-div">
    <p class="first">First Element</p>
    <p class="second">Second Element</p>
</div>
  `;

    expect(vQuery('.second').prev().html()).toBe('First Element');
  });

  it('should be able to select parent with "parent()" method', () => {
    document.body.innerHTML = `
    <div class="sample-div">
    <p class="first">First Element</p>
    <p class="second">Second Element</p>
</div>
  `;

    expect(vQuery('.second').parent().html()).toContain('First Element');
  });

  it('should be able to select children with "children()" method', () => {
    document.body.innerHTML = `
    <div class="sample-div">
    <p class="first">First Element</p>
    <p class="second">Second Element</p>
</div>
  `;

    expect(vQuery('.sample-div').children().html()).toContain('First Element');
  });

  it('should be able get the attribute of an element', () => {
    document.body.innerHTML = `<input id="input" placeholder="BlaBla" />`;

    expect(vQuery('#input').attr('placeholder')).toBe('BlaBla');
  });

  it('should be able set the attribute of an element', () => {
    document.body.innerHTML = `<input id="input" placeholder="BlaBla" />`;

    vQuery('#input').attr('type', 'password');

    expect(screen.getByPlaceholderText('BlaBla')).
      toHaveAttribute('type', 'password');
  });

  it('should be able set the className of an element', () => {
    document.body.innerHTML = `<input id="input" class="fancy-input" placeholder="BlaBla" />`;

    vQuery('#input').addClass('has-border');

    expect(screen.getByPlaceholderText('BlaBla')).
      toHaveClass('fancy-input has-border');
  });

  it('should be to remove the className of an element', () => {
    document.body.innerHTML = `<input id="input" class="fancy-input" placeholder="BlaBla" />`;

    vQuery('#input').removeClass('fancy-input');

    expect(screen.getByPlaceholderText('BlaBla')).not.toHaveClass('fancy-input');
  });

  it('should be able to attach a click event listener to an element',
    async () => {
      document.body.innerHTML = `<button id="btn">Click me!</button>`;

      const clickSpy = jest.fn();

      vQuery('#btn').click(clickSpy);

      fireEvent.click(screen.getByText('Click me!'));

      expect(clickSpy).toBeCalledTimes(1);
    });
});
