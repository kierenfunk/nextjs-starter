import { useState } from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

const getInitialValues = (formData) => {
	return formData.reduce((obj,input)=>{
		obj[input.name] = input.init
		return obj;
	},{});
}

const Form = styled(({className}) => {
	const [submitted, setSubmitted] = useState("");

	const formData = [
		{name:'email',init:'',type:'email',label:'Your Email*',required:true},
		{name:'fullname',init:'',type:'text',label:'Your Full Name*',required:true},
		{name:'phone',init:'',type:'text',label:'Your Phone Number*',required:true},
		{name:'address',init:'',type:'text',label:'Your Address',required:false},
		{name:'message',init:'',type:'textarea',label:'Your Message*',required:true},
	];
	
	return (
		<Formik
			initialValues={getInitialValues(formData)}
			validate={values=>{
				if(!isEmpty(submitted)){
					setSubmitted("");
				}
				return formData.reduce((errors,field)=>{
					if(isEmpty(values[field.name],{ignore_whitespace:true}) && field.required){
						errors[field.name] = 'Required';
					}
					else if(field.type==="email" && !isEmail(values[field.name])){
						errors[field.name] = 'Invalid Email Address';
					}
					return errors;
				},{})
			}}
			onSubmit={(values,props)=>{
				(async () => {
					let response = await fetch("/.netlify/functions/contact",{method:'POST',body:JSON.stringify(values)}).then(response => {return response.json()})
					props.setSubmitting(false);
					props.resetForm();
					setSubmitted(response);
		    })();
			}}
		>
			{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
				<form className={className} onSubmit={handleSubmit}>
					{formData.map(({name,type,label,required})=>(
						<div key={name}>
							<label htmlFor={name}>{label}</label>
							<input
								type={type}
								name={name}
								onChange={handleChange}
								onBlur={handleBlur}
								value={values[name]}
							/>
							<p className="error">{errors[name] && touched[name] && errors[name]}</p>
						</div>
						))}
					<button type="submit">{isSubmitting? "Sending..." : "Send"}</button>
			    {!isEmpty(submitted)? <p>{submitted}</p> : ""}
				</form>
			)}
		</Formik>
	)
})`
	max-width:800px;
	input {
		width:100%;
	}
	.error {
		color:red;
		line-height:1.5rem;
		margin:0;
	}
`

export default Form;
