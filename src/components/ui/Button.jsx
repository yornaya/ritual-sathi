import './Button.css';

export default function Button({
  children,
  variant = 'primary', // primary | outline | ghost | dark
  size = 'md',         // sm | md | lg | block
  onClick,
  type = 'button',
  disabled,
  className = '',
  style,
}) {
  const cls = `btn btn--${variant} btn--${size} ${className}`;
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  );
}
