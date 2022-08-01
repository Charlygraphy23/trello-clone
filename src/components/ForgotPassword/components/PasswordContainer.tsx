/* eslint-disable prettier/prettier */

import Button from 'components/button';
import { STEPS } from 'config/app';

type Props = {
    className?: string;
    updateStep: (step: STEPS) => void;

}

const PasswordContainer = ({ className = '', updateStep, }: Props) => (
    <div className={`password box ${className}`}>
        <p className='login__title mb-3'>Enter New Password</p>
        <input
            name='0'
            type='text'

        />
        <input
            name='1'
            type='password'

        />
        <Button
            className='bg-success text-white w-100 mb-3 login__submit'
            loaderColor='light'
            onClick={() => updateStep(STEPS.password)}
        >
            Submit
        </Button>
    </div>
);

export default PasswordContainer;
