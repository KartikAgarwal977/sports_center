import React from 'react';

const NotFound: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-amber-500 bg-cover" style={{backgroundImage: "url('https://thumbs.dreamstime.com/b/error-character-zero-design-template-website-background-graphic-114488008.jpg')"}}>
            <div className="text-center">
                <h1 className="text-6xl bg-black text-white font-bold mb-4">404</h1>
                <p className="text-2xl bg-black text-white mb-8">Oops! Page not found.</p>
                <a href="/" className="text-white bg-black underline text-xl">Go back home</a>
            </div>
        </div>
    )
}

export default NotFound;
