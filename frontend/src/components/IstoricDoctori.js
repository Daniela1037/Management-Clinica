import React, { useEffect, useState } from 'react'
import CanvasJSReact from '../canvasjs/canvasjs.react'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function IstoricDoctori() {
    const [data, setData] = useState({total:[], anulate:[], efectuate:[]})
    useEffect(() => {
        const getDataPoints = async() => {
            const response = await fetch('http://localhost:5000/istoric-doctori',{
                method: 'GET'
            })
            const dataPoints = await response.json()
            setData(dataPoints)
        }
        getDataPoints()
    }, [])
    
    const options = {
        title: {
            text: "Istoric programari pe ultima luna",
            fontSize: 30,
            fontWeight: 'lighter',
            fontColor: '#394446',
            fontFamily: 'tahoma'
        },
        toolTip: {
            shared: true
        },
        legend: {
            verticalAlign: "top"
        },
        axisY: {
            suffix: "%"
        },
        data: [
            {
                type: "stackedBar100",
                color: "#DB4437",
                name: "Anulate",
                showInLegend: true,
                indexLabel: "{y}",
                indexLabelFontColor: "white",
                yValueFormatString: "#,###'%'",
                dataPoints: data.anulate
            },
            {
                type: "stackedBar100",
                color: "#7986CB",
                name: "Confirmate",
                showInLegend: true,
                indexLabel: "{y}",
                indexLabelFontColor: "white",
                yValueFormatString: "#,###'%'",
                dataPoints: data.confirmate
            },
            {
                type: "stackedBar100",
                color: "#9bbb59",
                name: "Efectuate",
                showInLegend: true,
                indexLabel: "{y}",
                indexLabelFontColor: "white",
                yValueFormatString: "#,###'%'",
                dataPoints: data.efectuate
            },
        ]
    }
    return (
        <div className='m-4'>
            <CanvasJSChart options={options}
            />
        </div>
    );
}
