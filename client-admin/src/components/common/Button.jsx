import React from 'react';
import { FiLoader } from 'react-icons/fi';

const Button = ({
  variant = 'primary', // primary, secondary, outline, ghost
  size = 'md', // sm, md, lg
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  children,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  };
  const sizeClasses = {
    sm: 'btn-sm',
    md: '', // default size
    lg: 'btn-lg',
  };

  const buttonClasses = `
    ${baseClasses} 
    ${variantClasses[variant] || 'btn-primary'} 
    ${sizeClasses[size] || ''} 
    ${fullWidth ? 'w-full' : ''} 
    ${loading ? 'btn-loading' : ''}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <FiLoader className="icon-spin mr-2" />}
      {!loading && icon && <span className="btn-icon mr-2">{icon}</span>}
      <span className="btn-text">{children}</span>
    </button>
  );
};

export default Button;
