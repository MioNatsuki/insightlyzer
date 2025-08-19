// src/components/Button.jsx
const Button = ({ children, type = "button", className = "", ...props }) => {
  return (
    <button
      type={type}
      className={`rounded-lg text-white border-0 ${className}`}
      style={{ 
        backgroundColor: '#F77CA2',
        fontSize: '32px',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '600', // SemiBold
        width: '686px',
        height: '73px',
        outline: 'none',
        border: 'none'
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;