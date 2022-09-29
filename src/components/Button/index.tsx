import { ReactNode, ButtonHTMLAttributes } from 'react';
import './styles.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
}

export function Button({ children, ...rest }:Props){
    return(
        <button type="button" className="main-button" {...rest}>
            {children}
        </button>
    );
}