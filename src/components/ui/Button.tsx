import Link from 'next/link';
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

interface ButtonProps extends BaseButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
}

interface LinkButtonProps extends BaseButtonProps {
  href: string;
}

type Props = ButtonProps | LinkButtonProps;

const getVariantClasses = (variant: ButtonVariant) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark shadow-md',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark active:bg-secondary-dark shadow-md',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200',
  };
  return variants[variant];
};

const getSizeClasses = (size: ButtonSize) => {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  return sizes[size];
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: Props) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button {...(props as ButtonProps)} className={combinedClasses}>
      {children}
    </button>
  );
}
