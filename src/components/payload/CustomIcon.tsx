import React from 'react';
import Image from 'next/image';

// Interface compatible con Payload Admin Graphics
interface PayloadGraphicsProps {
    payload?: any
    i18n?: any
    [key: string]: any
}

export const CustomIcon = (props: PayloadGraphicsProps): React.ReactNode => {
    return (
        <div className="custom-icon">
            <Image
                src="/logos/favico.png"
                alt="Antena 9 Icon"
                width={32}
                height={32}
                className="w-8 h-8"
            />
        </div>
    );
};
