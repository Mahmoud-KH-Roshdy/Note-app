import toast, { ToastBar, Toaster } from "react-hot-toast";

function ToasterStyling() {
    return (
        <Toaster 
            position="top-right"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
                success: {
                    duration: 3000,
                },
                error: {
                    duration: 5000,
                },
                style: {
                    fontSize: "16px",
                    maxWidth: "500px",
                    padding: "16px 24px",
                    backgroundColor: "#ffffff", 
                    color: "#000000",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
                }
            }}
        >
            {(t) => (
                <ToastBar toast={t}>
                    {({ icon, message }) => (
                        <>
                            {icon}
                            {message}
                            {t.type !== 'loading' && (
                                <button
                                    type="button"
                                    onClick={() => toast.dismiss(t.id)}
                                    style={{
                                        background: '#f3f4f6',
                                        border: 'none',
                                        borderRadius: '8px',
                                        width: '28px',
                                        height: '28px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        marginLeft: '12px',
                                        padding: '0',
                                        transition: 'all 0.2s ease-in-out',
                                        outline: 'none',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#ef4444';
                                    
                                        const svg = e.currentTarget.querySelector('svg');
                                        if (svg) svg.style.stroke = 'white';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#f3f4f6';
                                        
                                        const svg = e.currentTarget.querySelector('svg');
                                        if (svg) svg.style.stroke = '#374151';
                                    }}
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#374151"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ transition: 'stroke 0.2s' }}
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            )}
                        </>
                    )}
                </ToastBar>
            )}
        </Toaster>
    );
}

export default ToasterStyling;