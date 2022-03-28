import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from './checkbox.component';

it('should call Checkbox onClick function', () => {
    const mock = jest.fn();

    render(<Checkbox checked={false} onClick={mock} />);

    const checkbox = screen.getByTestId('checkbox');

    userEvent.click(checkbox);

    expect(mock).toHaveBeenCalledTimes(1);
});