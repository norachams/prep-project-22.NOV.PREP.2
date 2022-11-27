import React, { useEffect, useState } from 'react';
import '../../assets/css/DailyForecast.css';
import dateFormat from 'dateformat';
import { FcNext } from 'react-icons/fc';
import { FcPrevious } from 'react-icons/fc';
const DailyForecast = ({ data, setActiveWeatherCard, activeWeatherCard, changeUnit }) => {
	const [formatedData, setFormatedData] = useState(null);
	const initialNOfitems = () => {
		if (window.innerWidth < 450) {
			return 0;
		} else if (window.innerWidth > 450 && window.innerWidth <= 800) {
			return 1;
		} else if (window.innerWidth > 800 && window.innerWidth <= 1280) {
			return 2;
		} else if (window.innerWidth > 1280 && window.innerWidth <= 1700) {
			return 3;
		} else {
			return 4;
		}
	};
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(initialNOfitems());
	const nextWeatherCard = () => {
		if (endIndex < data.length - 1) {
			setStartIndex((prev) => prev + 1);
			setEndIndex((prev) => prev + 1);
			setActiveWeatherCard(startIndex + 1);
		}
	};

	const prevWeatherCard = () => {
		if (startIndex > 0) {
			setStartIndex((prev) => prev - 1);
			setEndIndex((prev) => prev - 1);
			setActiveWeatherCard(startIndex - 1);
		}
	};
	const formatDate = (date) => {
		const currentDate = new Date(date);
		return dateFormat(currentDate, 'ddd, mmmm dS');
	};

	useEffect(() => {
		let formatedData = data.map((element, index) => {
			return { item: element, id: index };
		});
		setFormatedData(formatedData);
	}, [data]);

	return (
		<div className="weatherCards">
			{initialNOfitems() < 5 && <FcPrevious onClick={() => prevWeatherCard()} className="icon" />}

			{formatedData &&
				formatedData
					.filter((element, index) => element.id >= startIndex && element.id <= endIndex)
					.map((element, index) => (
						<div
							key={index}
							className={`weatherCard ${element.id === activeWeatherCard ? 'active' : 'deactive'} `}
							onClick={() => setActiveWeatherCard(element.id)}
						>
							<h4>{formatDate(element.item.date)}</h4>
							<div>
								<img
									src={`https://openweathermap.org/img/wn/${element.item.data[0]?.weather[0].icon}@2x.png`}
									alt="weather icon"
								/>
								<h3>
									{element.item.data[0]?.main.temp} &deg; {changeUnit === 'metric' ? 'C' : 'F'}
								</h3>
							</div>
							<h4>{element.item.data[0]?.weather[0].main}</h4>
							<div>
								<div>
									<h5>Humidity</h5>
									<h5>{element.item.data[0]?.main.humidity}%</h5>
								</div>
								<div>
									<h5>Wind Speed</h5>
									<h5>{element.item.data[0]?.wind.speed} km/j</h5>
								</div>
							</div>
						</div>
					))}
			{initialNOfitems() < 5 && <FcNext className="icon" onClick={() => nextWeatherCard()} />}
		</div>
	);
};

export default DailyForecast;
