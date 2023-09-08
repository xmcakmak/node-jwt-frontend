type errorType = {
	email?: string
	password?: string
}
export default function Validation(values: any) {
	let error: errorType = {}
	const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	const password_pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/
	if (values.email === "" || values.email === null) {
		error.email = "Name should not be empty"
	} else if (!email_pattern.test(values.email)) {
		error.email = "Email Did not match"
	} else {
		error.email = ""
	}

	if (values.password === "") {
		error.password = "Password should not be empty"
	} else if (!password_pattern.test(values.password)) {
		error.password = "Password Did not match"
	} else {
		error.password = ""
	}
    
    return error;
}
