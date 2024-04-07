import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface ProtectedProps {
    children: React.ReactNode;
    authentication?: boolean;
}

function Protected({ children, authentication = true }: ProtectedProps) {
    const authStatus = useSelector((state: any) => state.auth.status);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            if (authentication !== authStatus) {
                if (authentication) {
                    navigate("/login");
                } else {
                    navigate("/");
                }
            }
            setLoading(false);
        };

        checkAuthentication();
    }, [authStatus, authentication, navigate]);

    return loading ? <div>Loading...</div> : <>{children}</>;
}

export default Protected;