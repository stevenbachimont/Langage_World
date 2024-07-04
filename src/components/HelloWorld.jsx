import React from 'react';
import './helloworld.css';

function HelloWorld({ result, isSpinning }) {
    const placeholderText = "Hello World";
    const placeholderLanguage = "English";

    return (
        <div className="hello-world-container">
            <h1 className="hello-world-text">
                {isSpinning ? placeholderText : (result ? result.hello_world : placeholderText)}
            </h1>
            <h2 className="hello-world-language">
                {isSpinning ? placeholderLanguage : (result ? result.language : placeholderLanguage)}
            </h2>
            <p className ="hello-world-spin">Spin to change language</p>
        </div>
    );
}

export default HelloWorld;
