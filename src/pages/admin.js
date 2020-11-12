import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { StyleSheetManager } from 'styled-components';
import Main from '../layouts/Main';

const StyleInjection = ({data}) => {
	const [frame,setFrame] = useState('');
	useEffect(()=>{
		const iframe = document.querySelector('#nc-root iframe');
		setFrame(iframe && iframe.contentDocument.head);
	},[]);
	
	return (
		<StyleSheetManager target={frame}>
				<Main data={data}/>
		</StyleSheetManager>
	)
}

export default function Admin() {
	useEffect(()=>{
		(async () => {
			const CMS = (await import('netlify-cms-app')).default;
			CMS.init();
			CMS.registerPreviewTemplate('general', ({ entry }) => (
				<StyleInjection data={entry.toJS().data}/>
			))
			CMS.registerPreviewStyle("normalize.css");
		})();
	},[])

	return (<Head><script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script></Head>)
}

