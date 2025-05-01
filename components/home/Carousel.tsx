'use client';
import React, { Component } from 'react';

// Use require for compatibility with class components
const Slider = require('react-slick').default;

export default class SimpleSlider extends Component {
	render() {
		const settings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 4000,
		};

		const sliderItems = [
			'/images/carousel/b5.jpg',
			'/images/carousel/b6.jpg',
			'/images/carousel/b7.jpg',
			'/images/carousel/b8.jpg',
			'/images/carousel/b9.jpg',
		];

		return (
			<div className='w-full mx-auto'>
				<Slider {...settings}>
					{sliderItems.map((item, index) => (
						<div className='px-1' key={index}>
							<img
								src={item}
								alt=''
								className='w-full rounded-xl min-h-[120px]'
							/>
						</div>
					))}
				</Slider>
			</div>
		);
	}
}
