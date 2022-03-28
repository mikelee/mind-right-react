import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './button.component';

it('should run onClick function', () => {
    const mock = jest.fn();
    const buttonText = 'Click Here';

    render(<Button text={buttonText} onClick={mock} />);

    const button = screen.getByRole('button');

    userEvent.click(button);

    expect(mock).toBeCalledTimes(1);
});

it('should render button with the given text', () => {
    const buttonText = 'Click Here';

    render(<Button text={buttonText} />);

    expect(screen.queryByText(buttonText)).toBeInTheDocument();
});
