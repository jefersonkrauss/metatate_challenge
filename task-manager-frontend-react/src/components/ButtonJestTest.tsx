import React from 'react';

interface ButtonProps {
    label: string;
}

const ButtonJestTest: React.FC<ButtonProps> = ({ label }) => {
    return <button>{label}</button>;
};

export default ButtonJestTest;
