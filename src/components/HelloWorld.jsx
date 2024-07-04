import './helloworld.css';
import languagesData from '../data/languages.json';




function HelloWorld({ languageIndex }) {
    return (
        <div>
            <h1>{languagesData.languages[languageIndex].hello_world}</h1>
        </div>
    );
}

export default HelloWorld;