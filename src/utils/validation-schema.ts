import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
	ipAddress: Yup.string()
		.matches(
			/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
			"Invalid IP address."
		)
	  	.required("The IP address is mandatory."),
	subnetMask: Yup.number()
		.typeError("The subnet mask must be a valid number.")
		.min(2, "The subnet mask must be at least 2.")
		.max(30, "The subnet mask cannot be greater than 30.")
		.required(" The subnet mask is mandatory."),
	numberSubnets: Yup.number()
		.typeError("The number of subnets must be a valid number.")
		.min(1, " The number of subnets must be at least 1.")
		// inserisci il valore max
		.required("The number of subnets is mandatory."),
})