import { useState, useEffect } from 'react';
import styled from 'styled-components';
import MenuIcon from './MenuIcon';

const Nav = styled(({className,links}) => {
	const [open, setOpen] = useState(false);
	const [width,setWidth] = useState(0);

	useEffect(()=>{
		if(open){
			setWidth(window.innerWidth - document.body.clientWidth);
			document.body.style.width = `${document.body.clientWidth}px`;
			document.body.style.overflow = 'hidden';
			document.body.scroll = 'no';
		}
		else {
			document.body.style.overflow = 'auto';
			document.body.scroll = 'yes';
			setWidth(document.body.offsetWidth - document.body.clientWidth);
			document.body.style.width = "auto";
		}

	},[width,open]);

	return (
			<div className={className}>
				<div className={"menu-icon"} onClick={()=>{setOpen(!open)}} style={{right:`${width}px`}}>
					<MenuIcon open={open} color="orange"/>	
				</div>
				<div className={`overlay${open? ' fade-in' : ' fade-out'}`}></div>
				<div className={`main-navigation${open? ' open' : ''}`}>
					{links.map((link,i)=>{
						return (
							<div className="link-wrapper" key={i}>
								<a href={link.href}>{link.text}</a>
							</div>
						)
					})}
				</div>
			</div>
				)	

})`
	font-family: sans-serif;

	.menu-icon {
		position:fixed;
		z-index:3;
		top:0;
		right:0;
		margin-top:1rem;
	}
	
	.main-navigation {
		background-color:white;
		position:fixed;
		box-sizing:border-box;
		z-index:2;
		height:100%;
		width:100%;
		top:0;
		left:100%;
		display:flex;
		align-items:center;
		justify-content:center;
		padding:2%;
		transition:transform 0.3s ease-in-out;
	}

	.main-navigation.open{
		transform:translateX(-100%);
	}

	.link-wrapper a {
		font-size:2.4rem;
		text-decoration:none;
		color:black;
	}
	.link-wrapper a:hover {
		color:orange;
	}
	
	.overlay {
		width:100%;
		height:100%;
		position:fixed;
		left:0;
		top:0;
		z-index:1;
		background-color:black;
		display:none;
	}
	
	@media (min-width: 768px) {
		
		.main-navigation {
			width:38.2%;
		}
	
		.overlay {
			display:block;
		}
		.overlay.fade-in {
			opacity:0.8;
			visibility:visible;
			transition:opacity 0.3s ease-in-out;
		}
		.overlay.fade-out {
			opacity:0;
			visibility:hidden;
			transition:visibility 0s ease-in-out 300ms,opacity 0.3s ease-in-out;
		}
	}
`

export default Nav;

