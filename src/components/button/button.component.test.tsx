import Button from './button.component';
import { fireEvent, render, screen } from '@testing-library/react';

it('should run onClick function', () => {
    const mock = jest.fn();
    const buttonText = 'Click Here';

    render(<Button text={buttonText} onClick={mock} />);

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(mock).toBeCalledTimes(1);
});

it('should render button with the given text', () => {
    const buttonText = 'Click Here';

    render(<Button text={buttonText} />);

    expect(screen.queryByText(buttonText)).toBeInTheDocument();
});
