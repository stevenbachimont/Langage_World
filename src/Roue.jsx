import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import confetti from 'canvas-confetti';
import itemsObject from "./data/languages.json";
import './roue.css';

function Roue() {
    const svgRef = useRef(null);
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [wheelSize, setWheelSize] = useState(500); // Default wheel size
    const [buttonSize, setButtonSize] = useState('60px'); // Default button size
    const [result, setResult] = useState(null); // State to hold the result

    const itemsArray = Object.values(itemsObject.languages);

    useEffect(() => {
        const data = itemsArray.map((item, index) => ({ label: item.language, value: 1 })); // Adjusted to item.language
        const width = wheelSize;
        const height = wheelSize;
        const radius = Math.min(width, height) / 2;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        svg.selectAll("*").remove(); // Clear the SVG content before drawing

        const g = svg.append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`)
            .attr('class', 'wheel');

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie().value(d => d.value);
        const arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        const arcs = g.selectAll('.arc')
            .data(pie(data))
            .enter().append('g')
            .attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i));

        arcs.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .text(d => d.data.label);

    }, [itemsArray, wheelSize]);

    const spin = () => {
        if (isSpinning) return;
        setIsSpinning(true);

        const randomAngle = 3600 + Math.ceil(Math.random() * 360);
        const newRotation = rotation + randomAngle;

        d3.select(svgRef.current)
            .transition()
            .duration(4000)
            .ease(d3.easeCubicInOut)
            .attrTween('transform', () => d3.interpolateString(`rotate(${rotation})`, `rotate(${newRotation})`))
            .on('end', () => {
                const finalRotation = newRotation % 360;
                setRotation(finalRotation);
                setIsSpinning(false);

                // Determine the selected item based on rotation
                const wedgeIndex = Math.floor((finalRotation / 360) * itemsArray.length);
                setResult(itemsArray[wedgeIndex]);

                confetti(); // Celebrate with confetti!
            });
    };

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            if (windowWidth >= 768) {
                setWheelSize(500);
                setButtonSize('60px');
            } else if (windowWidth >= 460) {
                setWheelSize(300);
                setButtonSize('50px');
            } else {
                setWheelSize(250);
                setButtonSize('40px');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        
        <div className="wheel-page">
            <div className="wheel-container">
                <svg ref={svgRef}></svg>
                <div className="spin-container__button" onClick={spin} disabled={isSpinning} style={{ width: buttonSize, height: buttonSize }}>
                    {isSpinning ? 'Spinning...' : 'Spin'}
                </div>
            </div>
            <div className="result-container">
                {result && (
                    <div className="result">
                        <h2>{result.language}</h2>
                        <p>{result.hello_world}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Roue;