import styled from 'styled-components';

const MenuIcon = styled(({className,open,color}) => {
	return (
		<div className={`${className}`}>
			<div className={`wrapper${open? ' open':''}`}>
				<span></span>
				<span></span>
				<div className={"label"}>
					<div>menu</div>
					<div>close</div>
				</div>
			</div>
		</div>
	)
})`
	padding:1rem;

	.wrapper {
		cursor:pointer;
	}

	.label {
		font-family:helvetica
		font-size:1rem;
		font-weight:bold;
		color:${props=>props.color};
		height:20px;
		margin-top:0.8rem;
		line-height:20px;
		overflow:hidden;
	}

	span {
		position:relative;
		display:block;
		height:0.2rem;
		background-color:${props=>props.color};
		margin-bottom:0.4rem;
		width:100%;
		transition:transform 0.3s ease-in-out;
	}
	
	.open span:first-child {
		transform:translateY(0.3rem) rotate(30deg);
	}

	.open span:nth-child(2) {
		transform:translateY(-0.3rem) rotate(-30deg);
	}
	.wrapper .label > div {
		transition: transform 0.3s ease-in-out;
		text-transform:uppercase;
		text-align:center;
	}
	.open .label > div {
		transform:translateY(-100%);
	}
`

export default MenuIcon;
