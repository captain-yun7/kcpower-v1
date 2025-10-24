import Link from 'next/link';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

interface InteractiveCardProps extends CardProps {
  href: string;
  onClick?: never;
}

interface ClickableCardProps extends CardProps {
  onClick: () => void;
  href?: never;
}

type Props = CardProps | InteractiveCardProps | ClickableCardProps;

const getPaddingClasses = (padding: NonNullable<CardProps['padding']>) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  return paddings[padding];
};

export default function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  ...props
}: Props) {
  const baseClasses = 'bg-white rounded-xl shadow-sm';
  const hoverClasses = hover ? 'hover:shadow-lg transition-shadow duration-200' : '';
  const paddingClasses = getPaddingClasses(padding);
  const combinedClasses = `${baseClasses} ${hoverClasses} ${paddingClasses} ${className}`;

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={`${combinedClasses} block cursor-pointer`}>
        {children}
      </Link>
    );
  }

  if ('onClick' in props && props.onClick) {
    return (
      <div
        onClick={props.onClick}
        className={`${combinedClasses} cursor-pointer`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            props.onClick?.();
          }
        }}
      >
        {children}
      </div>
    );
  }

  return <div className={combinedClasses}>{children}</div>;
}

// Sub-components for common card patterns
Card.Header = function CardHeader({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`}>
      {children}
    </div>
  );
};

Card.Title = function CardTitle({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3 className={`text-xl font-bold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
};

Card.Description = function CardDescription({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-gray-600 text-sm ${className}`}>
      {children}
    </p>
  );
};

Card.Footer = function CardFooter({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`}>
      {children}
    </div>
  );
};
