import React from 'react';
import Image from 'next/image';

// Interface compatible con Payload Admin Graphics
interface PayloadGraphicsProps {
    payload?: any
    i18n?: any
    [key: string]: any
}

export const CustomLogo = (props: PayloadGraphicsProps): React.ReactNode => {
    return (
        <div className="custom-logo">
            <Image
                src="/logos/logo-color-1.png"
                alt="Antena 9 Logo"
                width={180}
                height={50}
                priority
                className="w-auto h-12" // Ajusta la altura según necesidad
            />
        </div>
    );
};
