import React from 'react'

const MediaPartner = () => {
    return (
        <div className="bg-white py-8 mt-20 rounded-lg items-center w-full">
            <div className="grid grid-cols-4 items-center gap-6 max-w-4xl mx-auto">
                {/* Baris Pertama */}
                <a href="https://link-arimbi.com"><img 
                    src="/assets/arimbi.png" 
                    alt="Arimbi" 
                    className="w-40 h-40 object-contain"
                /></a>
                <a href="https://link-bcc.com"><img 
                    src="/assets/bcc.png" 
                    alt="BCC" 
                    className="w-40 h-40 object-contain"
                /></a>
                <a href="https://link-data.com"><img 
                    src="/assets/data.png" 
                    alt="Data" 
                    className="w-40 h-40 object-contain"
                /></a>
                <a href="https://link-lapor.com"><img 
                    src="/assets/lapor.png" 
                    alt="Lapor" 
                    className="w-40 h-40 object-contain"
                /></a>
                {/* Baris Kedua */}
                <a href="https://link-pmo.com"><img 
                    src="/assets/pmo.png" 
                    alt="PMO" 
                    className="w-40 h-40 object-contain"
                /></a>
                <a href="https://link-ppid.com"><img 
                    src="/assets/ppid.png" 
                    alt="PPID" 
                    className="w-40 h-40 object-contain"
                /></a>
                <a href="https://link-repositoryapps.com"><img 
                    src="/assets/repositoryapps.png" 
                    alt="Repository Apps" 
                    className="w-40 h-40 object-contain"
                /></a>
                <a href="https://link-saring.com"><img 
                    src="/assets/saring.png" 
                    alt="Saring" 
                    className="w-40 h-40 object-contain"
                /></a>
                <a href="https://link-smartcity-bdg.com"><img 
                    src="/assets/smartcity-bdg.png" 
                    alt="Smart City Bandung" 
                    className="w-40 h-40 object-contain"
                /></a>
            </div>
        </div>
    );
};

export default MediaPartner;
